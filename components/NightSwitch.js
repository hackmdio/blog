import useDarkMode from 'use-dark-mode'
import { SunIcon, MoonIcon } from '@primer/octicons-react'

export default function NightSwitch() {
  const darkMode = useDarkMode()

  return (
    <button
      className="night-switch-button btn position-fixed top-3.5 right-3 px-2"
      type="button"
      onClick={darkMode.toggle}
    >
      {darkMode.value ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
