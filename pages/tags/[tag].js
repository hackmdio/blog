import PostRow from 'components/PostRow'
import { useLocalePosts } from 'lib/hooks/useLocalePosts'
import { getAllPostsWithSlug } from 'lib/post'
import Head from 'next/head'

const Tag = ({ posts: _posts, tag }) => {
  const posts = useLocalePosts(_posts)

  return (
    <article>
      <Head>
        <title>Tag | HackDM Blog</title>
      </Head>

      <div
        className="d-block mx-auto markdown-body py-4 px-3"
        style={{ maxWidth: 680 }}
      >
        <h3 className="h1 no-underline text-center">#{tag}</h3>

        {posts.map((post, index) => (
          <PostRow
            post={post}
            index={index}
            key={index}
            totalCount={posts.length}
          />
        ))}
      </div>
    </article>
  )
}

export default Tag

export async function getStaticProps({ params, preview = false, previewData }) {
  /** @type {Array<{ tags: Array<string> }>} */
  const _posts = await getAllPostsWithSlug()

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

  const paths = tags
    .filter((tag) => !locales.includes(tag))
    .map((tag) => ({ params: { tag } }))
    .concat([{ params: { tag: 'empty' } }])

  return {
    paths,
    fallback: false,
  }
}
