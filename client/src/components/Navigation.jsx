import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LogoutButton, LoginButton } from './Auth';
import API from '../API';


const Navigation = (props) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [route, setRoute] = useState('Front-office');  

  const handleSubmit = (e) => {
    e.preventDefault();
    let filteredItems;

    filteredItems = props.pagelist.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    props.setPages(filteredItems)
  };

  const handleRouteChange = () => {
    props.setFront(!props.isFront)}

  useEffect(() => {
    if (searchQuery === '') {
      handleReset();
    }
  }, [searchQuery]);
  
  const navigate = useNavigate();

  useEffect (() => {
    props.isFront? setRoute('Back-Office') : setRoute('Front-Office')
    props.isFront? props.setFilter('published') : props.setFilter('all')
    props.setOpsNavbar(true);
  }, [props.isFront]);

  const handleReset = () => {
    setSearchQuery('');
    API.getPages(props.filter).then((pages) => { props.setPages(pages); });
  };
  

  return (
    <Navbar  style={{ backgroundColor: '#6397D0' }} expand="sm" variant="dark" className="navbar-padding">
        <Navbar.Brand className="mx-5" style={{ fontSize: '30px' }}>
        <i className ="bi bi-journals mx-2"/>CMSmall
        </Navbar.Brand>
    { props.opsNavbar && ( <>
      <Form className="my-2 my-lg-0 mx-auto d-sm-block" action="#" role="search" aria-label="Quick search" onSubmit={handleSubmit}>
      <Form.Control
        className="mr-sm-2"
        type="search"
        placeholder="type a title"
        aria-label="Search query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </Form>
       <Nav className="ml-md-auto">
        {props.user && props.user.name && (
          <Nav.Link onClick = {handleRouteChange}>
            {route}
          </Nav.Link>
        )}
        <Navbar.Text className="mx-2">
          {props.user && props.user.name && `Welcome, ${props.user.name}!`}
          {!props.user && !props.user?.name && `You are not logged in `}
        </Navbar.Text>
        <Form className="mx-2">
          {props.loggedIn ? <LogoutButton logout={props.logout} setFilter={props.setFilter}/> : <LoginButton />}
        </Form>
      </Nav></> )}
    </Navbar>
  );
}

export { Navigation } ;