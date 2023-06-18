import { React, useState} from 'react';
import { Form, Button, Alert, Col, Row, InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const [isVisible, setVisible] = useState('password');

  const handlePassword = () => {
    setVisible(!isVisible);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };

    props.login(credentials)
      .then( () => navigate( "/" ) )
      .catch((err) => { 
        setErrorMessage(err.error); setShow(true); 
      });
  };

  return (
    <Row className="vh-100 justify-content-md-center">
    <Col md={4} >
    <h1 className="pb-3">Login</h1>

      <Form  onSubmit={handleSubmit}>
          <Alert
            dismissible
            show={show}
            onClose={() => setShow(false)}
            variant="danger">
            {errorMessage}
          </Alert>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              value={username} placeholder="Example: francesca@test.com"
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
                {isVisible ? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}
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
  return (
    <Button variant="outline-light" onClick={props.logout}>Logout</Button>
  )
}

function LoginButton(props) {
  const navigate = useNavigate();
  return (
    <Button variant="outline-light" onClick={()=> navigate('/login')}>Login</Button>
  )
}

export { LoginForm, LogoutButton, LoginButton };