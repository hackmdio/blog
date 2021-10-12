/**
 * @param {Array<string>} tags
 * @param {string} locale
 * @returns {Boolean}
 */
export const showInLocale = (tags, locale) => {
  return tags.includes(locale)
}

/**
 * @param {Array<string>} tags
 * @param {Array<string>} locales
 * @returns {Boolean}
 */
export const showInAllLocale = (tags, locales) => {
  return locales.every((locale) => !showInLocale(tags, locale))
}
