import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Card, ListGroup, Button, Form, Col, Row, Alert, Badge } from 'react-bootstrap';
import { Trash2, CalendarPlus, Save, Calendar, Clock, Plus } from 'lucide-react';

const DatesManager = () => {
  const { appData, updateData } = useAppData();
  const [dates, setDates] = useState(appData.dates || []);
  const [newDate, setNewDate] = useState({ date: '', event: '', description: '' });
  const [error, setError] = useState('');

  // Synchronize with context data
  useEffect(() => {
    setDates(appData.dates || []);
  }, [appData.dates]);

  const handleAdd = () => {
    // Validation
    if (!newDate.date.trim() || !newDate.event.trim()) {
      setError('Date and event are required fields');
      return;
    }

    // Check for duplicate events
    if (dates.some(d => d.event.toLowerCase() === newDate.event.trim().toLowerCase())) {
      setError('An event with this name already exists');
      return;
    }

    // Better ID generation
    const allIds = dates.map(d => d.id);
    const newId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;

    const dateToAdd = {
      id: newId,
      date: newDate.date.trim(),
      event: newDate.event.trim(),
      description: newDate.description.trim(),
      
    };

    setDates([...dates, dateToAdd]);
    setNewDate({ date: '', event: '', description: '' });
    setError('');
  };

  const handleRemove = (id) => {
    setDates(dates.filter(d => d.id !== id));
  };

  const handleSave = async () => {
    try {
      await updateData('dates', dates);
      alert('Dates saved successfully!');
    } catch (error) {
      alert('Error saving dates. Please try again.');
    }
  };


  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Calendar size={20} className="me-2" />
          Event Dates
        </div>
        <Badge bg="info" className="rounded-pill">
          {dates.length} dates
        </Badge>
      </Card.Header>

      <Card.Body>
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        {/* Dates List */}
        <div className="mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {dates.length > 0 ? (
            <ListGroup className="list-group-flush">
              {dates.map((d) => {
                return (
                  <ListGroup.Item key={d.id} className="px-0 border-start-0 border-end-0">
                    <Row className="align-items-center">
                      <Col>
                        <div className="d-flex align-items-start">
                          <div className={` bg-opacity-10 rounded-circle p-2 me-3`}>
                            
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-1">
                              <h6 className="mb-0 fw-semibold me-2">{d.event}</h6>
                            
                            </div>
                            <div className="text-muted small mb-1">
                              <Clock size={14} className="me-1" />
                              {d.date}
                            </div>
                            {d.description && (
                              <div className="text-secondary small">
                                {d.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleRemove(d.id)}
                          className="text-danger p-1"
                          title="Delete date"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <div className="text-center py-4 text-muted">
              <Calendar size={48} className="mb-3 opacity-50" />
              <p className="mb-0">No dates added yet</p>
              <small>Add your first date below</small>
            </div>
          )}
        </div>

        {/* Add New Date Form */}
        <div className="border-top pt-4">
          <h6 className="d-flex align-items-center mb-3">
            <Plus size={16} className="me-2 text-success" />
            Add New Date
          </h6>

          <Row className="g-2 mb-2">
            <Col md={6}>
              <Form.Control
                placeholder="Date (e.g., July 30th, 2025) *"
                value={newDate.date}
                onChange={e => setNewDate({...newDate, date: e.target.value})}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Event Name *"
                value={newDate.event}
                onChange={e => setNewDate({...newDate, event: e.target.value})}
              />
            </Col>
          </Row>

          <Form.Control
            placeholder="Description (optional)"
            value={newDate.description}
            onChange={e => setNewDate({...newDate, description: e.target.value})}
            className="mb-2"
          />


          <Button
            variant="success"
            className="w-100"
            onClick={handleAdd}
            disabled={!newDate.date.trim() || !newDate.event.trim()}
          >
            <CalendarPlus size={18} className="me-2" />
            Add Date
          </Button>
        </div>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-between align-items-center">
        <small className="text-muted">
          {dates.length} date{dates.length !== 1 ? 's' : ''} configured
        </small>
        <Button variant="primary" onClick={handleSave} className="px-4">
          <Save size={16} className="me-2"/>
          Save Changes
        </Button>
      </Card.Footer>
    </Card>
  );
};
export default DatesManager;