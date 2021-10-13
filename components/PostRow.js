import dayjs from 'lib/dayjs'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Markdown from './Markdown'
import { SRLWrapper } from 'simple-react-lightbox'

export default function PostRow({ post, index, totalCount }) {
  const {
    date: { year, month, day },
    meta,
    slug,
    author,
  } = post
  const date = dayjs(`${year}-${month}-${day}`)

  const href = `/blog/${year}/${month}/${day}/${slug}`

  const { t } = useTranslation('common')

  return (
    <div className="d-flex flex-items-start flex-column mb-8">
      <div className="text-mono">{date.format('LL')}</div>

      <Link href={href}>
        <a className="h2">{post.title}</a>
      </Link>

      {author && (
        <div className="rounded-2 mt-2 mb-0 d-flex width-fit">
          <img
            className="circle mr-3"
            alt="jonrohan"
            src={author.avatar}
            width="48"
            height="48"
          />

          <div>
            <a target="_blank" rel="noopener noreferrer" href={author.profile}>
              {author.name}
            </a>

            <p>{author.bio}</p>
          </div>
        </div>
      )}

      {meta.summary && (
        <SRLWrapper
          options={{
            settings: {
              lightboxTransitionSpeed: 0.1,
              slideAnimationType: 'both',
              slideSpringValues: [350, 50],
              slideTransitionTimingFunction: 'easeInOut',
            },
          }}
        >
          <Markdown content={meta.summary} className="post-container" />
        </SRLWrapper>
      )}

      <Link href={href}>
        <a className="mt-2">{t('read-more')}</a>
      </Link>
    </div>
  )
}
