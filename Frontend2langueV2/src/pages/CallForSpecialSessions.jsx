import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './Pages.css'

const CallForSpecialSessions = () => {
  const { t } = useLanguage()
  const title = t('callForSpecialSessions.title')

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>{title}</h1>
        </div>
        
        <div className="page-content">
          <div className="coordinators-section">
            <h3>{t('callForSpecialSessions.coordinators.title')}:</h3>
            <ul>
              {t('callForSpecialSessions.coordinators.list', { returnObjects: true }).map((coordinator, index) => (
                <li key={index}>
                  <strong>{coordinator.name} ({coordinator.affiliation})</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="special-sessions-info">
            <p>
              {t('callForSpecialSessions.description')}
            </p>
          </div>

          <div className="contact-section">
            <a href="mailto:jzghal@parisnanterre.fr" className="btn btn-primary">
              {t('header.navigation.contactUs')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallForSpecialSessions
