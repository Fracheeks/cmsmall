import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LogoutButton, LoginButton } from './Auth';
import API from '../API';


const Navigation = (props) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [route, setRoute] = useState('Front-office');  
  const [AppName, setAppName] = useState('')
  const [editMode, setEditMode] = useState(false)


  useEffect(() =>
     {API.getAppName().then((res) => 
        setAppName(res.name))
        .catch((error) => 
           props.handleError(error));}, [] )


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
    API.getPages(props.filter).then((pages) => 
    { props.setPages(pages); })
    .catch((error) => props.handleError(error));

    ;
  };

  const handleSubmitName = (event) => {

    event.preventDefault();

    {API.setAppName(AppName).then((res) => 
       setEditMode(false)
       )
       .catch((error) => 
          props.handleError(error));}
  }
  

  return (
    <Navbar  style={{ backgroundColor: '#6397D0' }} expand="sm" variant="dark" className="navbar-padding">
        <Navbar.Brand className="mx-5 d-inline-flex align-items-center" style={{ fontSize: '30px' }}>
        <i className ="bi bi-journals mx-2"/>

        {props.user?.role === 'Admin' && editMode ? (
                 <Form onSubmit={handleSubmitName}>
                     <Form.Group controlId="appNameInputGroup" className="position-relative">
                 <Form.Control type="text" required value={AppName} onChange={(event) => setAppName(event.target.value)} />
                   <Button variant="light" className="position-absolute top-0 end-0 mt-1 me-1 btn-sm" onClick={() => setEditMode(false)}>
                         <i className="bi bi-x" />
                   </Button>
                </Form.Group>
                </Form>
                  ) : (
                   <>{AppName}</>
            )}
        {props.user?.role == 'Admin' && !editMode &&
            <Button variant="light" style={{ border:'none', backgroundColor: '#6397D0', color: '#FFFFFF' }} onClick={()=>setEditMode(true)} >
                  <i className="bi bi-pencil"/>
             </Button>
        }

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
        {props.user && props.user?.name && (
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