import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { useConfig } from '../contexts/ConfigContext'
import './Footer.css'

const Footer = () => {
  const { t } = useLanguage()
  const { config, loading } = useConfig()

  // Show loading or default content while config is loading
  if (loading) {
    return <div className="footer-loading">Loading...</div>
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{config?.site?.title || 'SITE 2025'}</h3>
            <p>
              {config?.site?.description || t('footer.description')}
            </p>
          </div>

          <div className="footer-section">
            <h4>{t('footer.quickLinks.title')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('header.navigation.home')}</Link></li>
              <li><Link to="/venue">{t('header.navigation.venue')}</Link></li>
              <li><Link to="/committees">{t('header.navigation.committees')}</Link></li>
              <li><Link to="/scientific-committee">{t('header.navigation.scientificCommittee')}</Link></li>
              <li><Link to="/organizing-committee">{t('header.navigation.organizingCommittee')}</Link></li>
              <li><Link to="/program">{t('header.navigation.program')}</Link></li>
              <li><Link to="/authors">{t('header.navigation.authors')}</Link></li>
              <li><Link to="/call-for-papers">{t('header.navigation.callForPapers')}</Link></li>
              <li><Link to="/call-for-special-sessions">{t('header.navigation.callForSpecialSessions')}</Link></li>
              <li><Link to="/submission-guidelines">{t('header.navigation.submissionGuidelines')}</Link></li>
              <li><Link to="/registration">{t('header.navigation.registration')}</Link></li>
              <li><Link to="/previous-editions">{t('header.navigation.previousEditions')}</Link></li>
              <li><Link to="/site-2023">{t('header.navigation.site2023')}</Link></li>
              <li><Link to="/site-2024">{t('header.navigation.site2024')}</Link></li>
              <li><Link to="/contact-us">{t('header.navigation.contactUs')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.contactUs')}</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>{config?.contact?.address || t('footer.address')}</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <a href={`tel:${config?.contact?.phone || t('footer.contact.phone')}`}>
                  {config?.contact?.phone || t('footer.contact.phone')}
                </a>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <a href={`mailto:${config?.contact?.email || t('footer.contact.email')}`}>
                  {config?.contact?.email || t('footer.contact.email')}
                </a>
              </div>
            </div>
            
            <div className="social-links">
              <a 
                href={config?.social?.facebook || "https://www.facebook.com/profile.php?id=100090234982911"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a 
                href={config?.social?.linkedin || "https://www.linkedin.com/company/107036663/admin/dashboard/"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {t('footer.copyright', { siteName: config?.site?.title || 'SITE2025' })}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer