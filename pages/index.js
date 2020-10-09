import Head from 'next/head'
import Link from 'next/link'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { getAllPostsWithSlug } from 'lib/post'
import Header from 'components/Header'

dayjs.extend(localizedFormat)

export default function Home({ posts }) {
  const postRows = posts.map(post => {
  const { date: { year, month, day }, slug } = post
  const date = dayjs(`${year}-${month}-${day}`)

  return <div className="Box-row d-flex flex-items-center" key={post.id}>
    <div className="flex-auto">
      <Link href={`/blog/${year}/${month}/${day}/${slug}`}>
        <a>
          <strong>{post.title}</strong>
        </a>
      </Link>

      <div className="text-small text-gray-light">
        { date.format('LL') }
      </div>
    </div>
  </div>
  })

  return (
    <div>
      <Head>
        <title>Daily Oops!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="d-block mx-auto markdown-body py-4 px-1" style={{ maxWidth: 700 }}>
        <div className="Box">
          {postRows}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const posts = await getAllPostsWithSlug()

  return {
    props: {
      posts
    }
  }
}
