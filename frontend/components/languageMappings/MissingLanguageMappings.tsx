'use client'

import { Fragment } from 'react'
import LanguageSelection from '../LanguageSelection'

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
    <div className="mt-4 grid grid-cols-2 items-center">
      {missingMappings.length > 0 && (
        <div className="col-span-2">
          <span className="ml-2 border-b-4 border-stone-900 text-xl font-bold leading-10 shadow-b-normal shadow-pink-200">
            Please map these languages
          </span>
        </div>
      )}
      {missingMappings.map((lang, index) => (
        <Fragment key={index}>
          <div className="ml-2">{lang}</div>
          <div className="ml-2">
            <LanguageSelection
              languages={languages}
              update={(value: string) => addMapping(lang, value)}
              autoUpdate
            />
          </div>
        </Fragment>
      ))}
    </div>
  )
}
export default MissingLanguageMappings
