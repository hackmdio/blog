const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules')],
  },
  webpack: (config, options) => {
    config.resolve.fallback = {
      path: false,
      fs: false,
    }
    return config
  },
  i18n: {
    locales: ['zh-TW', 'ja', 'en'],
    defaultLocale: 'en',
    localeDetection: false,
  },
})
