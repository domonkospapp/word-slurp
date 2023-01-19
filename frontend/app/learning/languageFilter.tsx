'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { LanguagePair } from '../../types/languagePair'
import Select from '../../ui/inputs/Select'

const LanguageFilter = ({ languages }: { languages: Array<LanguagePair> }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [languageIndex, setLanguageIndex] = useState<number | undefined>()

  useEffect(() => {
    const index = getInitialLanguageIndex()
    // remove query params if not exists for the user
    if (index == -1) {
      router.replace('/learning')
    } else {
      setLanguageIndex(index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInitialLanguageIndex = () => {
    const ol = searchParams.get('ol')
    const fl = searchParams.get('fl')
    return languages.findIndex(
      (lgs) => lgs.originalLanguage == ol && lgs.foreignLanguage == fl
    )
  }

  const updateLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const index: number = parseInt(e.target.value)
    setLanguageIndex(index || undefined)
    const currentLanguage = languages[index]
    const searchParams = createSearchParams(currentLanguage)
    router.replace(`/learning${searchParams}`)
  }

  const createSearchParams = (languages: LanguagePair) => {
    if (!languages) {
      return ''
    }
    if (languages.originalLanguage && languages.foreignLanguage) {
      return `?ol=${languages.originalLanguage}&fl=${languages.foreignLanguage}`
    } else if (languages.originalLanguage) {
      return `?ol=${languages.originalLanguage}`
    } else if (languages.foreignLanguage) {
      return `?fl=${languages.foreignLanguage}`
    }
    return ''
  }

  return (
    <Select value={languageIndex} onChange={updateLanguage}>
      <option value={undefined}>all</option>
      {languages &&
        languages.map((v, k) => (
          <option key={k} value={k}>
            {v.originalLanguage} - {v.foreignLanguage}
          </option>
        ))}
    </Select>
  )
}

export default LanguageFilter
