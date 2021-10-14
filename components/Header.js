import Link from 'next/link'
import cx from 'classnames'

import NightSwitch from 'components/NightSwitch'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ThreeBarsIcon, XIcon } from '@primer/octicons-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useStateRef } from 'lib/hooks/useStateRef'

const LanguageDropdown = ({ className = '', direction = 'sw' }) => {
  const { asPath } = useRouter()
  const { t } = useTranslation('common')

  return (
    <details
      className={cx(
        'dropdown details-reset details-overlay d-inline-flex Header-item',
        className
      )}
    >
      <summary className="color-fg-muted p-2 d-inline" aria-haspopup="true">
        {t('language')}
        <div className="dropdown-caret ml-1"></div>
      </summary>

      <ul className={`dropdown-menu dropdown-menu-${direction}`}>
        <Link href={asPath} locale="en">
          <a className="dropdown-item">English</a>
        </Link>

        <Link href={asPath} locale="zh">
          <a className="dropdown-item">中文</a>
        </Link>

        <Link href={asPath} locale="ja">
          <a className="dropdown-item">日本語</a>
        </Link>
      </ul>
    </details>
  )
}

const Header = () => {
  const [sidebarOpen, setSidebarOpen, sidebarOpenRef] = useStateRef(false)
  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const sidebarRef = useRef()
  const clickOutside = useCallback((e) => {
    if (
      sidebarOpenRef.current &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      closeSidebar()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', clickOutside)

    return () => document.removeEventListener('click', clickOutside)
  }, [])

  return (
    <div
      className="navbar py-4 position-sticky top-0 d-flex px-3 flex-items-center border-bottom color-border-subtle color-bg-default position-relative"
      style={{ zIndex: 10 }}
    >
      <div className="d-flex justify-space-between flex-auto">
        <div className="d-flex flex-auto flex-items-center">
          <Link href="/">
            <a className="Header-item color-fg-default no-underline">
              <svg
                style={{ height: 20, width: 30 }}
                width="146"
                height="170"
                viewBox="0 0 146 170"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M145.71 60.71V160.89C145.71 163.303 144.751 165.618 143.045 167.325C141.338 169.031 139.023 169.99 136.61 169.99H9.10999C7.91411 169.991 6.72973 169.757 5.62451 169.3C4.51929 168.843 3.51493 168.173 2.66885 167.328C1.82278 166.483 1.15158 165.479 0.693634 164.375C0.235691 163.27 -7.22056e-07 162.086 0 160.89V9.09999C0.00265026 6.6856 0.963614 4.37101 2.67178 2.66472C4.37995 0.958424 6.69559 -1.45459e-06 9.10999 0H85V51.6C85 54.0161 85.9598 56.3333 87.6682 58.0417C89.3767 59.7502 91.6939 60.71 94.11 60.71H145.71ZM109.29 75.89C109.29 75.0943 108.974 74.3313 108.411 73.7687C107.849 73.2061 107.086 72.89 106.29 72.89H39.47C38.6744 72.89 37.9113 73.2061 37.3487 73.7687C36.7861 74.3313 36.47 75.0943 36.47 75.89V81.96C36.47 82.7556 36.7861 83.5187 37.3487 84.0813C37.9113 84.6439 38.6744 84.96 39.47 84.96H106.25C107.046 84.96 107.809 84.6439 108.371 84.0813C108.934 83.5187 109.25 82.7556 109.25 81.96L109.29 75.89ZM109.29 100.17C109.29 99.3743 108.974 98.6113 108.411 98.0487C107.849 97.4861 107.086 97.17 106.29 97.17H39.47C38.6744 97.17 37.9113 97.4861 37.3487 98.0487C36.7861 98.6113 36.47 99.3743 36.47 100.17V106.25C36.47 107.046 36.7861 107.809 37.3487 108.371C37.9113 108.934 38.6744 109.25 39.47 109.25H106.25C107.046 109.25 107.809 108.934 108.371 108.371C108.934 107.809 109.25 107.046 109.25 106.25L109.29 100.17ZM109.29 124.46C109.29 123.664 108.974 122.901 108.411 122.339C107.849 121.776 107.086 121.46 106.29 121.46H39.47C38.6744 121.46 37.9113 121.776 37.3487 122.339C36.7861 122.901 36.47 123.664 36.47 124.46V130.53C36.47 131.326 36.7861 132.089 37.3487 132.651C37.9113 133.214 38.6744 133.53 39.47 133.53H106.25C107.046 133.53 107.809 133.214 108.371 132.651C108.934 132.089 109.25 131.326 109.25 130.53L109.29 124.46ZM141.92 48.57H97.14V3.78999C98.3704 4.55385 99.5168 5.44547 100.56 6.45L139.26 45.15C140.267 46.1907 141.159 47.3374 141.92 48.57Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-mono h4">HackMD Blog</span>
            </a>
          </Link>

          <Link href="/blog">
            <a className="Header-item color-fg-default no-underline d-none d-sm-flex">
              Posts
            </a>
          </Link>

          <Link href="/tags">
            <a className="Header-item color-fg-default no-underline d-none d-sm-flex">
              Tags
            </a>
          </Link>
        </div>

        <div className="d-flex flex-items-center">
          <LanguageDropdown className="d-none d-sm-block" />

          <NightSwitch className="d-none d-sm-block" />

          <div style={{ cursor: 'pointer' }} onClick={toggleSidebar}>
            <ThreeBarsIcon size={18} className="d-sm-none" />
          </div>
        </div>

        <div
          className={cx(
            'position-fixed color-bg-default right-0 top-0 height-fit sidebar border-left',
            { 'sidebar-open': sidebarOpen }
          )}
          style={{ width: 300, height: '100%' }}
          ref={sidebarRef}
        >
          <div style={{ cursor: 'pointer' }} onClick={closeSidebar}>
            <XIcon size={24} className="right-3 top-4 position-absolute" />
          </div>

          <div className="d-flex flex-column flex-justify-center pt-8 px-5">
            <Link href="/blog">
              <a className="Header-item color-fg-default no-underline h3">
                Posts
              </a>
            </Link>

            <Link href="/tags">
              <a className="Header-item color-fg-default no-underline h3">
                Tags
              </a>
            </Link>

            <LanguageDropdown direction="s" />

            <NightSwitch />
          </div>
        </div>
      </div>

      <style jsx scoped>
        {`
          .sidebar {
            transform: translateX(300px);
            transition: transform 0.2s ease-in-out;
          }

          .sidebar.sidebar-open {
            transform: translateX(0);
          }

          .sidebar .Header-item:not(:last-child) {
            margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  )
}

export default Header
