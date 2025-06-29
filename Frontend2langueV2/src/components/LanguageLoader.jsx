import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './LanguageLoader.css'

const LanguageLoader = ({ children }) => {
  const { isLoading } = useLanguage()

  if (isLoading) {
    return (
      <div className="language-loader">
        <div className="loader-container">
          <div className="loader-spinner"></div>
          <div className="loader-text">
            <span className="loader-flag">🌐</span>
            <span>Loading translations...</span>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default LanguageLoader
