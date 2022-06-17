import Markdown from 'components/Markdown'
import { SRLWrapper } from 'simple-react-lightbox'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { parseMeta } from 'lib/markdown'

import got from 'got'
import nextI18NextConfig from 'next-i18next.config'
import { useTranslation } from 'react-i18next'
import { NextSeo } from 'next-seo'

export default function Changelog({ content }) {
  const { t } = useTranslation('common')

  return (
    <div>
      <NextSeo title={t('pages.changelog', 'Changelog')} />

      <div className="mt-3">
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
            content={content}
            className="container px-3 post-container"
            // skippedTitle={title}
          />
        </SRLWrapper>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const r = await got(
    `https://hackmd.io/${process.env.HACKMD_CHANGELOG_ID}/download`
  )

  const { content } = parseMeta(r.body)

  return {
    props: {
      content,
      ...(await serverSideTranslations(
        locale,
        ['pages', 'common'],
        nextI18NextConfig
      )),
    },
  }
}
