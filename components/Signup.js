import { useTranslation } from 'next-i18next'

export const Signup = () => {
  const { t } = useTranslation('common')

  return (
    <div className="color-bg-subtle flex flex-justify-center text-center py-8">
      <h2 className="mb-5 h1">Get started with HackMD</h2>

      <p className="mb-5 f4">Blah blah blah</p>

      <a href="https://hackmd.io" target="_blank" rel="noopener noreferrer">
        <button className="btn btn-primary px-5 py-2">
          {t('signup', 'Sign up')}
        </button>
      </a>
    </div>
  )
}

export default Signup
