import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollAnimation from './ScrollAnimation'
import './About.css'

const About = () => {
  const { t } = useLanguage()

  return (
    <section className="about-section section">
      <div className="container">
        <ScrollAnimation>
          <h2 className="section-title gradient-text">{t('about.title')}</h2>
        </ScrollAnimation>
        <ScrollAnimation delay={200}>
          <div className="about-content">
            <p>
              {t('about.description')}
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

export default About
