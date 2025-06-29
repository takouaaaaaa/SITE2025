import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'

const ContactUs = () => {
  const { t } = useLanguage()
  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div className="page-header">
          <h1>{t('pages.contactUs.title')}</h1>

          <p className="page-subtitle">{t('contactUs.subtitle')}</p>
          <p>{t('contactUs.description')}</p>
        </div>
        
        <div style={styles.contentWrapper}>
          <div style={styles.contactSection}>
            <div style={styles.contactCard}>
              <div style={styles.contactItem}>
                <div style={styles.iconWrapper}>
                  <FaMapMarkerAlt style={styles.icon} />
                </div>
                <div>
                  <h3 style={styles.contactTitle}>{t('contactUs.info.address.title')}</h3>
                  <p style={styles.contactText}>
                    {t('contactUs.info.address.line1')}
                  </p>
                  <p style={styles.contactText}>
                    {t('contactUs.info.address.line2')}
                  </p>
                  <p style={styles.contactText}>
                    {t('contactUs.info.address.line3')}
                  </p>
                </div>
              </div>
              
              <div style={styles.contactItem}>
                <div style={styles.iconWrapper}>
                  <FaPhone style={styles.icon} />
                </div>
                <div>
                  <h3 style={styles.contactTitle}>{t('contactUs.info.phone.title')}</h3>
                  <p style={styles.contactText}>
                    <a href={`tel:${t('contactUs.info.phone.main')}`} style={styles.link}>
                      {t('contactUs.info.phone.main')}
                    </a>
                  </p>
                  <p style={styles.contactText}>
                    <a href={`tel:${t('contactUs.info.phone.mobile')}`} style={styles.link}>
                      {t('contactUs.info.phone.mobile')}
                    </a>
                  </p>
                </div>
              </div>
              
              <div style={styles.contactItem}>
                <div style={styles.iconWrapper}>
                  <FaEnvelope style={styles.icon} />
                </div>
                <div>
                  <h3 style={styles.contactTitle}>Email</h3>
                  <p style={styles.contactText}>
                    <a href="mailto:contact@site-conf.com" style={styles.link}>contact@site-conf.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.socialCard}>
              <h3 style={styles.socialTitle}>{t('contactUs.social.followUs')}</h3>
              <div style={styles.socialLinks}>
                <a 
                  href="https://www.facebook.com/profile.php?id=100090234982911" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <FaFacebook style={styles.socialIcon} /> Facebook
                </a>
                <a 
                  href="https://www.linkedin.com/company/107036663/admin/dashboard/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <FaLinkedin style={styles.socialIcon} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div style={styles.mapSection}>
            <h3 style={styles.mapTitle}>{t('contactUs.map.title')}</h3>
            <div style={styles.mapContainer}>
              <iframe
                title={t('contactUs.map.conferenceLocation')}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12901.71491840339!2d10.542884!3d36.375959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDIyJzMzLjUiTiAxMMKwMzInMzQuNCJF!5e0!3m2!1sfr!2stn!4v1620000000000!5m2!1sfr!2stn"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div style={styles.mapFooter}>
              <FaGlobe style={styles.globeIcon} />
              <span>Yasmine Hammamet, Tunisia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  pageContainer: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '2rem 0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  
  subtitle: {
    fontSize: '1.25rem',
    color: '#64748b',
    fontWeight: '500',
  },
  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  contactSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  contactItem: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    backgroundColor: '#e0f2fe',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
  },
  icon: {
    color: '#0369a1',
    fontSize: '1.25rem',
  },
  contactTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.25rem',
  },
  contactText: {
    color: '#64748b',
    margin: '0',
    lineHeight: '1.6',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#1d4ed8',
      textDecoration: 'underline',
    },
  },
  socialCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  socialTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#1d4ed8',
    },
  },
  socialIcon: {
    fontSize: '1.25rem',
  },
  mapSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  mapTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  mapContainer: {
    width: '100%',
    marginBottom: '1rem',
  },
  mapFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '0.875rem',
  },
  globeIcon: {
    color: '#10b981',
  },
}

export default ContactUs