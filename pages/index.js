import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PostRow from 'components/PostRow'

import { getAllPostsWithSlug } from 'lib/post'
import { writeRSS } from 'lib/rss'
import { useLocalePosts } from 'lib/hooks/useLocalePosts'
import { useTranslation } from 'next-i18next'
import nextI18NextConfig from 'next-i18next.config'

export default function Home({ posts: _posts }) {
  const posts = useLocalePosts(_posts)
  const { t } = useTranslation('common')

  return (
    <div>
      <NextSeo
        title="Daily Oops!"
        titleTemplate="%s"
        description="Yukai's blog. Web tech, apps, photos, and notes."
        openGraph={{
          type: 'article',
          locale: 'zh-Hant-TW',
          title: 'Daily Oops!',
          site_name: 'Daily Oops!',
        }}
      />

      <div className="d-block mx-auto container markdown-body py-4 px-3">
        <h2>{t('hi')}</h2>

        <h2>Recent posts</h2>

        {posts.slice(0, 5).map((post, index) => (
          <PostRow
            post={post}
            index={index}
            key={post.id}
            totalCount={posts.length}
          />
        ))}

        <Link href="/blog" passHref>
          <button className="mt-3 btn mr-2" type="button">
            Read More
          </button>
        </Link>

        <a href="/feed.xml">
          <button className="mt-3 btn btn-primary" type="button">
            Subscribe via RSS
          </button>
        </a>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const posts = await getAllPostsWithSlug()

  writeRSS(posts.slice(0, 10))

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  }
}
