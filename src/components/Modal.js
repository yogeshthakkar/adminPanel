// import external modules
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalComponent = ({
  isOpen,
  toggle,
  title,
  acceptButton,
  acceptText,
  handleAccept,
  rejectButton,
  rejectText,
  children,
  footer,
  bodyClass,
}) => (
  <Modal
    isOpen={isOpen}
    toggle={toggle}
    className="modal-dialog-centered"
    zIndex={1}
  >
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalBody className={bodyClass}>{children}</ModalBody>
    {footer && (
      <ModalFooter>
        {acceptButton && (
          <Button color="primary" onClick={handleAccept}>
            {acceptText}
          </Button>
        )}
        {rejectButton && (
          <Button color="secondary" onClick={toggle}>
            {rejectText}
          </Button>
        )}
      </ModalFooter>
    )}
  </Modal>
);

ModalComponent.defaultProps = {
  isOpen: false,
  toggle: () => {},
  title: 'Modal Title',
  acceptButton: false,
  acceptText: 'Ok',
  handleAccept: () => {},
  rejectButton: false,
  rejectText: 'Cancel',
  footer: true,
  bodyClass: '',
};

export default ModalComponent;
