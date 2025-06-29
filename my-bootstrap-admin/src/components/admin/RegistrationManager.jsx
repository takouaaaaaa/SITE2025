// src/components/admin/RegistrationManager.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Badge,
  Alert,
  Row,
  Col,
  Spinner,
  InputGroup,
  Pagination
} from 'react-bootstrap';
import {
  Users,
  Edit,
  Trash2,
  Eye,
  Search,
  Download,
  FileText,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

const RegistrationManager = () => {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit'
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch registrations and stats
  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8083/api/admin/registrations');
      if (!response.ok) throw new Error('Failed to fetch registrations');
      const data = await response.json();
      setRegistrations(data);
    } catch (err) {
      setError('Failed to load registrations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/admin/registrations/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchStats();
  }, []);

  // Handle delete registration
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    
    try {
      const response = await fetch(`http://localhost:8083/api/admin/registrations/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete registration');
      
      setRegistrations(registrations.filter(reg => reg.id !== id));
      fetchStats(); // Refresh stats
      setError('');
    } catch (err) {
      setError('Failed to delete registration: ' + err.message);
    }
  };

  // Handle edit registration
  const handleEdit = (registration) => {
    setSelectedRegistration({ ...registration });
    setModalMode('edit');
    setShowModal(true);
  };

  // Handle view registration
  const handleView = (registration) => {
    setSelectedRegistration(registration);
    setModalMode('view');
    setShowModal(true);
  };

  // Handle save registration
  const handleSave = async (formData) => {
    try {
      const url = `http://localhost:8083/api/admin/registrations/${selectedRegistration.id}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to save registration');
      
      await fetchRegistrations();
      await fetchStats();
      setShowModal(false);
      setError('');
    } catch (err) {
      setError('Failed to save registration: ' + err.message);
    }
  };

  // Handle download payment proof
  const handleDownloadPaymentProof = async (id) => {
    try {
      const response = await fetch(`http://localhost:8083/api/admin/registrations/payment-proof/${id}`);
      if (!response.ok) throw new Error('Payment proof not found');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `payment-proof-${id}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download payment proof: ' + err.message);
    }
  };

  // Filter registrations based on search
  const filteredRegistrations = registrations.filter(reg =>
    reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.participantCategory?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

  if (loading) {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading registrations...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">
                <Users size={20} className="me-2 text-primary" />
                Registration Management
              </h5>
            </Col>
            <Col xs="auto">
              <Badge variant="outline-primary">
                {filteredRegistrations.length} registration{filteredRegistrations.length !== 1 ? 's' : ''}
              </Badge>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

          {/* Stats Cards */}
          {Object.keys(stats).length > 0 && (
            <Row className="g-3 mb-4">
              <Col md={3}>
                <Card className="text-center border-primary">
                  <Card.Body>
                    <Users size={24} className="text-primary mb-2" />
                    <h4 className="mb-0">{stats.totalRegistrations || 0}</h4>
                    <small className="text-muted">Total Registrations</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center border-success">
                  <Card.Body>
                    <DollarSign size={24} className="text-success mb-2" />
                    <h4 className="mb-0">{stats.totalRevenue?.toFixed(2) || '0.00'} {stats.currency || 'TND'}</h4>
                    <small className="text-muted">Total Revenue</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center border-info">
                  <Card.Body>
                    <MapPin size={24} className="text-info mb-2" />
                    <h4 className="mb-0">{stats.withAccommodation || 0}</h4>
                    <small className="text-muted">With Accommodation</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center border-warning">
                  <Card.Body>
                    <FileText size={24} className="text-warning mb-2" />
                    <h4 className="mb-0">{stats.withArticle || 0}</h4>
                    <small className="text-muted">With Article</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* Search */}
          <Row className="mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          {/* Registrations Table */}
          <div className="table-responsive">
            <Table hover>
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Institution</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((registration) => (
                  <tr key={registration.id}>
                    <td>
                      <div>
                        <strong>{registration.fullName}</strong>
                        <br />
                        <small className="text-muted">{registration.position}</small>
                      </div>
                    </td>
                    <td>{registration.email}</td>
                    <td>{registration.institution}</td>
                    <td>
                      <Badge bg="info">{registration.participantCategory}</Badge>
                    </td>
                    <td>
                      <Badge bg={registration.fromTunisia ? "success" : "warning"}>
                        {registration.fromTunisia ? "Tunisia" : "International"}
                      </Badge>
                    </td>
                    <td>
                      
                      <strong>{registration.paymentAmount?.toFixed(2) || '0.00'} {registration.currency}</strong>
                      
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleView(registration)}
                          title="View Details"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleEdit(registration)}
                          title="Edit"
                        >
                          <Edit size={14} />
                        </Button>
                        {registration.paymentProofPath && (
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => handleDownloadPaymentProof(registration.id)}
                            title="Download Payment Proof"
                          >
                            <Download size={14} />
                          </Button>
                        )}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(registration.id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {currentItems.length === 0 && (
            <div className="text-center py-4">
              <Users size={48} className="text-muted mb-3" />
              <h6 className="text-muted">No registrations found</h6>
              <p className="text-muted">
                {searchTerm ? 'Try adjusting your search criteria' : 'No registrations have been created yet'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Registration Modal */}
      <RegistrationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        mode={modalMode}
        registration={selectedRegistration}
        onSave={handleSave}
      />
    </>
  );
};

// Registration Modal Component
const RegistrationModal = ({ show, onHide, mode, registration, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    institution: '',
    position: '',
    email: '',
    phone: '',
    participantCategory: '',
    fromTunisia: false,
    withAccommodation: false,
    singleRoom: false,
    withArticle: false,
    airportTransfer: false,
    socialEvent: false,
    withAccompanying: false,
    accompanyingPersons: [],
    currency: 'TND',
    paymentMethod: '',
    paymentAmount: 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (registration) {
      setFormData({
        fullName: registration.fullName || '',
        institution: registration.institution || '',
        position: registration.position || '',
        email: registration.email || '',
        phone: registration.phone || '',
        participantCategory: registration.participantCategory || '',
        fromTunisia: registration.fromTunisia || false,
        withAccommodation: registration.withAccommodation || false,
        singleRoom: registration.singleRoom || false,
        withArticle: registration.withArticle || false,
        airportTransfer: registration.airportTransfer || false,
        socialEvent: registration.socialEvent || false,
        withAccompanying: registration.withAccompanying || false,
        accompanyingPersons: registration.accompanyingPersons || [],
        currency: registration.currency || 'TND',
        paymentMethod: registration.paymentMethod || '',
        paymentAmount: registration.paymentAmount || 0
      });
    }
  }, [registration]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'view' ? 'View Registration' : 'Edit Registration'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Institution *</Form.Label>
                <Form.Control
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                  isInvalid={!!errors.institution}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.institution}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Participant Category</Form.Label>
                <Form.Select
                  name="participantCategory"
                  value={formData.participantCategory}
                  onChange={handleChange}
                  disabled={isReadOnly}
                >
                  <option value="">Select Category</option>
                  <option value="Academic">Academic</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Payment Amount</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="paymentAmount"
                  value={formData.paymentAmount}
                  onChange={handleChange}
                  readOnly={isReadOnly}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Currency</Form.Label>
                <Form.Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  disabled={isReadOnly}
                >
                  <option value="TND">TND</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Check
                type="checkbox"
                name="fromTunisia"
                label="From Tunisia"
                checked={formData.fromTunisia}
                onChange={handleChange}
                disabled={isReadOnly}
              />
            </Col>
            <Col md={4}>
              <Form.Check
                type="checkbox"
                name="withAccommodation"
                label="With Accommodation"
                checked={formData.withAccommodation}
                onChange={handleChange}
                disabled={isReadOnly}
              />
            </Col>
            <Col md={4}>
              <Form.Check
                type="checkbox"
                name="withArticle"
                label="With Article"
                checked={formData.withArticle}
                onChange={handleChange}
                disabled={isReadOnly}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {mode === 'view' ? 'Close' : 'Cancel'}
        </Button>
        {!isReadOnly && (
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RegistrationManager;