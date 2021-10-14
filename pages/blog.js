import Head from 'next/head'

import { getAllPostsWithSlug } from 'lib/post'
import PostRow from 'components/PostRow'
import { useLocalePosts } from 'lib/hooks/useLocalePosts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from 'next-i18next.config'
import { useTranslation } from 'react-i18next'

export default function Blog({ posts: _posts }) {
  const posts = useLocalePosts(_posts)
  const { t } = useTranslation('pages')

  return (
    <article>
      <Head>
        <title>{t('blog')} | HackMD Blog</title>
      </Head>

      <div
        className="d-block mx-auto markdown-body py-4 px-3"
        style={{ maxWidth: 680 }}
      >
        {posts.map((post, index) => (
          <PostRow
            post={post}
            index={index}
            key={index}
            totalCount={posts.length}
          />
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
