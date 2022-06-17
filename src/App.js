import './App.css';
import React, { useState, useEffect  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form } from 'react-bootstrap'
function App() {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [courses, setCourses] = useState([]);
  const [idDelete, setIdDelete] = useState()

  /*==============================================================================================*/
  //                                Métodos de abrir e fechar Modais    
  /*==============================================================================================*/
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  /*==============================================================================================*/
  //                    Método responsavel por fazer somente uma requição da api                  //
  /*==============================================================================================*/
  useEffect(() => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:4000/course", requestOptions)
      .then(response => response.json())
      .then(result => setCourses(result.response))
      .catch(error => console.log('error', error));
  }, []);
  const EditCourse = (e) => {
    
  }
  const DeleteCourse = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const bodyFront = {
      id: idDelete
    }
    console.log(bodyFront)
    let requestOptions = {
      method: 'DELETE',
      body: JSON.stringify(bodyFront),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    };
    
    fetch("http://localhost:4000/course", requestOptions)
    .then(response => console.log(response.json()))
    .then(result => console.log(result))
  }
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
        {
          /*==============================================================================================*/
          //                    FAZENDO UM MAP DO RESULTADO DOS DADOS DA API                              //
          /*==============================================================================================*/
        }
        <tbody>
          {
          courses.map((item) => (
            <tr key={item.ID}>
              <td>{item.ID}</td>
              <td>{item.DESCRICAO}</td>
              <td>{item.CARGA_HORARIA}</td>
              <td><Button variant="primary" onClick={handleShow}>editar</Button>
                <Button variant="danger" onClick={handleShowDelete}>deletar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      {
  /*==============================================================================================*/
  //                    MODAL EDITAR                                                               //
  /*==============================================================================================*/
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={EditCourse}>
            <Form.Group className="mb-3" controlId="formBasicEmail" required>
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="id please" required/>
              <Form.Label>description</Form.Label>
              <Form.Control type="text" placeholder="description here" required/>
              <Form.Label>workload</Form.Label>

              <Form.Control type="text" placeholder="Here workload" required />
            </Form.Group>
            <Button variant="primary" type="submit" >
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
      {
  /*==============================================================================================*/
  //                  MODAL DELETAR                                                                //
  /*==============================================================================================*/
      }
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={DeleteCourse}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID</Form.Label>
              <Form.Control type="number" placeholder="id please" required 
              onChange={(e) => setIdDelete(e.target.value)}/>
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
