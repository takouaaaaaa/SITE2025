import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './Pages.css'

const CallForPapers = () => {
  const { t, isLoading } = useLanguage()

  // Attendre que les traductions soient chargées
  if (isLoading) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="page-header">
            <h1>{t('common.loading')}</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>{t('callForPapers.title')}</h1>
        </div>
        
        <div className="page-content">
          <div className="call-for-papers-image">
            <img 
              src="https://site-conf.com/wp-content/uploads/2025/06/SITE-2025-2-768x1024.png" 
              alt="SITE 2025 Call for Papers" 
            />
          </div>
          </div>
      </div>
    </div>
  )
}

export default CallForPapers
