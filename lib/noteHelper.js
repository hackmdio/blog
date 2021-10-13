import dayjs from 'dayjs'
import slugify from 'slugify'
import pinyin from 'chinese-to-pinyin'
import fs from 'fs'
import yaml from 'yaml'
import path from 'path'

export function getDateFromNote(note, meta) {
  const p = (dayjs) => {
    const [year, month, day] = dayjs.format('YYYY/MM/DD').split('/')
    return {
      year,
      month,
      day,
    }
  }

  if (meta.date) {
    return p(dayjs(meta.date))
  } else if (note.publishedAt) {
    return p(dayjs(note.publishedAt))
  } else {
    return p(dayjs(note.createdAt))
  }
}

export function getAuthorFromMeta(meta) {
  const authors = yaml.parse(
    fs.readFileSync(path.join(process.cwd(), './data/authors.yml'), 'utf-8')
  )

  if (meta.author) {
    return authors.find((author) => author.id === meta.author)
  } else {
    return null
  }
}

const getDayjs = ({ year, month, day }) => {
  return dayjs(`${year}-${month}-${day}`)
}

export function sortPostByDate(a, b) {
  return getDayjs(b.date).isAfter(getDayjs(a.date)) ? 1 : -1
}

export function getSlugFromNote(note, meta) {
  return (
    meta.slug ||
    note.permalink ||
    slugify(note.title) ||
    slugify(pinyin(note.title, { removeTone: true }))
  )
}

export function filterNotDraft(post) {
  return !post.tags?.includes('draft') && (post.meta?.date || post.publishedAt)
}
