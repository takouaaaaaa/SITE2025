import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Card, ListGroup, Button, Form, Alert, Badge, Row, Col } from 'react-bootstrap';
import { Trash2, UserPlus, Users, User, Mic, Plus } from 'lucide-react';
import NotificationModal from '../common/NotificationModal';

const SpeakerManager = () => {
  const { appData, addSpeaker, deleteSpeaker } = useAppData();
  const [speakers, setSpeakers] = useState(appData.speakers);
  const [newSpeaker, setNewSpeaker] = useState({ name: '', title: '', expertise: '' });
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [speakerToDelete, setSpeakerToDelete] = useState(null);

  useEffect(() => {
    setSpeakers(appData.speakers);
  }, [appData.speakers]);

  const handleAdd = async () => {
    if (!newSpeaker.name.trim() || !newSpeaker.title.trim()) {
      setError('Name and title are required fields');
      return;
    }

    if (speakers.some(s => s.name.toLowerCase() === newSpeaker.name.trim().toLowerCase())) {
      setError('A speaker with this name already exists');
      return;
    }

    try {
      const speakerToAdd = {
        name: newSpeaker.name.trim(),
        title: newSpeaker.title.trim(),
        expertise: newSpeaker.expertise.trim()
      };

      const createdSpeaker = await addSpeaker(speakerToAdd);
      setSpeakers(prev => [...prev, createdSpeaker]);
      setNewSpeaker({ name: '', title: '', expertise: '' });
      setError('');
    } catch (error) {
      setError('Failed to add speaker. Try again.');
    }
  };

  const handleRemove = (speaker) => {
    setSpeakerToDelete(speaker);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!speakerToDelete) return;

    try {
      await deleteSpeaker(speakerToDelete.id);
      setSpeakers(prev => prev.filter(s => s.id !== speakerToDelete.id));
      setError('');
    } catch {
      setError('Failed to delete speaker. Try again.');
    } finally {
      setShowDeleteModal(false);
      setSpeakerToDelete(null);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-sm h-100">
      <Card.Header className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Users size={20} className="me-2" />
          Speaker Management
        </div>
        <Badge bg="primary" className="rounded-pill">
          {speakers.length} speakers
        </Badge>
      </Card.Header>

      <Card.Body>
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        <div className="mb-4">
          {speakers.length > 0 ? (
            <ListGroup className="list-group-flush">
              {speakers.map((s) => (
                <ListGroup.Item key={s.id} className="px-0 border-start-0 border-end-0">
                  <Row className="align-items-center">
                    <Col>
                      <div className="d-flex align-items-start">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <User size={20} className="text-primary" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1 fw-semibold">{s.name}</h6>
                          <div className="d-flex align-items-center text-muted small mb-1">
                            <User size={14} className="me-1" />
                            {s.title}
                          </div>
                          {s.expertise && (
                            <div className="d-flex align-items-center text-primary small">
                              <Mic size={14} className="me-1" />
                              {s.expertise}
                            </div>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col xs="auto">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleRemove(s)}
                        className="text-danger p-1"
                        title="Delete speaker"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="text-center py-4 text-muted">
              <Users size={48} className="mb-3 opacity-50" />
              <p className="mb-0">No speakers added yet</p>
              <small>Add your first speaker below</small>
            </div>
          )}
        </div>

        <div className="border-top pt-4">
          <h6 className="d-flex align-items-center mb-3">
            <Plus size={16} className="me-2 text-success" />
            Add New Speaker
          </h6>

          <Row className="g-2">
            <Col md={6}>
              <Form.Control
                placeholder="Full Name *"
                value={newSpeaker.name}
                onChange={e => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
                className="mb-2"
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Title/Position *"
                value={newSpeaker.title}
                onChange={e => setNewSpeaker({ ...newSpeaker, title: e.target.value })}
                className="mb-2"
              />
            </Col>
            <Col md={12}>
              <Form.Control
                placeholder="Expertise / Topic"
                value={newSpeaker.expertise}
                onChange={e => setNewSpeaker({ ...newSpeaker, expertise: e.target.value })}
                className="mb-2"
              />
            </Col>
          </Row>

          <Button
            variant="success"
            className="w-100 mt-2"
            onClick={handleAdd}
            disabled={!newSpeaker.name.trim() || !newSpeaker.title.trim()}
          >
            <UserPlus size={18} className="me-2" />
            Add Speaker
          </Button>
        </div>
      </Card.Body>
      </Card>

      <NotificationModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setSpeakerToDelete(null);
        }}
        title="Confirm Delete"
        message={`Are you sure you want to delete the speaker "${speakerToDelete?.name}"? This action cannot be undone.`}
        type="warning"
        onConfirm={confirmDelete}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </>
  );
};

export default SpeakerManager;
