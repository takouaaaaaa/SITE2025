import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollAnimation from './ScrollAnimation'
import './Topics.css'

const Topics = () => {
  const { t } = useLanguage()

  return (
    <section className="topics-section section">
      <div className="container">
        <ScrollAnimation>
          <h2 className="section-title gradient-text">{t('about.themes.title') || 'Topics'}</h2>
        </ScrollAnimation>
        <ScrollAnimation delay={300}>
          <div className="topics-content">
            <div className="topics-image">
              <img
                src="https://site-conf.com/wp-content/uploads/2025/05/Engineering-Innovation-1-1024x560.png"
                alt="Engineering Innovation"
              />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

export default Topics
