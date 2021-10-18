import dayjs from 'lib/dayjs'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Markdown from './Markdown'
import { SRLWrapper } from 'simple-react-lightbox'
import { TagGroups } from './TagPill'

export default function PostRow({ post, showAuthor = true }) {
  const {
    date: { year, month, day },
    meta,
    slug,
    author,
    tags = [],
  } = post
  const date = dayjs(`${year}-${month}-${day}`)

  const href = `/blog/${year}/${month}/${day}/${slug}`

  const { t } = useTranslation('common')

  return (
    <div className="d-flex flex-items-start flex-column mb-8 rounded-1 border color-border-default p-4">
      <div className="text-mono color-fg-muted mb-2 f5">
        {date.format('LL')}
      </div>

      <TagGroups tags={tags} className="mb-2" />

      <Link href={href} passHref>
        <a className="no-underline">
          <div className="h2 mb-3 mt-1 d-block color-fg-default">
            {post.title}
          </div>

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
              <Markdown
                content={meta.summary}
                className="post-container color-fg-muted"
              />
            </SRLWrapper>
          )}
        </a>
      </Link>

      {showAuthor && author && (
        <div className="mt-4 d-flex width-fit f5 flex-items-center user-select-none">
          <img
            className="circle mr-3"
            alt="jonrohan"
            src={author.avatar}
            width="40"
            height="40"
          />

          <div className="d-flex flex-column">
            <a target="_blank" rel="noopener noreferrer" href={author.profile}>
              {author.name}
            </a>

            <span className="color-fg-muted">{author.bio}</span>
          </div>
        </div>
      )}
    </div>
  )
}
