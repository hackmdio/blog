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
      <NextSeo title="Tags" />

      <div
        className="d-block mx-auto markdown-body py-4 px-3"
        style={{ maxWidth: 680 }}
      >
        <h1>Tags</h1>

        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/tags/${tag}`}>
                <a>{tag}</a>
              </Link>
            </li>
          ))}

          <li>
            <Link href="/tags/empty">
              <a>{t('empty', 'No tag')}</a>
            </Link>
          </li>
        </ul>
      </div>
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
