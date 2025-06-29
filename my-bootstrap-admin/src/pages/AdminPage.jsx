// src/pages/AdminPage.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Settings, Users, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import GeneralSettings from '../components/admin/GeneralSettings';
import SpeakerManager from '../components/admin/SpeakerManager';
import ScheduleManager from '../components/admin/ScheduleManager';
import { useAppData } from '../context/AppDataContext';

const AdminPage = () => {
  const { appData } = useAppData();

  // Calculate some stats
  const speakerCount = appData.speakers?.length || 0;
  const scheduleCount = appData.sessions?.length || 0;

  const StatCard = ({ icon: Icon, title, value, color, description }) => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="text-center">
        <div className={`d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-${color} bg-opacity-10`}
             style={{ width: '60px', height: '60px' }}>
          <Icon size={28} className={`text-${color}`} />
        </div>
        <h3 className="fw-bold mb-1">{value}</h3>
        <h6 className="text-muted mb-2">{title}</h6>
        <small className="text-secondary">{description}</small>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="py-4">
      {/* Quick Stats */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <StatCard
            icon={Settings}
            title="Registration"
            value={appData.registrationOpenDate && appData.registrationCloseDate ? "Active" : "Setup"}
            color="primary"
            description="Registration period"
          />
        </Col>
        <Col md={4}>
          <StatCard
            icon={Users}
            title="Speakers"
            value={speakerCount}
            color="success"
            description="Total speakers added"
          />
        </Col>
        <Col md={4}>
          <StatCard
            icon={Calendar}
            title="Schedule Items"
            value={scheduleCount}
            color="info"
            description="Sessions scheduled"
          />
        </Col>
      </Row>

      {/* Management Sections */}
      <Row className="g-4">
        {/* General Settings - Full Width */}
        <Col lg={12}>
          <div className="slide-in">
            <GeneralSettings />
          </div>
        </Col>

        {/* Speaker Management */}
        <Col lg={12}>
          <div className="slide-in" style={{ animationDelay: '0.1s' }}>
            <SpeakerManager />
          </div>
        </Col>

        {/* Schedule Management - Full Width */}
        <Col lg={12}>
          <div className="slide-in" style={{ animationDelay: '0.2s' }}>
            <ScheduleManager />
          </div>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mt-5">
        <Col lg={12}>
          <Card className="border-0 shadow-sm bg-light">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="mb-2">
                    <BarChart3 size={20} className="me-2 text-primary" />
                    Quick Actions
                  </h5>
                  <p className="text-muted mb-0">
                    All your content is automatically saved to browser storage.
                    Use the management panels above to update your site content.
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <div className="d-flex align-items-center justify-content-end text-success">
                    <TrendingUp size={20} className="me-2" />
                    <span className="fw-semibold">All systems operational</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;