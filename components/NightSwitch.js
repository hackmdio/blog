import useDarkMode from 'use-dark-mode'
import { SunIcon, MoonIcon } from '@primer/octicons-react'
import cx from 'classnames'

export default function NightSwitch({ className = '' }) {
  const darkMode = useDarkMode()

  return (
    <button
      className={cx('night-switch-button btn px-2', className)}
      type="button"
      style={{ height: 34 }}
      onClick={darkMode.toggle}
    >
      {darkMode.value ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
