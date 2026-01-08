import { createContext } from 'react'
import { getTranslations } from '../translations'

export const TranslationContext = createContext()

export const TranslationProvider = ({ children, language = 'English' }) => {
  const t = getTranslations(language)
  
  return (
    <TranslationContext.Provider value={t}>
      {children}
    </TranslationContext.Provider>
  )
}

