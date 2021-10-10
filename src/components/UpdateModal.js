import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

class UpdatetModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Fruit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.updateFruit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fruit Name</Form.Label>
              <Form.Control type="text" placeholder="Write Name" name="fruitName" defaultValue={this.props.fruitName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" name="fruitPrice" defaultValue={this.props.fruitPrice} />
            </Form.Group>

             <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="text" placeholder="Enter image url" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UpdatetModal;