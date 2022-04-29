import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';


const auth = getAuth(app);

function App() {

  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');

  const handleEmailBlur = (event) => {
    setUserEmail(event.target.value);
  }
  const handlePasswordBlur = (event) => {
    setUserPass(event.target.value)
  }

  const handleFormSubmit = (event) => {
    createUserWithEmailAndPassword(auth, userEmail, userPass)
      .then((user) => {
        console.log('user create', user)
      })
      .catch((error) => {
        console.log('user fail', error)
      });
    event.preventDefault();
  }
  return (
    <div className="">
      <div className="registration w-50 mx-auto mt-3">
        <h2 className='text-primary'>Please Register!!</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
