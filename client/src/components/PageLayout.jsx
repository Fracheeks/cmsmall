import { React, useState, useEffect } from 'react';
import { Row, Col, Button, Spinner} from 'react-bootstrap';
import { Link,useParams , useNavigate} from 'react-router-dom';
import PageForm from './PageForm.jsx';
import {LoginForm} from  './Auth.jsx';
import {ViewForm} from './ViewForm.jsx';
import Page from './Page.jsx';
import API from '../API.jsx';

function DefaultLayout(props) {

    return (
      <Row className="vh-100">
        <Col  bg="light" className="below-nav" id="left-sidebar">
          <PageForm  setErrorMsg={props.setErrorMsg} errorMsg={props.errorMsg} loading={props.loading} pagelist={props.pagelist} isFront={props.isFront} deletePage={props.deletePage} user={props.user} />
        </Col>
      </Row>
    );
  }


  function EditPageLayout(props) {

    const { id } = useParams();
    const [page, setPage] = useState(null);
    const [authors, setAuthors] = useState([]);


    useEffect(() => {
      props.getPage(id).then((p) => {
        setPage(p);
        props.setOpsNavbar(false)
      });

      API.getUsers().then((users) => {
        setAuthors(users.map((user) => ({ id : user.id, name : user.name})))})
        .catch((err)=>props.handleError(err))

    }, [id]);




    return (
      <Row className="vh-100">
        <Col  bg="light" className="below-nav" id="left-sidebar">
       {page ?  
        <Page page={page} handleError={props.handleError} authors={authors} editPage={props.editPage} user={props.user} setOpsNavbar = {props.setOpsNavbar} />
        : <LoadingLayout /> 
       }
        </Col>
      </Row>
    );
  }

  function AddPageLayout(props) {

    const [authors, setAuthors] = useState([]);
  
      useEffect(() => {
        props.setOpsNavbar(false);


      API.getUsers().then((users) => {
        setAuthors(users.map((user) => ({ id : user.id, name : user.name})))})
        .catch((err)=>props.handleError(err))

      }, [props.pages]);

    return (
      <Row className="vh-100">
        <Col  bg="light" className="below-nav" id="left-sidebar">
          <Page handleError={props.handleError} authors={authors} addPage={props.addPage} user={props.user} setOpsNavbar = {props.setOpsNavbar}/>
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner style={{ color: '#1560BD', padding: '20px' }}
         className='m-2' animation="border" role="status" /></div> )}

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