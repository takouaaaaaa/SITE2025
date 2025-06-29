// src/services/api.js
const BASE_URL = 'http://localhost:8083';

class ApiService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle empty responses (like DELETE operations)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Site Configuration Methods
  async getSiteConfig() {
    return this.request('/api/config');
  }

  async updateSiteConfig(config, logoFile) {
    const formData = new FormData();
    formData.append('config', JSON.stringify(config));
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    return this.request('/api/config', {
      method: 'PUT',
      body: formData,
      headers: {},
    });
  }

  // Speaker Methods
  async getAllSpeakers() {
    return this.request('/api/speakers/getAll');
  }

  async createSpeaker(speaker) {
    return this.request('/api/speakers/create', {
      method: 'POST',
      body: JSON.stringify(speaker),
    });
  }

  async updateSpeaker(id, speaker) {
    return this.request(`/api/speakers/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(speaker),
    });
  }

  async deleteSpeaker(id) {
    return this.request(`/api/speakers/delete/${id}`, {
      method: 'DELETE',
    });
  }

  // Program Session Methods
  async getAllSessions() {
    return this.request('/api/sessions/getAll');
  }

  async createSession(session) {
    return this.request('/api/sessions/create', {
      method: 'POST',
      body: JSON.stringify(session),
    });
  }

  async updateSession(id, session) {
    return this.request(`/api/sessions/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(session),
    });
  }

  async deleteSession(id) {
    return this.request(`/api/sessions/delete/${id}`, {
      method: 'DELETE',
    });
  }

  // Registration Methods
  async getAllRegistrations() {
    return this.request('/api/registrations');
  }

  async getRegistrationById(id) {
    return this.request(`/api/registrations/${id}`);
  }

  async createRegistration(registration, paymentProofFile) {
    const formData = new FormData();
    formData.append('registration', JSON.stringify(registration));
    if (paymentProofFile) {
      formData.append('paymentProof', paymentProofFile);
    }

    return this.request('/api/registrations', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async updateRegistration(id, registration) {
    return this.request(`/api/registrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(registration),
    });
  }

  async deleteRegistration(id) {
    return this.request(`/api/registrations/${id}`, {
      method: 'DELETE',
    });
  }

  // File Upload
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }
}

// Named instance for proper export
const apiInstance = new ApiService();
export default apiInstance;
