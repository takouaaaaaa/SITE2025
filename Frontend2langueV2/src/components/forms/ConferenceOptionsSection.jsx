import React, { useState, useEffect } from 'react'
import { FaFileAlt, FaPlus, FaTimes, FaCalculator } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

const ConferenceOptionsSection = ({ formData, errors, onChange }) => {
  const { t } = useLanguage()
  const [newAccompanyingPerson, setNewAccompanyingPerson] = useState({ name: '', age: '' })

  // Registration fee data
  const registrationFees = {
    withAccommodation: {
      academic: { tunisia: 700, international: 450 },
      student: { tunisia: 650, international: 400 },
      professional: { tunisia: 750, international: 500 }
    },
    withoutAccommodation: 450, // TND only
    additionalFees: {
      adultAccompanying: { tunisia: 120, international: 80 }, // per night
      singleSupplement: { tunisia: 25, international: 25 }, // per night
      airportTransfer: 50, // EUR only
      socialEvent: { tunisia: 50, international: 100 }
    }
  }

  // Calculate total fee
  const calculateTotalFee = () => {
    let total = 0

    // Only calculate if required fields are selected
    if (!formData.participantCategory || formData.fromTunisia === undefined) {
      return 0
    }

    // Base registration fee
    if (formData.withAccommodation) {
      const categoryFees = registrationFees.withAccommodation[formData.participantCategory]
      if (categoryFees) {
        total += formData.fromTunisia ? categoryFees.tunisia : categoryFees.international
      }
    } else {
      total += registrationFees.withoutAccommodation // Always TND for without accommodation
    }

    // Accompanying persons (2 nights)
    if (formData.accompanyingPersons && formData.accompanyingPersons.length > 0) {
      // Count adults (18+) for discount calculation
      const adults = formData.accompanyingPersons.filter(person => {
        const age = parseInt(person.match(/\((\d+) years old\)/)?.[1] || '0')
        return age >= 18
      })

      formData.accompanyingPersons.forEach(person => {
        const age = parseInt(person.match(/\((\d+) years old\)/)?.[1] || '0')

        if (age < 2) {
          // Children under 2 are free
          return
        }

        let personFee = registrationFees.additionalFees.adultAccompanying
        personFee = formData.fromTunisia ? personFee.tunisia : personFee.international

        if (age < 12) {
          // Child under 12 years
          if (adults.length >= 2) {
            // Child with 2 adults gets 50% discount
            personFee *= 0.5
          } else {
            // Child in separate room or with single adult gets 30% discount
            personFee *= 0.7
          }
        }

        total += personFee * 2 // 2 nights
      })
    }

    // Single room supplement (2 nights)
    if (formData.singleRoom && formData.withAccommodation) {
      const supplement = registrationFees.additionalFees.singleSupplement
      const supplementFee = formData.fromTunisia ? supplement.tunisia : supplement.international
      total += supplementFee * 2 // 2 nights
    }

    // Airport transfer
    if (formData.airportTransfer) {
      total += registrationFees.additionalFees.airportTransfer // Always EUR
    }

    // Social event
    if (formData.socialEvent) {
      const eventFee = registrationFees.additionalFees.socialEvent
      total += formData.fromTunisia ? eventFee.tunisia : eventFee.international
    }

    return Math.round(total * 100) / 100 // Round to 2 decimal places
  }

  // Update total whenever relevant form data changes
  useEffect(() => {
    // If user switches to Tunisia, disable airport transfer
    if (formData.fromTunisia === true && formData.airportTransfer) {
      onChange({
        target: {
          name: 'airportTransfer',
          value: false
        }
      })
    }

    const total = calculateTotalFee()

    // Only set currency if we have a valid calculation
    let currency = 'TND' // Default currency
    if (total > 0) {
      currency = (!formData.withAccommodation || formData.fromTunisia) ? 'TND' :
                 (formData.airportTransfer && !formData.withAccommodation) ? 'EUR' :
                 formData.fromTunisia ? 'TND' : 'EUR'
    }

    onChange({
      target: {
        name: 'calculatedTotal',
        value: total
      }
    })

    onChange({
      target: {
        name: 'currency',
        value: currency
      }
    })
  }, [
    formData.withAccommodation,
    formData.participantCategory,
    formData.fromTunisia,
    formData.accompanyingPersons,
    formData.singleRoom,
    formData.airportTransfer,
    formData.socialEvent
  ])

  const addAccompanyingPerson = () => {
    if (newAccompanyingPerson.name.trim() && newAccompanyingPerson.age.trim()) {
      const personData = `${newAccompanyingPerson.name.trim()} (${newAccompanyingPerson.age.trim()} years old)`

      onChange({
        target: {
          name: 'accompanyingPersons',
          value: [...formData.accompanyingPersons, personData]
        }
      })
      setNewAccompanyingPerson({ name: '', age: '' })
    }
  }

  const removeAccompanyingPerson = (index) => {
    onChange({
      target: {
        name: 'accompanyingPersons',
        value: formData.accompanyingPersons.filter((_, i) => i !== index)
      }
    })
  }

  return (
    <div className="form-section">
      <h3 className="section-title">
        <FaFileAlt /> {t('pages.registrationForm.conferenceOptions.title')}
      </h3>

      {/* Participant Category */}
      <div className="form-group">
        <label htmlFor="participantCategory">{t('pages.registrationForm.conferenceOptions.participantCategory')} *</label>
        <select
          id="participantCategory"
          name="participantCategory"
          value={formData.participantCategory || ''}
          onChange={onChange}
          className={errors.participantCategory ? 'error' : ''}
        >
          <option value="">{t('pages.registrationForm.conferenceOptions.participantCategoryPlaceholder')}</option>
          <option value="academic">{t('pages.registrationForm.conferenceOptions.academic')}</option>
          <option value="student">{t('pages.registrationForm.conferenceOptions.student')}</option>
          <option value="professional">{t('pages.registrationForm.conferenceOptions.professional')}</option>
        </select>
        {errors.participantCategory && <span className="error-message">{errors.participantCategory}</span>}
      </div>

      {/* Location */}
      <div className="form-group">
        <label htmlFor="fromTunisia">{t('pages.registrationForm.conferenceOptions.location')} *</label>
        <select
          id="fromTunisia"
          name="fromTunisia"
          value={formData.fromTunisia === true ? 'true' : formData.fromTunisia === false ? 'false' : ''}
          onChange={(e) => onChange({
            target: {
              name: 'fromTunisia',
              value: e.target.value === 'true'
            }
          })}
          className={errors.fromTunisia ? 'error' : ''}
        >
          <option value="">{t('pages.registrationForm.conferenceOptions.locationPlaceholder')}</option>
          <option value="true">{t('pages.registrationForm.conferenceOptions.fromTunisia')}</option>
          <option value="false">{t('pages.registrationForm.conferenceOptions.fromOtherCountries')}</option>
        </select>
        {errors.fromTunisia && <span className="error-message">{errors.fromTunisia}</span>}
      </div>

      {/* Accommodation */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="withAccommodation"
          name="withAccommodation"
          checked={formData.withAccommodation}
          onChange={onChange}
        />
        <label htmlFor="withAccommodation">
          {t('pages.registrationForm.conferenceOptions.accommodation')}
        </label>
      </div>

      {/* Single Room Option */}
      {formData.withAccommodation && (
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="singleRoom"
            name="singleRoom"
            checked={formData.singleRoom}
            onChange={onChange}
          />
          <label htmlFor="singleRoom">
            {t('pages.registrationForm.conferenceOptions.singleRoom')}
          </label>
        </div>
      )}

      {/* Article Presentation */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="withArticle"
          name="withArticle"
          checked={formData.withArticle}
          onChange={onChange}
        />
        <label htmlFor="withArticle">
          {t('pages.registrationForm.conferenceOptions.withArticle')}
        </label>
      </div>

      {/* Additional Services */}
      {/* Airport Transfer - Only for people from outside Tunisia */}
      {formData.fromTunisia === false && (
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="airportTransfer"
            name="airportTransfer"
            checked={formData.airportTransfer}
            onChange={onChange}
          />
          <label htmlFor="airportTransfer">
            {t('pages.registrationForm.conferenceOptions.airportTransfer')}
          </label>
        </div>
      )}

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="socialEvent"
          name="socialEvent"
          checked={formData.socialEvent}
          onChange={onChange}
        />
        <label htmlFor="socialEvent">
          {t('pages.registrationForm.conferenceOptions.socialEvent')}
        </label>
      </div>

      {/* Accompanying Persons */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="withAccompanying"
          name="withAccompanying"
          checked={formData.withAccompanying}
          onChange={onChange}
        />
        <label htmlFor="withAccompanying">
          {t('pages.registrationForm.conferenceOptions.withAccompanying')}
        </label>
      </div>

      {formData.withAccompanying && (
        <div className="accompanying-persons-section">
          <h4>{t('pages.registrationForm.accompanyingPersons.title')}</h4>
          <div className="pricing-info">
            <p className="info-text">
              <strong>{t('pages.registrationForm.accompanyingPersons.pricingInfo')}</strong>
            </p>
            <ul className="pricing-rules">
              <li>{t('pages.registrationForm.accompanyingPersons.childrenUnder2')}</li>
              <li>{t('pages.registrationForm.accompanyingPersons.childrenUnder12With2Adults')}</li>
              <li>{t('pages.registrationForm.accompanyingPersons.childrenUnder12Separate')}</li>
              <li>{t('pages.registrationForm.accompanyingPersons.adults')}</li>
            </ul>
          </div>
          <div className="add-person-row">
            <input
              type="text"
              value={newAccompanyingPerson.name}
              onChange={(e) => setNewAccompanyingPerson(prev => ({ ...prev, name: e.target.value }))}
              placeholder={t('pages.registrationForm.accompanyingPersons.namePlaceholder')}
              className="add-person-input"
            />
            <input
              type="number"
              value={newAccompanyingPerson.age}
              onChange={(e) => setNewAccompanyingPerson(prev => ({ ...prev, age: e.target.value }))}
              placeholder={t('pages.registrationForm.accompanyingPersons.agePlaceholder')}
              className="add-person-age-input"
              min="0"
              max="120"
            />
            <button
              type="button"
              onClick={addAccompanyingPerson}
              className="add-person-btn"
            >
              <FaPlus /> {t('pages.registrationForm.accompanyingPersons.add')}
            </button>
          </div>

          {formData.accompanyingPersons && formData.accompanyingPersons.length > 0 && (
            <div className="accompanying-persons-list">
              {formData.accompanyingPersons.map((person, index) => (
                <div key={index} className="accompanying-person-item">
                  <span>{person}</span>
                  <button
                    type="button"
                    onClick={() => removeAccompanyingPerson(index)}
                    className="remove-person-btn"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.accompanyingPersons && <span className="error-message">{errors.accompanyingPersons}</span>}
        </div>
      )}

      {/* Fee Calculation Display */}
      {formData.participantCategory && formData.fromTunisia !== undefined && (
        <div className="fee-calculation-section">
          <h4><FaCalculator /> {t('pages.registrationForm.feeCalculation.title')}</h4>
          <div className="fee-breakdown">
            <div className="fee-item">
              <span>{t('pages.registrationForm.feeCalculation.baseRegistrationFee')} ({formData.participantCategory}):</span>
              <span>
                {formData.withAccommodation
                  ? `${formData.fromTunisia
                      ? registrationFees.withAccommodation[formData.participantCategory]?.tunisia
                      : registrationFees.withAccommodation[formData.participantCategory]?.international} ${formData.fromTunisia ? 'TND' : '€'}`
                  : `${registrationFees.withoutAccommodation} TND`}
              </span>
            </div>

            {formData.singleRoom && formData.withAccommodation && (
              <div className="fee-item">
                <span>{t('pages.registrationForm.feeCalculation.singleRoomSupplement')}:</span>
                <span>
                  {(formData.fromTunisia ? registrationFees.additionalFees.singleSupplement.tunisia : registrationFees.additionalFees.singleSupplement.international) * 2} {formData.fromTunisia ? 'TND' : '€'}
                </span>
              </div>
            )}

            {formData.accompanyingPersons && formData.accompanyingPersons.length > 0 && (
              <div className="fee-breakdown-section">
                <div className="fee-item">
                  <span>{t('pages.registrationForm.feeCalculation.accompanyingPersons')}:</span>
                  <span></span>
                </div>
                {formData.accompanyingPersons.map((person, index) => {
                  const age = parseInt(person.match(/\((\d+) years old\)/)?.[1] || '0')
                  const name = person.split(' (')[0]

                  if (age < 2) {
                    return (
                      <div key={index} className="fee-sub-item">
                        <span>• {name} ({age} {t('pages.registrationForm.accompanyingPersons.yearsOld')}):</span>
                        <span>{t('pages.registrationForm.feeCalculation.free')}</span>
                      </div>
                    )
                  }

                  let personFee = registrationFees.additionalFees.adultAccompanying
                  personFee = formData.fromTunisia ? personFee.tunisia : personFee.international
                  let discount = ''

                  if (age < 12) {
                    const adults = formData.accompanyingPersons.filter(p => {
                      const pAge = parseInt(p.match(/\((\d+) years old\)/)?.[1] || '0')
                      return pAge >= 18
                    })

                    if (adults.length >= 2) {
                      personFee *= 0.5
                      discount = ` ${t('pages.registrationForm.feeCalculation.childDiscount50')}`
                    } else {
                      personFee *= 0.7
                      discount = ` ${t('pages.registrationForm.feeCalculation.childDiscount30')}`
                    }
                  }

                  const totalPersonFee = personFee * 2 // 2 nights

                  return (
                    <div key={index} className="fee-sub-item">
                      <span>• {name} ({age} {t('pages.registrationForm.accompanyingPersons.yearsOld')}){discount}:</span>
                      <span>{totalPersonFee.toFixed(2)} {formData.fromTunisia ? 'TND' : '€'}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {formData.airportTransfer && (
              <div className="fee-item">
                <span>{t('pages.registrationForm.feeCalculation.airportTransfer')}:</span>
                <span>50 €</span>
              </div>
            )}

            {formData.socialEvent && (
              <div className="fee-item">
                <span>{t('pages.registrationForm.feeCalculation.socialEvent')}:</span>
                <span>
                  {formData.fromTunisia ? registrationFees.additionalFees.socialEvent.tunisia : registrationFees.additionalFees.socialEvent.international} {formData.fromTunisia ? 'TND' : '€'}
                </span>
              </div>
            )}

            <div className="fee-total">
              <span><strong>{t('pages.registrationForm.feeCalculation.totalAmount')}:</strong></span>
              <span><strong>{formData.calculatedTotal || 0} {formData.currency || 'TND'}</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConferenceOptionsSection
