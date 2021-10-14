import { getAllPostsWithSlug } from 'lib/post'
import Head from 'next/head'
import nextI18NextConfig from 'next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { NextSeo } from 'next-seo'

const Tags = ({ tags }) => {
  const { t } = useTranslation('common')

  return (
    <div>
      <NextSeo title={t('tags.tags', 'Tags')} />

      <div
        className="d-block mx-auto markdown-body py-4 px-3"
        style={{ maxWidth: 680 }}
      >
        <h1>{t('tags.tags', 'Tags')}</h1>

        <div>
          {tags.map((tag) => (
            <span key={tag} className="article-tag">
              <Link href={`/tags/${tag}`}>
                <a>#{tag}</a>
              </Link>
            </span>
          ))}

          <span className="article-tag">
            <Link href="/tags/empty">
              <a>#{t('empty', 'No tag')}</a>
            </Link>
          </span>
        </div>
      </div>

      <style jsx scoped>
        {`
          .article-tag {
            color: var(--color-accent-fg);
            background-color: var(--color-accent-subtle);
            padding: 4px 8px;
            border-radius: 20px;
            margin-right: 8px;
          }

          .article-tag:hover,
          .article-tag:active {
            background-color: var(--color-accent-emphasis);
            color: var(--color-fg-on-emphasis);
          }

          .article-tag:hover a,
          .article-tag:active a {
            color: var(--color-fg-on-emphasis);
            text-decoration: none;
          }
        `}
      </style>
    </div>
  )
}

export default Tags

export async function getStaticProps({ locale }) {
  const posts = await getAllPostsWithSlug()

  const tags = [...new Set(posts.map((post) => post.tags).flat())].filter(
    (tag) => tag && !nextI18NextConfig.i18n.locales.includes(tag)
  )

  return {
    props: {
      tags,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  }
}
