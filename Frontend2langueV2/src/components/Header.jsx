import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaEdit,
  FaUserPlus,
  FaHistory,
  FaEnvelopeOpen,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { useConfig } from '../contexts/ConfigContext'
import LanguageSelector from './LanguageSelector'
import './Header.css'
// 1. Import the base URL from your API service
import { BASE_URL } from '../services/mainApi'

// 2. Get the server's root address (e.g., http://localhost:8083)
const SERVER_ROOT = BASE_URL.replace('/api', '');

const Header = () => {
  const { t } = useLanguage()
  const { config, loading } = useConfig()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }
  
  // 3. Set the website title dynamically from the config
  useEffect(() => {
    if (config?.site?.title) {
      document.title = config.site.title;
    }
  }, [config?.site?.title]);


  if (loading) {
    return <div className="header-loading">Loading...</div>
  }

  // 4. Transform the file path from the backend into a full URL
  const getLogoUrl = () => {
    const logoPath = config?.site?.logo;
    if (!logoPath) {
      // If no logo is set, use the placeholder
      return '/site-placeholder.png';
    }

    // The backend sends a file path (e.g., "uploads\config-logos\file.png").
    // We must convert it to a URL (e.g., "http://localhost:8083/uploads/config-logos/file.png").
    const cleanedPath = logoPath.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    return `${SERVER_ROOT}/${cleanedPath}`;
  };

  const logoUrl = getLogoUrl();

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="main-nav">
        <div className="container nav-content">
          <div className="logo-group">
            <a href="https://isetbz.rnu.tn" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
              <img src="/reseau-logo.png" alt="Réseau Logo" className="partner-logo" />
            </a>
            <Link to="/" className="main-logo-link">
              {/* 5. Use the dynamically generated title and logo URL */}
              <img
                src={logoUrl}
                alt={config?.site?.title || 'SITE logo'}
                className="main-logo"
              />
            </Link>
            <a href="https://www.facebook.com/ADT.Bizerte" target="_blank" rel="noopener noreferrer" className="partner-logo-link">
              <img src="/adt-logo.png" alt="ADT Logo" className="partner-logo" />
            </a>
          </div>

          <div className="header-actions">
            <LanguageSelector />
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            {[
              { label: t('header.navigation.home'), icon: <FaHome />, path: '/', dropdown: [{ label: t('header.navigation.venue'), path: '/venue' }] },
              { label: t('header.navigation.committees'), icon: <FaUsers />, path: '/committees', dropdown: [ { label: t('header.navigation.honoraryCommittee'), path: '/honorary-committee' }, { label: t('header.navigation.scientificCommittee'), path: '/scientific-committee' }, { label: t('header.navigation.organizingCommittee'), path: '/organizing-committee' }, ] },
              { label: t('header.navigation.program'), icon: <FaCalendarAlt />, path: '/program' },
              { label: t('header.navigation.authors'), icon: <FaEdit />, path: '/authors', dropdown: [ { label: t('header.navigation.callForPapers'), path: '/call-for-papers' }, { label: t('header.navigation.callForSpecialSessions'), path: '/call-for-special-sessions' }, { label: t('header.navigation.submissionGuidelines'), path: '/submission-guidelines' }, ] },
              { label: t('header.navigation.registration'), icon: <FaUserPlus />, path: '/registration' },
              { label: t('header.navigation.previousEditions'), icon: <FaHistory />, path: '/previous-editions', dropdown: [ { label: t('header.navigation.site2023'), path: '/site-2023' }, { label: t('header.navigation.site2024'), path: '/site-2024' }, ] },
              { label: t('header.navigation.contactUs'), icon: <FaEnvelopeOpen />, path: '/contact-us' },
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <div className="nav-link-wrapper">
                  <Link to={item.path} className="nav-link" onClick={() => { setIsMobileMenuOpen(false); setOpenDropdown(null); }}>
                    {item.icon} <span>{item.label}</span>
                  </Link>
                  {item.dropdown && (
                    <button className="dropdown-toggle" onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleDropdown(index); }}>
                      ▼
                    </button>
                  )}
                </div>
                {item.dropdown && (
                  <ul className={`dropdown ${openDropdown === index ? 'show' : ''}`}>
                    {item.dropdown.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link to={sub.path} onClick={() => { setIsMobileMenuOpen(false); setOpenDropdown(null); }}>
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header