import { getAllPostsWithSlug } from 'lib/post'
import nextI18NextConfig from 'next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { NextSeo } from 'next-seo'
import TagPill from 'components/TagPill'

const Tags = ({ tags }) => {
  const { t } = useTranslation('common')

  return (
    <div>
      <NextSeo title={t('tags', 'Tags')} />

      <div
        className="px-3 py-4 mx-auto d-block markdown-body"
        style={{ maxWidth: 680 }}
      >
        <h1>{t('tags', 'Tags')}</h1>

        <div className="flex-wrap d-flex flex-items-center" style={{ gap: 8 }}>
          {tags.map((tag) => (
            <TagPill key={tag} tag={tag} href={`/tags/${tag}`} />
          ))}

          <TagPill tag={t('empty', 'No tag')} href="/tags/empty" />
        </div>
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
