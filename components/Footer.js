import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const Footer = ({ showSeperator = false }) => {
  const { t } = useTranslation('common')
  const year = new Date().getFullYear()
  const router = useRouter()
  const { locale } = router

  const onLocaleChange = useCallback(
    (e) => {
      const locale = e.target.value
      console.log('locale', locale)
      router.push('/', '/', { locale })
    },
    [router]
  )

  return (
    <>
      <style jsx>{`
        .text-left {
          text-align: left;
        }
        .pv-4 {
          padding-top: 16px;
          padding-bottom: 16px;
        }
        .container-thin {
          max-width: 720px;
          margin-right: auto;
          margin-left: auto;
        }
        .mb-1 {
          margin-bottom: 4px;
        }
        .ph-2 {
          padding-left: 8px;
          padding-right: 8px;
        }
        .mb-3 {
          margin-bottom: 12px;
        }
        .mb-0-md {
          margin-bottom: 0;
        }
        .mt-0 {
          margin-top: 0;
        }
        .pb-1-4 {
          padding-bottom: 2px;
        }
        .pv-1-4 {
          padding-top: 2px;
          padding-bottom: 2px;
        }
        .text-gray-lighter {
          color: #95989a;
        }
        .w-100 {
          width: 100%;
        }
        .pr-1 {
          padding-right: 4px;
        }

        .flex {
          display: flex;
        }
        .flex-column-xs {
          flex-direction: column;
        }
        .justify-start-xs {
          justify-content: flex-start;
        }
        .items-start-xs {
          align-items: flex-start;
        }
        .items-center {
          align-items: center;
        }

        @media (min-width: 576px) {
          .justify-end-sm {
            justify-content: flex-end;
          }
          .items-center-sm {
            align-items: center;
          }
          .flex-row-sm {
            flex-direction: row;
          }
        }

        .col-sm-6,
        .col-md-3 {
          float: left;
        }

        @media (min-width: 768px) {
          .col-sm-6 {
            flex: 0 0 auto;
            width: 50%;
          }
        }
        @media (min-width: 992px) {
          .col-md-3 {
            flex: 0 0 auto;
            width: 25%;
          }
        }
        .list-unstyled {
          padding-left: 0;
          list-style: none;
        }
        .col-xs-12 {
          flex-basis: 100%;
          width: 100%;
        }
        @media (min-width: 576px) {
          .col-sm-6 {
            flex-basis: 50%;
            width: 50%;
          }
        }
        @media (min-width: 768px) {
          .col-md-3 {
            flex-basis: 25%;
            width: 25%;
          }
        }

        a:hover {
          text-decoration: none;
          opacity: 0.8;
        }
      `}</style>
      <footer
        className="text-left pv-4"
        style={{
          borderTop: showSeperator
            ? '1px solid var(--color-border-default)'
            : '',
          marginTop: '32px',
        }}
      >
        <div className="container-thin">
          <div className="row">
            <div className="col-xs-12">
              <div className="mb-1 row">
                <div className="mb-3 col-xs-12 col-sm-6 col-md-3 ph-2 mb-0-md">
                  <h4 className="mt-0 pb-1-4">
                    {t('footer.tutorial', 'Tutorial')}
                  </h4>

                  <ul className="list-unstyled">
                    <li className="pv-1-4">
                      <a
                        href={t(
                          'footer.features-link',
                          'https://hackmd.io/c/tutorials/%2Fs%2Ffeatures'
                        )}
                        className="text-gray-lighter"
                      >
                        {t('footer.features', 'Features')}
                      </a>
                    </li>
                    <li className="pv-1-4">
                      <a
                        href={t(
                          'next-app.overview.tutorials-link',
                          'https://hackmd.io/c/tutorials'
                        )}
                        className="text-gray-lighter"
                      >
                        {t('footer.tutorials-book', 'Tutorials book')}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mb-3 col-xs-12 col-sm-6 col-md-3 ph-2 mb-0-md">
                  <h4 className="mt-0 pb-1-4">
                    {t('footer.resources', 'Resources')}
                  </h4>

                  <ul className="list-unstyled">
                    <li className="pv-1-4">
                      <a
                        href={'https://hackmd.io/pricing'}
                        className="text-gray-lighter"
                      >
                        {t('footer.pricing', 'Pricing')}
                      </a>
                    </li>
                    <li className="pv-1-4">
                      <a
                        href={'https:hackmd.io/s/release-notes'}
                        className="text-gray-lighter"
                      >
                        {t('footer.releases', 'Releases')}
                      </a>
                    </li>
                    <li className="pv-1-4">
                      <a
                        href={t(
                          'next-app.overview.blog-link',
                          'https://blog.hackmd.io'
                        )}
                        className="text-gray-lighter"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {t('next-app.overview.blog', 'Blog')}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mb-3 col-xs-12 col-sm-6 col-md-3 ph-2 mb-0-md">
                  <h4 className="mt-0 pb-1-4">
                    {t('footer.policy', 'Policy')}
                  </h4>

                  <ul className="list-unstyled">
                    <li className="pv-1-4">
                      <a
                        href={'https://hackmd.io/s/terms'}
                        target="_blank"
                        className="text-gray-lighter"
                        rel="noreferrer"
                      >
                        {t('footer.terms', 'Terms')}
                      </a>
                    </li>
                    <li className="pv-1-4">
                      <a
                        href={'https://hackmd.io/s/privacy'}
                        target="_blank"
                        className="text-gray-lighter"
                        rel="noreferrer"
                      >
                        {t('footer.privacy', 'Privacy')}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mb-3 col-xs-12 col-sm-6 col-md-3 ph-2 mb-0-md">
                  <h4 className="mt-0 pb-1-4">
                    {t('footer.contact-us', 'Contact us')}
                  </h4>

                  <ul className="list-unstyled">
                    <li className="pv-1-4">
                      <a
                        href="mailto:support@hackmd.io"
                        className="text-gray-lighter"
                      >
                        <i className="fa fa-fw fa-envelope"></i>{' '}
                        support@hackmd.io
                      </a>
                    </li>
                    <li className="pv-1-4">
                      <a
                        href="https://facebook.com/hackmdio"
                        className="text-gray-lighter"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-fw fa-facebook-square"></i> HackMD
                      </a>
                    </li>
                    <li className="pv-1-4">
                      <a
                        href="https://twitter.com/hackmdio"
                        className="text-gray-lighter"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-fw fa-twitter"></i> @hackmdio
                      </a>
                    </li>
                    <li className="pv-1-4">
                      <a
                        href="https://discord.gg/yDw3AJbmwx"
                        className="text-gray-lighter"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-fw fa-discord"></i> Discord
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="w-100" />

              <div className="flex justify-between row ph-2">
                <div className="flex items-center col-xs-12 col-sm-6">
                  <span className="pr-1 ui-brand">
                    &copy; {year} HackMD. All Rights Reserved.
                  </span>
                </div>

                <div className="flex col-xs-12 col-sm-6 justify-start-xs justify-end-sm flex-row-sm flex-column-xs items-start-xs items-center-sm">
                  <select
                    title="Language"
                    className="ui-locale"
                    onChange={onLocaleChange}
                    defaultValue={locale}
                  >
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
