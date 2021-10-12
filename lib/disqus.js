export function getDisqusConfig() {
  if (process.env.DISQUS_SHORTNAME && process.env.DISQUS_SHORTNAME !== '') {
    return {
      shortname: process.env.DISQUS_SHORTNAME,
      domain: process.env.DISQUS_DOMAIN,
    }
  } else {
    return null
  }
}
