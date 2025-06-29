import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

const PersonalInfoSection = ({ formData, errors, onChange }) => {
  const { t } = useLanguage()
  return (
    <div className="form-section">
      <h3 className="section-title">
        <FaUser /> {t('pages.registrationForm.personalInfo.title')}
      </h3>

      <div className="form-group">
        <label htmlFor="fullName">{t('pages.registrationForm.personalInfo.fullName')} *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          className={errors.fullName ? 'error' : ''}
          placeholder={t('pages.registrationForm.personalInfo.fullNamePlaceholder')}
        />
        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="institution">{t('pages.registrationForm.personalInfo.institution')} *</label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={onChange}
            className={errors.institution ? 'error' : ''}
            placeholder={t('pages.registrationForm.personalInfo.institutionPlaceholder')}
          />
          {errors.institution && <span className="error-message">{errors.institution}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="position">{t('pages.registrationForm.personalInfo.position')} *</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={onChange}
            className={errors.position ? 'error' : ''}
            placeholder={t('pages.registrationForm.personalInfo.positionPlaceholder')}
          />
          {errors.position && <span className="error-message">{errors.position}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">{t('pages.registrationForm.personalInfo.email')} *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className={errors.email ? 'error' : ''}
            placeholder={t('pages.registrationForm.personalInfo.emailPlaceholder')}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">{t('pages.registrationForm.personalInfo.phone')} *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className={errors.phone ? 'error' : ''}
            placeholder={t('pages.registrationForm.personalInfo.phonePlaceholder')}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoSection
