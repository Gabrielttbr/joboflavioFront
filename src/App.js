import './App.css';
import React, { useState, useEffect  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form } from 'react-bootstrap'
function App() {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState([]);
  const [description, setDescription] = useState();
  const [workload, setWorloand] = useState();
  const [idEdit, setIdEdit] = useState();


  let processDelete = null
  /*==============================================================================================*/
  //                                Métodos de abrir e fechar Modais    
  /*==============================================================================================*/
  const handleClose = () => setShow(false);
  const handleShow = (edit) => {
    setIdEdit(edit)
    setShow(true);

  }
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
  /*==============================================================================================*/
  //                      Método respónsavel por deletar course 
  /*==============================================================================================*/
  
  
  const DeleteCourse =  (e) => {
    
    e.preventDefault();
    e.stopPropagation();
    console.log(processDelete)
    const bodyFront = {
      id: processDelete
    }
    let requestOptions = {
      method: 'DELETE',
      body: JSON.stringify(bodyFront),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    };
    
    fetch("http://localhost:4000/course", requestOptions)
    .then(response => alert('Couse delete com sucess',  window.location.reload()))
    
  }
  const EditCourse = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(idEdit)
    const bodyFront = {
      id: idEdit,
      descricao: description,
      carga_horaria: workload


    }
    console.log(bodyFront)
    let requestOptions = {
      method: 'PATCH',
      body: JSON.stringify(bodyFront),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    };
    fetch("http://localhost:4000/course", requestOptions)
    .then(response => alert('Update to sucess', window.location.reload()))
    
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
              <td><Button variant="primary" onClick={async () => {
                  const idEdit = item.ID;
                  return handleShow(idEdit)
              }}>editar</Button>
                  <Button variant="danger"
                   onClick={(e)=> {
                      processDelete = item.ID
                      return DeleteCourse(e)
                  
                  }}>deletar</Button></td>
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
          <Modal.Title>{idEdit}  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={EditCourse}>
            <Form.Group className="mb-3" controlId="formBasicEmail" required>
              <Form.Label>description</Form.Label>
              <Form.Control type="text" placeholder="description here" required onChange={(e) => { setDescription(e.target.value)}}/>
              <Form.Label>workload</Form.Label>

              <Form.Control type="number" placeholder="Here workload" required  onChange={(e) => { setWorloand(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
     
        </Modal.Footer>
      </Modal>
      


    </main>



  );
}


export default App;
