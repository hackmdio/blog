import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { DiscussionEmbed } from 'disqus-react'
import { useTheme } from 'next-themes'
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
import {
  SubscriptionFrameZh,
  SubscriptionFrameEn,
} from 'components/SubscriptionFrame'
import AuthorBlock from 'components/AuthorBlock'
import { renderInline } from 'lib/markdown'
import Link from 'next/link'
import Footer from 'components/Footer'

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

const AnniversaryAuthorBlock = ({
  username,
  name,
  description,
  link,
  image,
}) => {
  const photo =
    image ||
    // base64 white jpg
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYGD4z8ABHgJ+gK1UAAAAAElFTkSuQmCC'

  return (
    <div className="container pb-5">
      <div className="container-block color-bg-done color-border-done rounded-2 p-3 d-flex">
        <img
          className="circle mr-3"
          alt={name}
          src={photo}
          width="48"
          height="48"
        />

        <div className="flex flex-column flex-1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://hackmd.io/${username}`}
          >
            {name}
          </a>

          {description && <div>{description}</div>}
        </div>

        <a target="_blank" rel="noopener noreferrer" href={link}>
          <i className="fas fa-external-link-alt" />
        </a>
      </div>
    </div>
  )
}

const defaultDomain = process.env.NEXT_PUBLIC_DOMAIN || 'blog.hackmd.io'

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
  const url = `https://${defaultDomain}/blog/${year}/${month}/${day}/${slug}`
  const description = content.slice(0, 150)
  const time = date.format()
  const { locale } = useRouter()
  const is7AnniversaryPost = tags.includes('7th-anniversary')
  const { t } = useTranslation('common')

  const { resolvedTheme } = useTheme()
  const [layoutDarkMode, setLayoutDarkMode] = useState(resolvedTheme)
  useEffect(() => {
    window.setTimeout(() => {
      setLayoutDarkMode(resolvedTheme)
    }, 100)
  }, [resolvedTheme])

  const noteLink = `https://hackmd.io/s/${noteId}`

  return (
    <>
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
            <div className="container px-3 pt-4 pb-1">
              <img
                alt="Cover image"
                src={meta?.image}
                style={{ maxWidth: '100%', borderRadius: 6 }}
              />
            </div>
          )}
          <div className="container px-3 pt-4 pb-3">
            <span className="text-mono color-fg-muted">
              {date.format('LL')}
            </span>

            <TagGroups tags={tags} className="mt-3" />
          </div>

          <div className="container px-3 pb-3">
            <h1 dangerouslySetInnerHTML={{ __html: renderInline(title) }} />
          </div>

          {!is7AnniversaryPost && author && (
            <div className="container px-3 pb-3">
              <AuthorBlock author={author} />
            </div>
          )}

          {is7AnniversaryPost && (
            <div className="container px-3 pb-3">
              <AnniversaryAuthorBlock
                username={meta.author}
                image={meta.avatar}
                description={meta['author-description']}
                name={meta.author}
                link={meta.bylink}
              />
            </div>
          )}

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
              className="container px-3 post-container"
              skippedTitle={title}
            />
          </SRLWrapper>

          {!meta.subscription && (
            <div className="mt-8">
              {locale === 'zh' ? (
                <SubscriptionFrameZh />
              ) : (
                <SubscriptionFrameEn />
              )}
            </div>
          )}

          <div className="text-center my-6">
            <Link href="/blog" passHref>
              <a>
                <button className="mt-3 mr-2 btn" type="button">
                  {t('read-more', 'Read more')}
                </button>
              </a>
            </Link>
          </div>

          <hr className="my-0" />

          {/* <div className="container py-3 px-3 text-center"> */}
          {/*   <Trans i18nKey="published-on-hackmd" ns="common"> */}
          {/*     This post is proudly <PublishedLink href={noteLink} /> */}
          {/*     with <HacKMDLink /> */}
          {/*   </Trans> */}
          {/* </div> */}

          {disqus && (
            <div className="container px-3 py-3">
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
      <Footer />
    </>
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

  let paths = locales
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

  if (process.env.NODE_ENV !== 'production') {
    paths = paths.concat({
      locale: 'en',
      params: {
        year: '2015',
        month: '03',
        day: '14',
        slug: 'features',
      },
    })
  }

  return {
    paths,
    fallback: false,
  }
}
