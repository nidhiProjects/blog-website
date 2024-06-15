import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteBlogModal=({modal,onHide,onSubmit})=> {
  
    return (
      <>
  
        <Modal show={modal} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are You Sure You Want To Delete</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default DeleteBlogModal;