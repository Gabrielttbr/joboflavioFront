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
  const handleShow = () => setShow(true);

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
    e.preventDefault();
    e.stopPropagation();
    const bodyFront = {
      id: processDelete

    }
    console.log(bodyFront)
    let requestOptions = {
      method: 'DELETE',
      body: JSON.stringify(bodyFront),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    };
    
  }
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
                  <Button variant="danger"
                   onClick={(e)=> {
                      processDelete = item.ID
                       console.log('Onclick delete antes ' + processDelete)
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
          <Modal.Title>editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={EditCourse}>
            <Form.Group className="mb-3" controlId="formBasicEmail" required>
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="id please" required onChange={(e) => { setIdEdit(e.target.value)}}/>
              <Form.Label>description</Form.Label>
              <Form.Control type="text" placeholder="description here" required onChange={(e) => { setDescription(e.target.value)}}/>
              <Form.Label>workload</Form.Label>

              <Form.Control type="text" placeholder="Here workload" required  onChange={(e) => { setWorloand(e.target.value)}}/>
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
      


    </main>



  );
}


export default App;
