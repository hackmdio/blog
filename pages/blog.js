import { getAllPostsWithSlug } from 'lib/post'
import PostRow from 'components/PostRow'
import { useLocalePosts } from 'lib/hooks/useLocalePosts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from 'next-i18next.config'
import { useTranslation } from 'react-i18next'
import { NextSeo } from 'next-seo'

export default function Blog({ posts: _posts }) {
  const posts = useLocalePosts(_posts)
  const { t } = useTranslation('pages')

  return (
    <article>
      <NextSeo title={t('blog')} />

      <div
        className="d-block mx-auto markdown-body py-4 px-3"
        style={{ maxWidth: 750 }}
      >
        {posts.map((post, index) => (
          <PostRow post={post} key={index} />
        ))}

        <a href="/feed.xml">
          <button className="mt-3 btn btn-primary" type="button">
            Subscribe via RSS
          </button>
        </a>
      </div>
    </article>
  )
}

export async function getStaticProps({ locale }) {
  const posts = await getAllPostsWithSlug()

  return {
    props: {
      posts,
      ...(await serverSideTranslations(
        locale,
        ['pages', 'common'],
        nextI18NextConfig
      )),
    },
  }
}
