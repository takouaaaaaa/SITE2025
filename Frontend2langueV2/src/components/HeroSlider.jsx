import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useConfig } from '../contexts/ConfigContext'
import ParticleBackground from './ParticleBackground'
import './HeroSlider.css'

const HeroSlider = () => {
  const { t } = useLanguage()
  const { config, loading } = useConfig()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Default slides with fallback values
  const getSlides = () => [
    {
      id: 1,
      title: t('hero.slides.slide1.title'),
      subtitle: t('hero.slides.slide1.subtitle'),
      description: t('hero.slides.slide1.description'),
      highlight: t('hero.slides.slide1.highlight'),
      backgroundImage: "/slider1.jpg",
      buttons: [
        { text: t('hero.slides.slide1.buttons.submitPaper'), link: "/submission", type: "primary", icon: "📄" },
        { text: t('hero.slides.slide1.buttons.learnMore'), link: "/about", type: "secondary", icon: "🔍" }
      ]
    },
    {
      id: 2,
      title: t('hero.slides.slide2.title'),
      subtitle: t('hero.slides.slide2.subtitle'),
      description: t('hero.slides.slide2.description'),
      highlight: t('hero.slides.slide2.highlight'),
      backgroundImage: "/slider3.jpg",
      buttons: [
        { text: t('hero.slides.slide2.buttons.viewProgram'), link: "/program", type: "primary", icon: "📅" },
        { text: t('hero.slides.slide2.buttons.registerNow'), link: "/registration", type: "secondary", icon: "🎫" }
      ]
    },
    {
      id: 3,
      title: t('hero.slides.slide3.title'),
      subtitle: t('hero.slides.slide3.subtitle'),
      description: t('hero.slides.slide3.description'),
      highlight: t('hero.slides.slide3.highlight'),
      backgroundImage: "/slider2.jpg",
      buttons: [
        { text: t('hero.slides.slide3.buttons.callForPapers'), link: "/call-for-papers", type: "primary", icon: "📝" },
        { text: t('hero.slides.slide3.buttons.sponsors'), link: "/sponsors", type: "secondary", icon: "🤝" }
      ]
    }
  ]

  const slides = getSlides()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Apply dynamic conference dates if available
  const getConferenceYear = () => {
    if (config?.dates?.conferenceStart) {
      return new Date(config.dates.conferenceStart).getFullYear()
    }
    return 2025
  }

  // Show loading while config is loading
  if (loading) {
    return <div className="hero-loading">Loading conference information...</div>
  }

  return (
    <section className="hero-slider">
      <ParticleBackground />
      <div className="tech-overlay"></div>
      <div className="data-flow"></div>

      {/* Floating Tech Elements */}
      <div className="floating-elements">
        <div className="floating-icon floating-icon-1">🔬</div>
        <div className="floating-icon floating-icon-2">⚡</div>
        <div className="floating-icon floating-icon-3">🌱</div>
        <div className="floating-icon floating-icon-4">🤖</div>
        <div className="floating-icon floating-icon-5">💡</div>
        <div className="floating-icon floating-icon-6">🔗</div>
      </div>

      {/* Animated Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `
                linear-gradient(
                  135deg,
                  rgba(15, 23, 42, 0.8) 0%,
                  rgba(30, 41, 59, 0.7) 30%,
                  rgba(51, 65, 85, 0.6) 60%,
                  rgba(71, 85, 105, 0.7) 100%
                ),
                url(${slide.backgroundImage})
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="slide-content">
              <div className="container">
                <div className="slide-text">
                  <div className="slide-badge">
                    <span className="badge-icon">🚀</span>
                    <span className="badge-text">{slide.title}</span>
                  </div>
                  <h1 className="slide-title">
                    <span className="title-main">{slide.subtitle}</span>
                    {/* Use dynamic year from config */}
                    <span className="title-year">{getConferenceYear()}</span>
                  </h1>
                  <p className="slide-description">{slide.description}</p>
                  
                  {/* Show conference dates if available */}
                  {config?.dates?.conferenceStart && config?.dates?.conferenceEnd && (
                    <div className="conference-dates">
                      <span className="dates-icon">📅</span>
                      <span className="dates-text">
                        {new Date(config.dates.conferenceStart).toLocaleDateString()} - 
                        {new Date(config.dates.conferenceEnd).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  <div className="slide-highlight">
                    <span className="highlight-icon">✨</span>
                    <span className="highlight-text">{slide.highlight}</span>
                  </div>
                  <div className="slide-buttons">
                    {slide.buttons.map((button, btnIndex) => (
                      <Link
                        key={btnIndex}
                        to={button.link}
                        className={`btn ${button.type === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        <span className="btn-icon">{button.icon}</span>
                        <span className="btn-text">{button.text}</span>
                        <span className="btn-arrow">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Slider Navigation */}
      <div className="slider-nav">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`nav-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.subtitle}`}
          >
            <span className="indicator-dot"></span>
            <span className="indicator-label">{slide.subtitle}</span>
            <span className="indicator-progress"></span>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="slide-counter">
        <span className="current-slide">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="slide-separator">/</span>
        <span className="total-slides">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}

export default HeroSlider