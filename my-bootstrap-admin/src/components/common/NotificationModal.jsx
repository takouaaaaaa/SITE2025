import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

const NotificationModal = ({ 
  show, 
  onHide, 
  title, 
  message, 
  type = 'info', // 'success', 'warning', 'error', 'info'
  onConfirm = null, // If provided, shows confirm/cancel buttons
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} className="text-success" />;
      case 'warning':
        return <AlertTriangle size={24} className="text-warning" />;
      case 'error':
        return <XCircle size={24} className="text-danger" />;
      default:
        return <Info size={24} className="text-info" />;
    }
  };

  const getHeaderClass = () => {
    switch (type) {
      case 'success':
        return 'border-success';
      case 'warning':
        return 'border-warning';
      case 'error':
        return 'border-danger';
      default:
        return 'border-info';
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={`border-bottom-0 ${getHeaderClass()}`}>
        <Modal.Title className="d-flex align-items-center">
          {getIcon()}
          <span className="ms-2">{title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-4">
        <p className="mb-0">{message}</p>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        {onConfirm ? (
          <>
            <Button variant="secondary" onClick={onHide}>
              {cancelText}
            </Button>
            <Button variant={confirmVariant} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={onHide}>
            OK
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
