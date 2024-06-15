import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateBlogModal = ({ modal, onHide, onSubmit }) => {
  const initialFormData = {
    title: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [imageUpload, setImageUpload] = useState(null);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreate=()=>{
    console.log(formData,imageUpload);
  }
  console.log(modal.data)
  return (
    <Modal show={modal?.show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter Blog Title"
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              placeholder="Choose image"
              accept="image/png,image/jpeg"
              type="file"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              placeholder="Enter Blog description"
              as="textarea"
              value={formData?.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBlogModal;
