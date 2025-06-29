// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { Shield, Settings, Users, Calendar, Clock } from 'lucide-react';

const Layout = () => {
  const { appData } = useAppData();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
        <Container fluid>
          <Navbar.Brand href="/admin" className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center bg-white rounded-circle me-3"
                 style={{ width: '40px', height: '40px' }}>
              <Shield size={24} className="text-primary" />
            </div>
            <div>
              <div className="fw-bold">{appData.websiteName}</div>
              <small className="text-light opacity-75">Content Management System</small>
            </div>
          </Navbar.Brand>

          <div className="d-none d-md-flex align-items-center text-light">
            <small className="opacity-75">
              <Clock size={16} className="me-1" />
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </small>
          </div>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="admin-header">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="display-5 fw-bold mb-2">Content Management Dashboard</h1>
              <p className="lead mb-0 opacity-90">
                Manage your website content, speakers, schedules, and important dates all in one place
              </p>
            </Col>
            <Col md={4} className="text-end d-none d-md-block">
              <div className="d-flex justify-content-end gap-3">
                <div className="text-center">
                  <Settings size={32} className="mb-2 opacity-75" />
                  <div className="small">Settings</div>
                </div>
                <div className="text-center">
                  <Users size={32} className="mb-2 opacity-75" />
                  <div className="small">Speakers</div>
                </div>
                <div className="text-center">
                  <Calendar size={32} className="mb-2 opacity-75" />
                  <div className="small">Schedule</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="px-4">
        <main className="fade-in">
          <Outlet />
        </main>
      </Container>

      {/* Footer */}
      <footer className="mt-5 py-4 bg-light border-top">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <small className="text-muted">
                © 2025 {appData.siteName}. Built with React & Bootstrap.
              </small>
            </Col>
            <Col md={6} className="text-end">
              <small className="text-muted">
                Last updated: {new Date().toLocaleTimeString()}
              </small>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Layout;