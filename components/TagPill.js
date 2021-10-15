import Link from 'next/link'
import nextI18nextConfig from 'next-i18next.config'

export const TagPill = ({ tag, href }) => (
  <>
    <span className="article-tag text-mono">
      <Link href={href}>
        <a>#{tag}</a>
      </Link>
    </span>
    <style jsx scoped>
      {`
        .article-tag {
          color: var(--color-accent-fg);
          background-color: var(--color-accent-subtle);
          padding: 4px 8px;
          border-radius: 8px;
          margin-right: 8px;
          font-size: 0.8rem;
        }

        .article-tag:hover,
        .article-tag:active {
          background-color: var(--color-accent-emphasis);
          color: var(--color-fg-on-emphasis);
        }

        .article-tag:hover a,
        .article-tag:active a {
          color: var(--color-fg-on-emphasis);
          text-decoration: none;
        }
      `}
    </style>
  </>
)

export default TagPill

export const TagGroups = ({ tags, className = '' }) => {
  const visibleTags =
    tags && tags.length > 0
      ? tags.filter((tag) => !nextI18nextConfig.i18n.locales.includes(tag))
      : []

  return (
    visibleTags.length > 0 && (
      <div className={className}>
        {visibleTags.map((tag) => (
          <TagPill href={`/tags/${tag}`} key={tag} tag={tag} />
        ))}
      </div>
    )
  )
}
