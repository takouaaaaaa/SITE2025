import React, { createContext, useContext, useState, useEffect } from 'react'

// Créer le contexte de langue
const LanguageContext = createContext()

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Langues supportées
export const SUPPORTED_LANGUAGES = {
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }
}

// Langue par défaut
const DEFAULT_LANGUAGE = 'fr'

// Fournisseur de contexte de langue
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE)
  const [translations, setTranslations] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // Charger les traductions depuis localStorage au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('site-language')
    if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    }
    loadTranslations(savedLanguage || DEFAULT_LANGUAGE)
  }, [])

  // Fonction pour charger les traductions
  const loadTranslations = async (languageCode) => {
    setIsLoading(true)
    try {
      // Import dynamique des traductions
      const translationModule = await import(`../translations/${languageCode}.json`)
      setTranslations(translationModule.default)
    } catch (error) {
      console.error(`Error loading translations for ${languageCode}:`, error)
      // Fallback vers le français si erreur
      if (languageCode !== DEFAULT_LANGUAGE) {
        const fallbackModule = await import(`../translations/${DEFAULT_LANGUAGE}.json`)
        setTranslations(fallbackModule.default)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour changer de langue
  const changeLanguage = async (languageCode) => {
    if (SUPPORTED_LANGUAGES[languageCode] && languageCode !== currentLanguage) {
      setCurrentLanguage(languageCode)
      localStorage.setItem('site-language', languageCode)
      await loadTranslations(languageCode)
    }
  }

  // Fonction pour obtenir une traduction
  const t = (key, params = {}) => {
    if (!translations) return key

    // Naviguer dans l'objet de traductions avec la clé (ex: "header.navigation.home")
    const keys = key.split('.')
    let value = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    // Si la valeur est une chaîne, remplacer les paramètres
    if (typeof value === 'string') {
      return Object.keys(params).reduce((str, param) => {
        return str.replace(new RegExp(`{{${param}}}`, 'g'), params[param])
      }, value)
    }

    return value || key
  }

  // Fonction pour obtenir la langue actuelle
  const getCurrentLanguage = () => SUPPORTED_LANGUAGES[currentLanguage]

  // Fonction pour vérifier si une langue est RTL (pour l'avenir)
  const isRTL = () => false // Ni français ni anglais ne sont RTL

  const value = {
    currentLanguage,
    translations,
    isLoading,
    changeLanguage,
    t,
    getCurrentLanguage,
    isRTL,
    supportedLanguages: SUPPORTED_LANGUAGES
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
