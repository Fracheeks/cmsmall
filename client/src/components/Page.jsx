import dayjs from 'dayjs';
import { Component } from './Component';
import {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../API';

const Page = (props) => {
  const [authorId, setAuthorId] = useState(props.user?.id);
  const [title, setTitle] = useState(props.page ? props.page.title : '');
  const [publicationDate, setPublicationDate] = useState(
    props.page && props.page.publicationDate ? dayjs(props.page.publicationDate).format('YYYY-MM-DD') : ''
  );
  const [components, setComponents] = useState(props.page ? props.page.components : []);
  const [numComps, setNumComps] = useState(props.page ?  props.page.components.length : 0);
  const [preview, setPreview] = useState([]);
  const [isModified, setIsModified] = useState(false);
  
  const navigate = useNavigate();


  useEffect(() => {
  //visualizza componenti già presenti nella pagina
    const generatePreview = () => { 


      const newPreview = components.map((component, index) => (
        <Component
          setIsModified={setIsModified}
          setNumComps={setNumComps}
          max={components.length}
          setComponents={setComponents}
          preview={preview}
          key={index}
          index={index}
          component={component}
        />
      ));
      setPreview(newPreview);
    };

    generatePreview();
  }, [isModified]);
  

  const handleBackRoute = () => {
    props.setOpsNavbar(true);
    navigate('/');
  };

  const handleNumComps = () => { 

  if(!components[numComps]){
    let newComponent = {
      orderId: numComps+1,
      type: 'Header',
      content : '',
      imageId : null
    };
    setComponents((prev) => [...prev, newComponent])
  }
  
   setNumComps(numComps+1);
   setIsModified((isModified) => !isModified);

  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setOpsNavbar(true);


    const page = {
      authorId : authorId,
      title: title.trim(),
      publicationDate: publicationDate,
      components : components
    };

    if (props.page) {
      page.id = props.page.id;
      props.editPage(page);
    } else {
      props.addPage(page);
    }

    navigate('/');
  };

  const handleAuthorChange = (event) => {
    API.setAuthor(props.page.id, event.target.value).then((authorId)=>
     setAuthorId(authorId) )
    .catch(err => props.handleError(err))
  };


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePublicationDateChange = (event) => {
    setPublicationDate(event.target.value);
  };

  return (
    <>
    <Row>
      <Col md={6}>
        <Form onSubmit={handleSubmit}  >
          { props.user?.role == 'Admin' && (<>
            <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '1vh', padding: '30px' }} >
            <Form.Label>Author</Form.Label>
            <Form.Select value={authorId} onChange={handleAuthorChange}>
                        {props.authors.map((author) => (
                                 <option key={author.id} value={author.id}>
                              {author.name}
                         </option>))}
             </Form.Select></Form.Group>
          </>)}
          <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '1vh', padding: '30px' }} >
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" required={true} value={title} onChange={handleTitleChange} />
          </Form.Group>

          <Form.Group className="mb-3"style={{ color: '#1560BD', marginTop: '1vh', padding: '30px' }}  >
            <Form.Label>Publication Date</Form.Label >
            <Form.Control type="date" value={publicationDate} onChange={handlePublicationDateChange} />
          </Form.Group>

          <Button className="mx-2" variant="light" type="submit">
            <i className="bi bi-download" style={{ color: '#1560BD' ,  padding: '30px'}} />
          </Button>
          <Button variant="light" className="mx-2" onClick={() => handleNumComps("+")}>
                 <i className="bi bi-plus-lg" style={{ color: '#1560BD', padding: '30px' }} />
          </Button>
        </Form>
      </Col>
      <Col md={6}>
        <div className="preview" >
          <h5 style={{ color: '#5F5F5F', marginTop: '2vh' }}>Preview:</h5>
          {props.user?.role == 'Admin' ? (
            <><p style={{ color: '#969696', marginTop: '2vh' }}>
            The actual owner is: {props.authors.find((author) => author.id==authorId).name}</p>
          <p style={{ color: '#969696', marginTop: '12vh' }}>Title: {title}</p>
          <p style={{ color: '#969696', marginTop: '12vh' }}>Publication Date: {publicationDate}</p></>)
           :
           (<><p style={{ color: '#969696', marginTop: '2vh' }}>Title: {title}</p>
           <p style={{ color: '#969696', marginTop: '12vh' }}>Publication Date: {publicationDate}</p></>)}
        </div>
        </Col>
    </Row>
     {preview}
    <Button variant="light" className="mr-auto mx-2" onClick={() => handleBackRoute()}>
            <i className="bi bi-backspace-fill" style={{ color: '#1560BD' ,  padding: '30px'}} />
    </Button>
     </>  
  );
};

export default Page;
