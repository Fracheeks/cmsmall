import { React, useState} from 'react';
import { Form, Button, Alert, Col, Row, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API.jsx';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const [isVisible, setVisible] = useState('password');

  const handlePassword = () => {
    setVisible(!isVisible);
  }

  const doLogIn = (credentials) => {
    API.logIn(credentials)
      .then( user => {
        setErrorMessage('');
        props.loginSuccessful(user);
      })
      .catch(err => {
        setErrorMessage('Wrong username or password');
      })
  }
  
  const handleSubmit = (event) => {
      event.preventDefault();
      setErrorMessage('');
      const credentials = { username, password };

      // SOME VALIDATION, ADD MORE if needed (e.g., check if it is an email if an email is required, etc.)
      let valid = true;
      if(username === '' || password === '')
          valid = false;
      
      if(valid)
      {
        doLogIn(credentials);
      } else {
        setErrorMessage('Error(s) in the form, please fix it/them.')
      }
  };

  return (
    <Row className="vh-100 justify-content-md-center">
    <Col md={4} >
    <h2 className="pb-3" style={{ textAlign: 'center', color: '#1560BD', marginTop: '5vh'  }} >Login</h2>

      <Form  onSubmit={handleSubmit}>
      {errorMessage ? <Alert variant='light' dismissible onClick={() => setErrorMessage('')}
      style={{margin: '1vh', backgroundColor: '#CD5C5C', color : '#FFFFFF' }}>
            <span className="error-icon" role="img" aria-label="Error">⚠️</span>
            <span className="error-message">{errorMessage}</span>
      </Alert> : ''}

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={username} placeholder="Enter the email"
              onChange={(ev) => setUsername(ev.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
            <Form.Control
              type={isVisible ? 'text' : 'password'}
              value={password} placeholder="Enter the password."
              onChange={(ev) => setPassword(ev.target.value)}
              required={true} minLength={3}
            />
              <Button
                variant="outlined"
                onClick={handlePassword}
              >
                {isVisible ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
              </Button>
              </InputGroup>
          </Form.Group>
          <Button variant="outlined" className="mt-3" type="submit">Login</Button>
          <Button variant="outlined" className="mt-3" type="submit" onClick = {() => navigate('/')}>Cancel</Button>
      </Form>
      </Col>
      </Row>

  )
};

function LogoutButton(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.logout();
    props.setFilter('published')
    navigate('/');
  }
  return (
    <Button variant="outline-light" onClick={()=>handleLogout()}>Logout</Button>
  )
}

function LoginButton(props) {
  const navigate = useNavigate();
  return (
    <Button variant="outline-light" onClick={()=> navigate('/login')}>Login</Button>
  )
}

export { LoginForm, LogoutButton, LoginButton };