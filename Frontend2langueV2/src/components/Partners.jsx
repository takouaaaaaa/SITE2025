import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './Partners.css'

const Partners = () => {
  const { t } = useLanguage()
  const partners = [
    { id: 1, src: "https://site-conf.com/wp-content/uploads/2025/05/1.png", alt: "Partner 1" },
    { id: 2, src: "https://site-conf.com/wp-content/uploads/2025/05/5.png", alt: "Partner 5" },
    { id: 3, src: "https://site-conf.com/wp-content/uploads/2025/05/3.png", alt: "Partner 3" },
    { id: 4, src: "https://site-conf.com/wp-content/uploads/2025/05/2.png", alt: "Partner 2" },
    { id: 5, src: "https://site-conf.com/wp-content/uploads/2025/05/9.png", alt: "Partner 9" },
    { id: 6, src: "https://site-conf.com/wp-content/uploads/2025/05/6.png", alt: "Partner 6" },
    { id: 7, src: "https://site-conf.com/wp-content/uploads/2025/05/7.png", alt: "Partner 7" },
    { id: 8, src: "https://site-conf.com/wp-content/uploads/2025/05/10.png", alt: "Partner 10" },
    { id: 9, src: "https://site-conf.com/wp-content/uploads/2025/06/partners-150x150.png", alt: "Partners" },
    { id: 10, src: "https://site-conf.com/wp-content/uploads/2025/05/4.png", alt: "Partner 4" },
    { id: 11, src: "https://site-conf.com/wp-content/uploads/2025/06/13-150x150.png", alt: "Partner 13" },
    { id: 12, src: "https://site-conf.com/wp-content/uploads/2025/06/14-150x150.png", alt: "Partner 14" },
    { id: 13, src: "https://site-conf.com/wp-content/uploads/2025/06/15-150x150.png", alt: "Partner 15" },
    { id: 14, src: "https://site-conf.com/wp-content/uploads/2025/06/16-150x150.png", alt: "Partner 16" },
    { id: 15, src: "https://site-conf.com/wp-content/uploads/2025/06/17-150x150.png", alt: "Partner 17" },
    { id: 16, src: "https://site-conf.com/wp-content/uploads/2025/06/18-150x150.png", alt: "Partner 18" },
    { id: 17, src: "https://site-conf.com/wp-content/uploads/2025/06/19-150x150.png", alt: "Partner 19" },
    { id: 18, src: "https://site-conf.com/wp-content/uploads/2025/06/20-150x150.png", alt: "Partner 20" },
    { id: 19, src: "https://site-conf.com/wp-content/uploads/2025/05/8.png", alt: "Partner 8" },
    { id: 20, src: "https://site-conf.com/wp-content/uploads/2025/05/12.png", alt: "Partner 12" }
  ]

  // Duplicate for infinite scroll effect
  const all = [...partners, ...partners]

  return (
    <section className="partners-section">
      <h2 className="section-title">{t('partners.title') || 'Partners & Sponsors'}</h2>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {all.map((partner, index) => (
            <div className="carousel-item" key={index}>
              <img src={partner.src} alt={partner.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners


