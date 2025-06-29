import React from 'react'
import usePageTranslation from '../hooks/usePageTranslation'
import { useLanguage } from '../contexts/LanguageContext'
import './Pages.css'

const Venue = () => {
  const { title } = usePageTranslation('venue')
  const { t } = useLanguage()

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>{title}</h1>
        </div>

        <div className="page-content">
          <div className="venue-info">
            <h3>{t('pages.venue.location')}</h3>
            <p>
              <strong>ADT Bizerte</strong><br />
              Institut Supérieur des Etudes Technologiques de Bizerte<br />
              Bizerte, Tunisia
            </p>

            <div className="venue-details">
              <h4>{t('pages.venue.subtitle')}</h4>
              <p>
                {t('pages.venue.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Venue
