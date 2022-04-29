import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';


const auth = getAuth(app);

function App() {

  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userPass, setUserPass] = useState('');
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [validated, setValidated] = useState(false);

  const handleEmailBlur = (event) => {
    setUserEmail(event.target.value);
  }
  const handlePasswordBlur = (event) => {
    setUserPass(event.target.value)
  }
  const handleNameBlur = (event) => {
    setName(event.target.value);
  }
  const handleRegisteredChange = event => {
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(userPass)) {
      setError('Password should contain at least one special character');
      return;
    }
    setValidated(true);
    setError('');
    if (registered) {
      signInWithEmailAndPassword(auth, userEmail, userPass)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('sign in success', user)
          setSuccess('Sign in success');
        })
        .catch((error) => {
          console.error('user fail', error)
          setError(error.message);
        });
    }
    else {
      createUserWithEmailAndPassword(auth, userEmail, userPass)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('user create', user)
          setSuccess('SignUp success');
          setUserName();
          verifyEmail();

        })
        .catch((error) => {
          console.error('user fail', error)
          setError(error.message)
        });
    }

    event.preventDefault();
  }
  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        setSuccess('Reset Email sent!');
      })
      .catch((error) => {
        console.error('user fail', error)
        setError(error.message)
      });
  }
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      setSuccess("Profile updated!");

    }).catch((error) => {
      setError(error.message);
    });
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setSuccess('Email verification sent!');
      });
  }

  return (
    <div className="">
      <div className="registration w-50 mx-auto mt-3">
        <h2 className='text-primary'>Please {registered ? 'Login' : 'Register'}!!</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control required onBlur={handleNameBlur} type="text" placeholder="Enter Your Name" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required onBlur={handlePasswordBlur} type="password" placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
            <Button onClick={handleForgetPassword} variant="link">Forget Password?</Button>
          </Form.Group>

          <p className='text-success'>{success}</p>
          <p className='text-danger'>{error}</p>

          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
