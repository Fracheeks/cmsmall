import { React, useContext, useState, useEffect } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import PageForm from './PageForm';
import { LoginForm } from './Auth';

function DefaultLayout(props) {
    
    return (
      <Row className="vh-100">
        <Col  bg="light" className="below-nav" id="left-sidebar">
          <PageForm pagelist={props.pagelist}  deletePage={props.deletePage} user={props.user} />
        </Col>
        <Col md={8} xl={9} className="below-nav">
          <Outlet/>
        </Col>
      </Row>
    );
  }

function NotFoundLayout() {
    return(
        <>
          <h2>This is not the route you are looking for!</h2>
          <Link to="/">
          <Button variant="outline" onClick={()=> navigate('/')}>Go Home!</Button>
          </Link>
        </>
    );
  }


function LoadingLayout(props) {
  return (
    <Row className="vh-100">
      <Col md={4} bg="light" className="below-nav" id="left-sidebar">
      </Col>
      <Col md={8} className="below-nav">
        <h1>CMSmall is loading ...</h1>
      </Col>
    </Row>
  )
}

function LoginLayout(props) {
  return (
    <Row className="vh-100">
      <Col md={12} className="below-nav">
        <LoginForm login={props.login} />
      </Col>
    </Row>
  );
}

export {  NotFoundLayout, DefaultLayout, LoadingLayout, LoginLayout }; 