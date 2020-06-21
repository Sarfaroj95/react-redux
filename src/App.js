import React, { useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, addUser, removeUser } from './actions'

import { Container, Row, Col, InputGroup, FormControl, Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

function App() {
  const count = useSelector(state => state.counterReducer);
  const users = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const userRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(userRef.current.value))
    userRef.current.value = ""
  }


  return (
    <div className="App">
      <div className="bg-dark">
        <h2 className="text-center text-white p-3">React Redux</h2>
      </div>
      <Container>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div>
              <h2 className="text-center">Users</h2>
              <div className="pt-3">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex justify-content-between ">
                    <InputGroup >
                      <FormControl className="noRound" type="text" placeholder="Username" ref={userRef} />
                    </InputGroup>
                    {/* <input type="text" placeholder="Username" ref={userRef} /> */}
                    <Button className="noRound" variant="success" type="submit">Submit</Button>
                  </div>
                </form>
              </div>
              <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Delete</th>

                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>

                      <td >{index + 1}</td>
                      <td> {user.name}</td>
                      <td><Button className="noRound" variant="danger" size="sm"
                        onClick={() => dispatch(removeUser(index))}
                      >Delete</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* <ul>
                {users.map((user, index) => (
                  <li key={index}>{index + 1} {user.name} <button onClick={() => dispatch(removeUser(index))}>&times;</button></li>
                ))}
              </ul> */}
            </div>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <div>
              <h2 className="text-center">Counter</h2>
              <div className="d-flex justify-content-between pt-3">
                <Button className="noRound" variant="success" onClick={() => dispatch(increment())}>Increment +</Button>
                <h3> {count} </h3>
                <Button className="noRound" variant="info" onClick={() => dispatch(decrement())}>Decrement -</Button>
                <br />
                <Button className="noRound" variant="danger" onClick={() => dispatch(reset())}>Reset</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>



    </div>
  );
}

export default App;
