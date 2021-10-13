import { showInAllLocale, showInLocale } from 'lib/locale'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useLocalePosts = (posts = []) => {
  const { locale, locales } = useRouter()

  return useMemo(() => {
    return posts.filter(
      (post) =>
        showInLocale(post.tags, locale) || showInAllLocale(post.tags, locales)
    )
  }, [locale, locales, posts])
}
