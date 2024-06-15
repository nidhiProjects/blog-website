import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Form } from "react-bootstrap";
import { storage } from "../firebase/config";
import { toast } from "react-toastify";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { createBlog } from "../service/firebase";


const AddBlogModal = ({ modal, onHide, onSubmit }) => {
  const initialFormData = {
    title: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreate = async () => {
    let imageUrl = "";
    if (imageUpload === null) {
      return toast.warning("Image is mandatory");
    } else {
      setLoading(true)
      const storageRef = ref(storage,`blog/${imageUpload.name}`);
      const image = await uploadBytes(storageRef, imageUpload);
      imageUrl = await getDownloadURL(image.ref);
    }

    const data = {
      id:uuidv4(),
      title: formData.title,
      description: formData.description,
      image: imageUrl,
    };
    try {
      setLoading(true);
      await createBlog(data);
      toast.success("blog added succefully");
      onHide();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal show={modal?.show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Blog</Modal.Title>
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
        <Button disabled={loading} variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button disabled={loading} variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBlogModal;
