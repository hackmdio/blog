import Link from 'next/link'

export const TagPill = ({ tag, href }) => (
  <>
    <span className="article-tag">
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
          border-radius: 20px;
          margin-right: 8px;
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
