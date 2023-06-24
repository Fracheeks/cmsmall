import { React, useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link,useParams , useNavigate} from 'react-router-dom';
import PageForm from './PageForm';
import {LoginForm} from  './Auth';
import {ViewForm} from './ViewForm';
import Page from './Page';

function DefaultLayout(props) {

    return (
      <Row className="vh-100">
        <Col  bg="light" className="below-nav" id="left-sidebar">
          <PageForm pagelist={props.pagelist} isFront={props.isFront} deletePage={props.deletePage} user={props.user} />
        </Col>
      </Row>
    );
  }


  function EditPageLayout(props) {

    const { id } = useParams();
    const [page, setPage] = useState(null);
  
    useEffect(() => {
      props.getPage(id).then((p) => {
        setPage(p);
        props.setOpsNavbar(false)
      });
    }, [id]);

    return (
      <Row className="vh-100">
        <Col  bg="light" className="below-nav" id="left-sidebar">
       {page ?  
        <Page page={page} editPage={props.editPage} user={props.user} setOpsNavbar = {props.setOpsNavbar} />
        : <LoadingLayout /> 
       }
        </Col>
      </Row>
    );
  }

  function AddPageLayout(props) {
  
      useEffect(() => {
        props.setOpsNavbar(false);
      }, []);

    return (
      <Row className="vh-100">
        <Col  bg="light" className="below-nav" id="left-sidebar">
          <Page addPage={props.addPage} user={props.user} setOpsNavbar = {props.setOpsNavbar}/>
        </Col>
      </Row>
    );
  }

  function ViewLayout(props) {

    const { id } = useParams();
    const [page, setPage] = useState(null);
  
    useEffect(() => {
      props.getPage(id).then((p) => {
        setPage(p);
        props.setOpsNavbar(false)
      });
    }, [id]);


    return (
      <Row className="vh-100">
     {page ?  
        <Col  bg="light" className="below-nav" id="left-sidebar">
          <ViewForm  setOpsNavbar = {props.setOpsNavbar}  isFront = {props.isFront} page={page} user={props.user} />
        </Col>
          : <LoadingLayout /> 
     }
      </Row>
    );
  }

function NotFoundLayout() {
  const navigate = useNavigate();

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
        <h1>is loading ...</h1>
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

export {  NotFoundLayout, DefaultLayout, LoadingLayout, LoginLayout , ViewLayout, EditPageLayout, AddPageLayout}; 