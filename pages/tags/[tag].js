import PostRow from 'components/PostRow'
import { useLocalePosts } from 'lib/hooks/useLocalePosts'
import { getAllPostsWithSlug } from 'lib/post'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import nextI18NextConfig from '../../next-i18next.config'

const Tag = ({ posts: _posts, tag }) => {
  const posts = useLocalePosts(_posts)
  const { t } = useTranslation('common')

  return (
    <article>
      <NextSeo title={t('pages.tags', 'Tags')} />

      <div
        className="px-3 py-4 mx-auto d-block markdown-body"
        style={{ maxWidth: 680 }}
      >
        <h3 className="text-center no-underline h1">#{tag}</h3>

        {posts.map((post, index) => (
          <PostRow post={post} key={index} />
        ))}
      </div>
    </article>
  )
}

export default Tag

export async function getStaticProps({
  params,
  preview = false,
  previewData,
  locale,
}) {
  /** @type {Array<{ tags: Array<string> }>} */
  const _posts = (await getAllPostsWithSlug()) || []

  let posts = []
  if (params.tag === 'empty') {
    posts = _posts.filter((post) => post.tags.length === 0 || !post.tags)
  } else {
    posts = _posts.filter((post) => {
      return post.tags.includes(params.tag)
    })
  }

  return {
    props: {
      posts,
      tag: params.tag,
      ...(await serverSideTranslations(
        locale,
        ['pages', 'common'],
        nextI18NextConfig
      )),
    },
  }
}

/**
 * @param {{ locales: Array<string> }} props
 */
export async function getStaticPaths({ locales }) {
  /** @type {Array<{ tags: Array<string> }>} */
  const posts = await getAllPostsWithSlug()

  const tags = [...new Set(posts.map((post) => post.tags).flat())]

  const paths = locales
    .map((locale) =>
      tags
        .filter((tag) => !locales.includes(tag))
        .map((tag) => ({ params: { tag }, locale }))
        .concat([{ params: { tag: 'empty' }, locale }])
    )
    .flat()

  return {
    paths,
    fallback: false,
  }
}
