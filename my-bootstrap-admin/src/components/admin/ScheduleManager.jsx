import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Card, ListGroup, Button, Form, Accordion, Alert, Badge, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { Trash2, Save, PlusCircle, Calendar, Clock, Plus, CalendarDays } from 'lucide-react';

const ScheduleManager = () => {
  const { appData, addSession, deleteSession } = useAppData();
  const [sessions, setSessions] = useState(appData.sessions || []);
  const [newDay, setNewDay] = useState('');
  const [sessionInputs, setSessionInputs] = useState({ date: '', startTime: '', endTime: '', title: '', description: '' });
  const [localError, setLocalError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Confirmation modal state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  useEffect(() => {
    setSessions(appData.sessions);
  }, [appData.sessions]);

  const groupedSessions = sessions.reduce((acc, session) => {
    if (!acc[session.date]) acc[session.date] = [];
    acc[session.date].push(session);
    return acc;
  }, {});

  const handleAddSession = async () => {
    const { date, startTime, endTime, title, description } = sessionInputs;

    if (!date || !startTime || !endTime || !title.trim()) {
      setLocalError('Please fill in date, start time, end time and title');
      return;
    }

    const newSession = {
      date,
      startTime: startTime + ':00',
      endTime: endTime + ':00',
      title: title.trim(),
      description: description.trim(),
    };

    try {
      const createdSession = await addSession(newSession);
      setSessions(prev => [...prev, createdSession]);
      setSessionInputs({ date: '', startTime: '', endTime: '', title: '', description: '' });
      setLocalError('');
    } catch (err) {
      setLocalError('Failed to add session. ' + err.message);
    }
  };

  const confirmDeleteSession = (session) => {
    setSessionToDelete(session);
    setShowConfirmDelete(true);
  };

  const handleDeleteSession = async () => {
    if (!sessionToDelete) return;

    try {
      await deleteSession(sessionToDelete.id);
      setSessions(prev => prev.filter(s => s.id !== sessionToDelete.id));
      setLocalError('');
    } catch (err) {
      setLocalError('Failed to delete session. ' + err.message);
    } finally {
      setShowConfirmDelete(false);
      setSessionToDelete(null);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <CalendarDays size={20} className="me-2" />
            Program Schedule Management
          </div>
          <Badge bg="secondary" className="rounded-pill">
            {Object.keys(groupedSessions).length} day{Object.keys(groupedSessions).length !== 1 ? 's' : ''}
          </Badge>
        </Card.Header>

        <Card.Body>
          {localError && <Alert variant="danger" className="mb-4">{localError}</Alert>}

          <Accordion defaultActiveKey="0" className="mb-4">
            {Object.entries(groupedSessions).map(([day, daySessions], index) => (
              <Accordion.Item eventKey={index.toString()} key={day} className="border rounded-3 mb-3">
                <Accordion.Header>
                  <div className="d-flex align-items-center w-100">
                    <Calendar size={18} className="me-2 text-primary" />
                    <span className="fw-semibold">{day}</span>
                    <Badge bg="primary" className="ms-auto me-3 rounded-pill">
                      {daySessions.length} session{daySessions.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup className="mb-4">
                    {daySessions.map((session) => (
                      <ListGroup.Item key={session.id} className="border-0 bg-light rounded-3 mb-2">
                        <Row className="align-items-center">
                          <Col>
                            <div className="d-flex align-items-center">
                              <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                                <Clock size={16} className="text-primary" />
                              </div>
                              <div>
                                <div className="fw-semibold text-primary">
                                  {session.startTime.slice(0, 5)} - {session.endTime.slice(0, 5)}
                                </div>
                                <div className="text-dark">{session.title}</div>
                                {session.description && <small className="text-muted">{session.description}</small>}
                              </div>
                            </div>
                          </Col>
                          <Col xs="auto">
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => confirmDeleteSession(session)}
                              className="text-danger p-1"
                              title="Delete session"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          <div className="border-top pt-4">
            <h6 className="d-flex align-items-center mb-3">
              <PlusCircle size={16} className="me-2 text-info" />
              Add New Session
            </h6>
            <Row className="g-2">
              <Col md={3}>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  value={sessionInputs.date}
                  onChange={e => setSessionInputs(prev => ({ ...prev, date: e.target.value }))}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="time"
                  placeholder="Start Time"
                  value={sessionInputs.startTime}
                  onChange={e => setSessionInputs(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="time"
                  placeholder="End Time"
                  value={sessionInputs.endTime}
                  onChange={e => setSessionInputs(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  placeholder="Title"
                  value={sessionInputs.title}
                  onChange={e => setSessionInputs(prev => ({ ...prev, title: e.target.value }))}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  placeholder="Description"
                  value={sessionInputs.description}
                  onChange={e => setSessionInputs(prev => ({ ...prev, description: e.target.value }))}
                />
              </Col>
            </Row>
            <Button
              variant="success"
              className="mt-3"
              onClick={handleAddSession}
              disabled={!sessionInputs.date || !sessionInputs.startTime || !sessionInputs.endTime || !sessionInputs.title.trim()}
            >
              <Plus size={16} className="me-2" />
              Add Session
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the session{' '}
          <strong>{sessionToDelete?.title}</strong> scheduled on <strong>{sessionToDelete?.date}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteSession}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScheduleManager;
