import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import './Pages.css'

const PreviousEditions = () => {
  const { t } = useLanguage()
  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>{t('pages.previousEditions.title')}</h1>
        </div>
        
        <div className="page-content">
          <div className="previous-editions-links">
            <div className="edition-card">
              <h3>
                <Link to="/site-2023" className="edition-link">
                  SITE 2023
                </Link>
              </h3>
              <p>{t('pages.previousEditions.site2023Description')}</p>
            </div>

            <div className="edition-card">
              <h3>
                <Link to="/site-2024" className="edition-link">
                  SITE 2024
                </Link>
              </h3>
              <p>{t('pages.previousEditions.site2024Description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviousEditions
