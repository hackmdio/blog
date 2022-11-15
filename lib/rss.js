import path from 'path'
import fs from 'fs'

import { Feed } from 'feed'

import { render } from 'lib/markdown'

const getPostDate = (post) => {
  const {
    date: { year, month, day },
  } = post
  return new Date(year, month - 1, day)
}

export const generateRss = (posts) => {
  let date = new Date()
  if (posts.length !== 0) {
    date = getPostDate(posts[0])
  }

  const feed = new Feed({
    title: 'HackMD Blog',
    description: 'HackMD Blog RSS Feed',
    id: `https://${process.env.DOMAIN}/blog`,
    link: `https://${process.env.DOMAIN}/blog`,
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    updated: date,
    feedLinks: {
      atom: `https://${process.env.DOMAIN}/feed.xml`,
    },
  })

  posts.forEach((post) => {
    const {
      date: { year, month, day },
      slug,
    } = post
    const postUrl = `https://${process.env.DOMAIN}/blog/${year}/${month}/${day}/${slug}`
    const postDate = getPostDate(post)

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.content.slice(0, 500),
      content: render(post.content),
      date: postDate,
    })
  })

  return feed.rss2()
}

export function writeRSS(posts) {
  const rss = generateRss(posts)

  fs.writeFileSync(path.join(process.cwd(), './public/feed.xml'), rss)
}
