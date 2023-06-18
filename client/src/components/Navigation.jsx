import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LogoutButton, LoginButton } from './Auth';

const Navigation = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [isFront, setFront] = useState(true);
  const navigate = useNavigate();

  const handleRouteChange = () => {
    setFront(!isFront);
    isFront ? navigate('/') : navigate('/back-office');
  };

  return (
    <Navbar bg="dark" expand="sm" variant="dark" className="navbar-padding">
        <Navbar.Brand className="mx-5">
        <i className="bi bi-file-earmark mx-2"/>CMSmall
        </Navbar.Brand>
      <Form className="my-2 my-lg-0 mx-auto d-sm-block" action="#" role="search" aria-label="Quick search" onSubmit={handleSubmit}>
        <Form.Control className="mr-sm-2" type="search" placeholder="Search" aria-label="Search query" />
      </Form> 
       <Nav className="ml-md-auto">
        {props.user && props.user.name && (
          <Nav.Link onClick={handleRouteChange}>
            {isFront ? 'Back-Office' : 'Front-Office'}
          </Nav.Link>
        )}
        <Navbar.Text className="mx-2">
          {props.user && props.user.name && `Welcome, ${props.user.name}!`}
          {!props.user && !props.user?.name && `You are not logged in `}
        </Navbar.Text>
        <Form className="mx-2">
          {props.loggedIn ? <LogoutButton logout={props.logout} /> : <LoginButton />}
        </Form>
      </Nav>
    </Navbar>
  );
}

export { Navigation } ;