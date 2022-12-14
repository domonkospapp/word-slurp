'use client'

import LanguageSelection from '../languageSelection'

const MissingLanguageMappings = ({
  containedLanguages,
  languages,
  mappings,
}: {
  containedLanguages: Array<string>
  languages: Array<string>
  mappings: { [key: string]: string }
}) => {
  const missingMappings = containedLanguages.filter((lang) => !mappings[lang])

  const addMapping = (key: string, value: string) => {
    fetch('/api/languages/addMapping', {
      method: 'POST',
      body: JSON.stringify({
        language: key,
        isoLanguage: value,
      }),
    })
  }

  return (
    <div>
      <h2>Please set these languages</h2>
      {missingMappings.map((lang, index) => (
        <p key={index}>
          {lang}
          <LanguageSelection
            languages={languages}
            update={(value: string) => addMapping(lang, value)}
          />
        </p>
      ))}
    </div>
  )
}
export default MissingLanguageMappings
