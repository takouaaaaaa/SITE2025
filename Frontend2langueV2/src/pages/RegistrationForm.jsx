import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import useRegistrationForm from '../hooks/useRegistrationForm'
import PersonalInfoSection from '../components/forms/PersonalInfoSection'
import ConferenceOptionsSection from '../components/forms/ConferenceOptionsSection'
import PaymentInfoSection from '../components/forms/PaymentInfoSection'
import FormActions from '../components/forms/FormActions'
import './Pages.css'

const RegistrationForm = () => {
  const { t } = useLanguage()
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit
  } = useRegistrationForm()

  return (
    <div className="page-container registration-form-page">
      <div className="container">
        <div className="page-header">
          <h1>{t('pages.registrationForm.title')}</h1>
          <p className="page-subtitle">{t('pages.registrationForm.subtitle')}</p>
        </div>

        <div className="page-content">
          <form onSubmit={handleSubmit} className="registration-form">

            <PersonalInfoSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />

            <ConferenceOptionsSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />

            <PaymentInfoSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />

            <FormActions
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
            />

          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm