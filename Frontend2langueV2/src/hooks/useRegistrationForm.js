import { useState } from 'react'

const useRegistrationForm = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    institution: '',
    position: '',
    email: '',
    phone: '',

    // Registration Details
    participantCategory: '',
    fromTunisia: undefined,
    withAccommodation: false,
    singleRoom: false,
    withArticle: false,
    airportTransfer: false,
    socialEvent: false,

    // Accompanying Persons
    withAccompanying: false,
    accompanyingPersons: [],

    // Fee Calculation
    calculatedTotal: 0,
    currency: 'TND',

    // Payment Information
    paymentMethod: '',
    paymentAmount: 0,
    paymentProofPath: null
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required'
    if (!formData.position.trim()) newErrors.position = 'Position is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.participantCategory) newErrors.participantCategory = 'Please select your participant category'
    if (formData.fromTunisia === undefined) newErrors.fromTunisia = 'Please select your location'
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method'
    if (formData.calculatedTotal <= 0) newErrors.calculatedTotal = 'Registration fee calculation error'

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Accompanying persons validation
    if (formData.withAccompanying && formData.accompanyingPersons.length === 0) {
      newErrors.accompanyingPersons = 'Please add at least one accompanying person or uncheck the option'
    }

    // Payment proof validation
    if (formData.paymentMethod && !formData.paymentProofPath) {
      newErrors.paymentProofPath = 'Please upload payment proof'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      institution: '',
      position: '',
      email: '',
      phone: '',
      participantCategory: '',
      fromTunisia: undefined,
      withAccommodation: false,
      singleRoom: false,
      withArticle: false,
      airportTransfer: false,
      socialEvent: false,
      withAccompanying: false,
      accompanyingPersons: [],
      calculatedTotal: 0,
      currency: 'TND',
      paymentMethod: '',
      paymentAmount: 0,
      paymentProofPath: null
    })
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create FormData for multipart/form-data request
      const formDataToSend = new FormData()
      
      // Prepare registration object (excluding the file)
      const registrationData = {
        fullName: formData.fullName,
        institution: formData.institution,
        position: formData.position,
        email: formData.email,
        phone: formData.phone,
        participantCategory: formData.participantCategory,
        fromTunisia: formData.fromTunisia,
        withAccommodation: formData.withAccommodation,
        singleRoom: formData.singleRoom,
        withArticle: formData.withArticle,
        airportTransfer: formData.airportTransfer,
        socialEvent: formData.socialEvent,
        withAccompanying: formData.withAccompanying,
        accompanyingPersons: formData.accompanyingPersons,
        calculatedTotal: formData.calculatedTotal,
        currency: formData.currency,
        paymentMethod: formData.paymentMethod,
        paymentAmount: formData.calculatedTotal // Use calculated total as payment amount
      }
      
      // Add registration data as JSON string
      formDataToSend.append('registration', JSON.stringify(registrationData))
      
      // Add file if exists
      if (formData.paymentProofPath) {
        formDataToSend.append('paymentProof', formData.paymentProofPath)
      }
      
      // Send to backend - FIXED PORT NUMBER
      const response = await fetch('http://localhost:8083/api/registrations', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header, let browser set it for FormData
      })
      
      if (!response.ok) {
        // Get error details from response
        const errorText = await response.text()
        console.error('Server error:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      console.log('Registration successful:', result)
      
      alert('Registration submitted successfully! You will receive a confirmation email shortly.')
      resetForm()
      
    } catch (error) {
      console.error('Registration error:', error)
      
      // More detailed error message
      if (error.message.includes('Failed to fetch')) {
        alert('Unable to connect to the server. Please check if the backend is running on port 8084.')
      } else if (error.message.includes('500')) {
        alert('Server error occurred. Please check the backend logs and try again.')
      } else {
        alert('There was an error submitting your registration. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    validateForm,
    resetForm
  }
}

export default useRegistrationForm