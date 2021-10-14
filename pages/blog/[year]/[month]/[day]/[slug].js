import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { DiscussionEmbed } from 'disqus-react'
import useDarkMode from 'use-dark-mode'
import { SRLWrapper } from 'simple-react-lightbox'
import { Trans, useTranslation } from 'react-i18next'
import nextI18NextConfig from '../../../../../next-i18next.config'

import Markdown from 'components/Markdown'

import { getAllPostsWithSlug, getPostData, formatPostAsParams } from 'lib/post'
import dayjs from 'lib/dayjs'
import { getDisqusConfig } from 'lib/disqus'
import { showInAllLocale, showInLocale } from 'lib/locale'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TagGroups } from 'components/TagPill'

const HacKMDLink = () => (
  <a
    className="no-underline color-text-primary text-semibold"
    href="https://hackmd.io"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fas fa-file-alt" /> HackMD
  </a>
)

const PublishedLink = ({ href }) => {
  const { t } = useTranslation('common')

  return (
    <a target="_blank" href={href} rel="noopener noreferrer">
      {t('published')}
    </a>
  )
}

export default function Post({
  content,
  title,
  params,
  disqus,
  noteId,
  meta,
  author,
  tags = [],
}) {
  const { year, month, day, slug } = params
  const date = dayjs(`${year}-${month}-${day}`)
  const url = `https://${disqus?.domain}/blog/${year}/${month}/${day}/${slug}`
  const description = content.slice(0, 150)
  const time = date.format()
  const { locale } = useRouter()

  const darkMode = useDarkMode()
  const [layoutDarkMode, setLayoutDarkMode] = useState(darkMode.value)
  useEffect(() => {
    window.setTimeout(() => {
      setLayoutDarkMode(darkMode.value)
    }, 100)
  }, [darkMode.value])

  const noteLink = `https://hackmd.io/s/${noteId}`

  const authorBlock = author && (
    <div className="container py-3 px-3">
      <div className="container-block color-bg-done color-border-done rounded-2 p-3 d-flex">
        <img
          className="circle mr-3"
          alt="jonrohan"
          src={author.avatar}
          width="48"
          height="48"
        />

        <div>
          <a target="_blank" rel="noopener noreferrer" href={author.profile}>
            {author.name}
          </a>

          <p>{author.bio}</p>
        </div>
      </div>
    </div>
  )

  return (
    <section>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'article',
          locale: locale === 'zh' ? 'zh-Hant-TW' : locale,
          url,
          title,
          description,
          site_name: 'HackMD Blog',
          article: {
            publishedTime: time,
            modifiedTime: time,
          },
          images: [
            meta?.image && {
              url: meta?.image,
              alt: title,
            },
          ].filter(Boolean),
        }}
      />

      <div>
        {meta?.image && (
          <div className="container pt-4 pb-1 px-3">
            <img
              src={meta?.image}
              style={{ maxWidth: '100%', borderRadius: 6 }}
            />
          </div>
        )}
        <div className="container pt-4 pb-3 px-3">
          <span className="text-mono color-text-tertiary">
            {date.format('LL')}
          </span>

          <div className="mt-3">
            <TagGroups tags={tags} />
          </div>
        </div>

        {authorBlock}

        <SRLWrapper
          options={{
            settings: {
              lightboxTransitionSpeed: 0.1,
              slideAnimationType: 'both',
              slideSpringValues: [350, 50],
              slideTransitionTimingFunction: 'easeInOut',
            },
          }}
        >
          <Markdown
            content={content}
            className="container post-container px-3"
          />
        </SRLWrapper>

        {authorBlock}

        <div className="container py-3 px-3">
          <div className="container-block color-bg-accent color-border-accent rounded-2 p-3">
            <Trans i18nKey="published-on-hackmd" ns="common">
              This post is proudly <PublishedLink href={noteLink} />
              with <HacKMDLink />
            </Trans>
          </div>
        </div>

        {disqus && (
          <div className="container py-3 px-3">
            <DiscussionEmbed
              shortname={disqus.shortname}
              config={{
                url: url,
                identifier: url,
                title: title,
                language: 'zh_TW',
              }}
              darkmode={JSON.stringify(layoutDarkMode)}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export async function getStaticProps({
  params,
  preview = false,
  previewData,
  locale,
}) {
  const {
    content,
    title,
    id,
    meta,
    author,
    tags = [],
  } = await getPostData(params)

  return {
    props: {
      content,
      title,
      params,
      disqus: getDisqusConfig(),
      noteId: id,
      meta,
      author,
      tags,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  }
}

/**
 * @param {{ locales: Array<string> }} props
 */
export async function getStaticPaths({ locales }) {
  /** @type {Array<any>} */
  const posts = await getAllPostsWithSlug()

  const paths = locales
    .map((locale) =>
      posts
        .map((post) => {
          const canShow =
            showInLocale(post.tags, locale) ||
            showInAllLocale(post.tags, locales)

          if (canShow) {
            return {
              ...formatPostAsParams(post),
              locale,
            }
          } else {
            return null
          }
        })
        .filter(Boolean)
    )
    .flat()

  return {
    paths,
    fallback: false,
  }
}
