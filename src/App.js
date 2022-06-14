import './App.css';
import React, { useState, useEffect  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form } from 'react-bootstrap'
function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  useEffect(() => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:4000/course", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }, []);
  return (
    <main>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>description</th>
            <th>workload</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td><Button variant="primary" onClick={handleShow}>editar</Button>
              <Button variant="danger" onClick={handleShowDelete}>deletar</Button></td>
          </tr>
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
              <Form.Label>description</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
              <Form.Label>workload</Form.Label>

              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>
            <Button variant="primary" type="submit">
              DELETAR
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </main>



  );
}


export default App;
