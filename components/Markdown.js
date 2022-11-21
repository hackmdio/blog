import { useEffect, useRef, useState } from 'react'
import $ from 'jquery'

import { render } from 'lib/markdown'
import Script from 'next/script'
import useCopySnippet from 'lib/hooks/useCopySnippet'
import abcjs from 'abcjs'

const Markdown = ({ content, className = '', skippedTitle = '', ...props }) => {
  useCopySnippet()

  /**
   * @type {import('react').MutableRefObject<HTMLDivElement | null>}
   */
  const articleRef = useRef()
  const [mathjaxdivs, setMathjaxdivs] = useState([])
  useEffect(() => {
    if (!articleRef.current) {
      setMathjaxdivs([])
    } else {
      setMathjaxdivs(
        Array.from(articleRef.current.querySelectorAll('span.mathjax.raw'))
      )
    }
  }, [setMathjaxdivs, articleRef])

  // Post Process
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.MathJax) {
      return
    }

    const MathJax = window.MathJax

    MathJax.Hub.Config({
      jax: ['input/TeX', 'output/CommonHTML'],
      extensions: [
        'tex2jax.js',
        'MathMenu.js',
        'MathZoom.js',
        'AssistiveMML.js',
        'a11y/accessibility-menu.js',
        'Safe.js',
      ],
      TeX: {
        extensions: [
          'AMSmath.js',
          'AMSsymbols.js',
          'noErrors.js',
          'noUndefined.js',
        ],
      },
    })

    if (mathjaxdivs.length) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, mathjaxdivs])
      MathJax.Hub.Queue(() => {
        mathjaxdivs.forEach((div) => div.classList.remove('raw'))
      })
    }
  }, [mathjaxdivs])

  useEffect(() => {
    const blockquote = $(articleRef.current)
      .find('blockquote.raw')
      .removeClass('raw')
    const blockquoteP = blockquote.find('p')
    blockquoteP.each((key, value) => {
      let html = $(value).html()
      $(value).html(html)
    })
    // color tag in blockquote will change its left border color
    const blockquoteColor = blockquote.find('.color')
    blockquoteColor.each((key, value) => {
      $(value)
        .closest('blockquote')
        .css('border-left-color', $(value).attr('data-color'))
    })
  })

  useEffect(() => {
    const abcs = $(articleRef.current).find('span.abc.raw').removeClass('raw')

    if (abcs.length === 0) {
      return
    }

    abcs.each((key, value) => {
      const $value = $(value)
      const $ele = $value.parent().parent()

      abcjs.renderAbc(value, $value.text())

      const svg = $ele.find('svg')

      if (svg.length > 0) {
        svg[0].setAttribute(
          'viewBox',
          `0 0 ${svg.attr('width')} ${svg.attr('height')}`
        )
        svg[0].setAttribute('preserveAspectRatio', 'xMidYMid meet')
      }

      $value.unwrap().unwrap()
    })
  }, [articleRef])

  return (
    <>
      <main id="main" property="schema:mainEntity" ref={articleRef}>
        <article
          itemScope
          itemProp="post"
          typeof="schema:Article schema:BlogPosting"
          property="schema:articleBody"
          className={`markdown-body ${className}`}
          dangerouslySetInnerHTML={{
            __html: render(content, { title: skippedTitle }),
          }}
          {...props}
        />
      </main>

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_CHTML"
        strategy="lazyOnload"
      />
    </>
  )
}

export default Markdown
