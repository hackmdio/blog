import Head from 'next/head'

import { getAllPostsWithSlug } from 'lib/post'
import Header from 'components/Header'
import PostRow from 'components/PostRow'

export default function Blog({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog | Daily Oops!</title>
      </Head>

      <Header />

      <div className="d-block mx-auto markdown-body py-4 px-1" style={{ maxWidth: 700 }}>
        <div className="Box">
          {
            posts.map(
              (post, index) =>
                <PostRow post={post} index={index} key={post.id} totalCount={posts.length} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getAllPostsWithSlug()

  return {
    props: {
      posts
    }
  }
}