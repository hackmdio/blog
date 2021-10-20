import { useTranslation } from 'next-i18next'

export const Signup = () => {
  const { t } = useTranslation('common')

  return (
    <div className="flex py-8 text-center color-bg-subtle flex-justify-center">
      <h2 className="mb-5 h1">
        {t('getting-started-with-hackmd', 'Get started with HackMD')}
      </h2>

      <a href="https://hackmd.io" target="_blank" rel="noopener noreferrer">
        <button className="px-5 py-2 btn btn-primary">
          {t('signup', 'Sign up')}
        </button>
      </a>
    </div>
  )
}

export default Signup
