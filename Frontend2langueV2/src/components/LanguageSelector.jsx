import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './LanguageSelector.css'

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, isLoading } = useLanguage()

  const toggleLanguage = () => {
    if (!isLoading) {
      const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr'
      changeLanguage(newLanguage)
    }
  }

  return (
    <button
      className="language-toggle-button"
      onClick={toggleLanguage}
      disabled={isLoading}
      aria-label={`Changer vers ${currentLanguage === 'fr' ? 'English' : 'Français'}`}
    >
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <span className="language-text">
          {currentLanguage === 'fr' ? 'FR' : 'EN'}
        </span>
      )}
    </button>
  )
}

export default LanguageSelector
