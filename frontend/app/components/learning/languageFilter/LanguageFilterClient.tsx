'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import Select from '../../../../ui/inputs/Select'

const LanguageFilterClient = ({ children }: { children: ReactElement }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [languageSearchParam, setLanguageSearchParam] = useState<
    string | undefined
  >()

  useEffect(() => {
    const searchParam = getInitialLanguage()
    // remove query params if not exists for the user
    if (searchParam) {
      setLanguageSearchParam(searchParam)
    } else {
      if (!searchParams.get('wordSetId')) router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInitialLanguage = () => {
    const ol = searchParams.get('ol')
    const fl = searchParams.get('fl')
    if (ol && fl) return `ol=${ol}&fl=${fl}`
    return null
  }

  const updateLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setLanguageSearchParam(e.target.value)
      router.replace(`/?${e.target.value}`)
    } else {
      setLanguageSearchParam(undefined)
      router.replace('/')
    }
  }

  return (
    <Select value={languageSearchParam} onChange={updateLanguage} fullWidth>
      <option value={undefined}>all</option>
      {children}
    </Select>
  )
}

export default LanguageFilterClient
