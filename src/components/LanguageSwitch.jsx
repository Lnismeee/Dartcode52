import { LANGUAGES } from '../i18n'

function LanguageSwitch({ lang, onChange }) {
  const activeIndex = LANGUAGES.findIndex((l) => l.code === lang)

  return (
    <div className="lang" role="group" aria-label="Ngôn ngữ / Language">
      <span
        className="lang__thumb"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
        aria-hidden="true"
      />

      {LANGUAGES.map((item) => (
        <button
          key={item.code}
          type="button"
          className={`lang__btn${item.code === lang ? ' is-active' : ''}`}
          onClick={() => onChange(item.code)}
          aria-pressed={item.code === lang}
          title={item.name}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitch
