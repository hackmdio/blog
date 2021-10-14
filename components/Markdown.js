import { render } from 'lib/markdown'
import Script from 'next/script'
import useCopySnippet from 'lib/hooks/useCopySnippet'
import { useEffect, useRef, useState } from 'react'

const Markdown = ({ content, className = '', ...props }) => {
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

  return (
    <>
      <main id="main" property="schema:mainEntity" ref={articleRef}>
        <article
          itemScope
          itemProp="post"
          typeof="schema:Article schema:BlogPosting"
          property="schema:articleBody"
          className={`markdown-body ${className}`}
          dangerouslySetInnerHTML={{ __html: render(content) }}
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
