import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@primer/octicons-react'
import cx from 'classnames'

export default function NightSwitch({ className = '' }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      className={cx('night-switch-button btn px-2', className)}
      type="button"
      style={{ height: 34 }}
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
    >
      {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
