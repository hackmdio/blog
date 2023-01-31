import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PostRow from 'components/PostRow'

import { getAllPostsWithSlug } from 'lib/post'
import { writeRSS } from 'lib/rss'
import { useLocalePosts } from 'lib/hooks/useLocalePosts'
import { useTranslation } from 'next-i18next'
import nextI18NextConfig from 'next-i18next.config'
import Signup from 'components/Signup'
import { useRouter } from 'next/router'
import { SubscriptionFrameZh } from 'components/SubscriptionFrame'
import { Banner } from 'components/Banner'

export default function Home({ posts: _posts }) {
  const posts = useLocalePosts(_posts)
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  return (
    <div>
      <div className="container px-3 pt-4 pb-8 mx-auto d-block markdown-body">
        <h2>{t('recent', 'Recent posts')}</h2>

        {posts.slice(0, 5).map((post, index) => (
          <PostRow post={post} key={post.id} showAuthor={false} />
        ))}

        <Link href="/blog" passHref>
          <a>
            <button className="mt-3 mr-2 btn" type="button">
              {t('read-more', 'Read more')}
            </button>
          </a>
        </Link>

        <a href="/feed.xml">
          <button className="mt-3 btn btn-primary" type="button">
            {t('subscribe-via-rss', 'Subscribe via RSS')}
          </button>
        </a>
      </div>

      <Signup />

      <div className="mt-6">
        {locale === 'zh' ? <SubscriptionFrameZh /> : null}
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
