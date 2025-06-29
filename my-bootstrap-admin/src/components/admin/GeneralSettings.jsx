import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import {
  Card, Form, Button, Image, Spinner, Alert, Row, Col
} from 'react-bootstrap';
import {
  Save, Settings, Globe, Calendar, Image as ImageIcon,
  Upload, Info, Shield, AlertTriangle
} from 'lucide-react';
import NotificationModal from '../common/NotificationModal';

const GeneralSettings = () => {
  const { appData, updateSiteConfig, loadSiteConfig } = useAppData();

  const [websiteName, setWebsiteName] = useState('');
  const [registrationOpenDate, setRegistrationOpenDate] = useState('');
  const [registrationCloseDate, setRegistrationCloseDate] = useState('');
  const [logoPreview, setLogoPreview] = useState('/logo512.png'); // Default fallback
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [configExists, setConfigExists] = useState(false);
  
  const BASE_URL = 'http://localhost:8083';

  useEffect(() => {
    setIsLoading(true);
    
    // Check if we have appData and if config exists
    if (appData) {
      if (appData.config && appData.config !== null) {
        // Configuration exists, populate fields
        setConfigExists(true);
        setWebsiteName(appData.config.websiteName || '');
        setRegistrationOpenDate(appData.config.registrationOpenDate || '');
        setRegistrationCloseDate(appData.config.registrationCloseDate || '');

        // Handle logo path
        if (appData.config.logoPath && appData.config.logoPath.trim() !== '') {
          const normalizedPath = appData.config.logoPath.replace(/\\/g, '/');
          const fullUrl = `${BASE_URL}/${normalizedPath}`;
          setLogoPreview(fullUrl);
        } else {
          setLogoPreview('/logo512.png');
        }
      } else {
        // No configuration exists, set defaults
        setConfigExists(false);
        setWebsiteName('My Conference Site');
        setRegistrationOpenDate('');
        setRegistrationCloseDate('');
        setLogoPreview('/logo512.png');
      }
    } else {
      // No appData yet, set defaults
      setConfigExists(false);
      setWebsiteName('');
      setRegistrationOpenDate('');
      setRegistrationCloseDate('');
      setLogoPreview('/logo512.png');
    }
    
    setIsLoading(false);
  }, [appData]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size must be less than 5MB');
      return;
    }

    setSelectedLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setError('');
  };

  const validateDates = () => {
    if (registrationOpenDate && registrationCloseDate) {
      const openDate = new Date(registrationOpenDate);
      const closeDate = new Date(registrationCloseDate);
      
      if (closeDate <= openDate) {
        setError('Registration close date must be after the open date');
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!websiteName.trim()) {
      setError('Site name is required');
      return;
    }

    if (!validateDates()) {
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const configData = {
        websiteName: websiteName.trim(),
        registrationOpenDate: registrationOpenDate.trim() || null,
        registrationCloseDate: registrationCloseDate.trim() || null,
      };

      await updateSiteConfig(configData, selectedLogoFile);
      await loadSiteConfig();
      
      setConfigExists(true);
      setSelectedLogoFile(null); // Clear selected file after successful save
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle image load error
  const handleImageError = (e) => {
    console.warn('Logo image failed to load, using fallback');
    e.target.src = '/logo512.png';
  };

  // Show loading state
  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading configuration...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Settings size={20} className="me-2" />
            Site & Registration Configuration
          </div>
          {!configExists && (
            <small className="badge bg-warning text-dark">
              <AlertTriangle size={12} className="me-1" />
              First Time Setup
            </small>
          )}
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
          
          {!configExists && (
            <Alert variant="info" className="mb-4">
              <Info size={16} className="me-2" />
              <strong>Welcome!</strong> It looks like this is your first time setting up the site configuration. 
              Please fill in the details below and click "Save Settings" to get started.
            </Alert>
          )}

          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <Globe size={16} className="me-2 text-primary" />
                    Site Name *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    placeholder="Enter your site name"
                    required
                    className="form-control-lg"
                  />
                  <Form.Text className="text-muted">
                    This will appear in the navigation and page titles
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <Calendar size={16} className="me-2 text-success" />
                    Registration Start Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={registrationOpenDate}
                    onChange={(e) => setRegistrationOpenDate(e.target.value)}
                    className="form-control-lg"
                  />
                  <Form.Text className="text-muted">
                    When registration opens (optional)
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <Calendar size={16} className="me-2 text-danger" />
                    Registration End Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={registrationCloseDate}
                    onChange={(e) => setRegistrationCloseDate(e.target.value)}
                    className="form-control-lg"
                    min={registrationOpenDate || undefined}
                  />
                  <Form.Text className="text-muted">
                    When registration closes (optional)
                  </Form.Text>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <div className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <Info size={16} className="me-2 text-info" />
                    Registration Status
                  </Form.Label>
                  <div className="p-3 bg-light rounded">
                    {registrationOpenDate && registrationCloseDate ? (
                      <div>
                        {(() => {
                          const now = new Date();
                          const openDate = new Date(registrationOpenDate);
                          const closeDate = new Date(registrationCloseDate);
                          
                          if (now < openDate) {
                            return <span className="badge bg-secondary">Not Started</span>;
                          } else if (now >= openDate && now <= closeDate) {
                            return <span className="badge bg-success">Open</span>;
                          } else {
                            return <span className="badge bg-danger">Closed</span>;
                          }
                        })()}
                      </div>
                    ) : (
                      <span className="text-muted small">Set dates to see status</span>
                    )}
                  </div>
                </div>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="d-flex align-items-center">
                <ImageIcon size={16} className="me-2 text-primary" />
                Site Logo
              </Form.Label>
              <div className="p-4 border border-2 border-dashed rounded-3 bg-light">
                <Row className="align-items-center">
                  <Col md={3} className="text-center">
                    <div className="position-relative d-inline-block">
                      <Image
                        src={logoPreview}
                        roundedCircle
                        width="80"
                        height="80"
                        className="border border-3 border-white shadow-sm"
                        onError={handleImageError}
                        alt="Site logo preview"
                      />
                      <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1">
                        <Upload size={12} className="text-white" />
                      </div>
                    </div>
                    {selectedLogoFile && (
                      <div className="mt-2">
                        <small className="text-success">
                          New logo selected
                        </small>
                      </div>
                    )}
                  </Col>
                  <Col md={9}>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="mb-2"
                    />
                    <div className="d-flex align-items-center text-muted small">
                      <Info size={14} className="me-2" />
                      Upload an image file (max 5MB). Supported: JPG, PNG, GIF, SVG
                    </div>
                  </Col>
                </Row>
              </div>
            </Form.Group>
          </Form>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <Shield size={14} className="me-1" />
            {configExists ? 'Changes are saved to the backend' : 'Initial configuration will be created'}
          </small>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving}
            className="px-4"
            size="lg"
          >
            {isSaving ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                {configExists ? 'Saving...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save size={18} className="me-2" />
                {configExists ? 'Save Settings' : 'Create Configuration'}
              </>
            )}
          </Button>
        </Card.Footer>
      </Card>

      <NotificationModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title={configExists ? "Settings Saved" : "Configuration Created"}
        message={configExists 
          ? "Your site settings have been saved successfully!" 
          : "Your site configuration has been created successfully!"
        }
        type="success"
      />
    </>
  );
};

export default GeneralSettings;