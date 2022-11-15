import { useRouter } from 'next/router'

const getI18nBio = (author, lang) => {
  switch (lang) {
    case 'en':
      return author.bio_en
    case 'ja':
      return author.bio_ja
    default:
      return author.bio
  }
}

export const AuthorBlock = ({ author }) => {
  const { locale } = useRouter()

  const bio = getI18nBio(author, locale) || author.bio

  return (
    <div className="container pb-5">
      <div className="container-block color-bg-done color-border-done rounded-2 p-3 d-flex">
        <img
          className="circle mr-3"
          alt={author.name}
          src={author.avatar}
          width="48"
          height="48"
        />

        <div className="flex flex-column">
          <a target="_blank" rel="noopener noreferrer" href={author.profile}>
            {author.name}
          </a>

          {bio && <div>{bio}</div>}
        </div>
      </div>
    </div>
  )
}

export default AuthorBlock
