import dayjs from 'dayjs';
import { Component } from './Component';
import {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Page = (props) => {
  const [title, setTitle] = useState(props.page ? props.page.title : '');
  const [publicationDate, setPublicationDate] = useState(
    props.page && props.page.publicationDate ? dayjs(props.page.publicationDate).format('YYYY-MM-DD') : ''
  );
  const [components, setComponents] = useState(props.page ? props.page.components : []);
  const [numComps, setNumComps] = useState(props.page ?  props.page.components.length : 0);
  const [preview, setPreview] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    console.log(numComps);
  
    const generatePreview = () => {
      const newPreview = [];
      for (let i = 0; i < numComps; i++) {
        newPreview.push(
          <Component
            setComponents={setComponents}
            key={i}
            index={i}
            pageId={props.page.id}
            component={components[i]}
          />
        );
      }
      setPreview(newPreview);
    };
  
    generatePreview();
  }, []);
  

  const handleBackRoute = () => {
    props.setOpsNavbar(true);
    navigate(nextpage);
  };

  const nextpage = location.state?.nextpage || '/';

  const handleNumComps = (sign) => { 

  if(!components[numComps]){
    let newComponent = {
      pageId : props.page.id,
      orderId: 0,
      type: 'Header',
      content : '',
      imageId : null
    };
    setComponents((prev) => [...prev, newComponent])
  }

  setPreview((prev) => [...prev, <Component setComponents={setComponents} key={numComps} index={numComps} pageId={props.page.id} component={components[numComps]} />]);
  switch (sign){
    case '+' : setNumComps(numComps+1);
      break;
    case '-' : setNumComps(numComps-1);
      break;
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setOpsNavbar(true);


    const page = {
      authorId : props.user.id,
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
          &nbsp;
          <Button variant="light" className="mx-2" onClick={() => handleBackRoute()}>
            <i className="bi bi-x-lg" style={{ color: '#1560BD' ,  padding: '30px'}} />
          </Button>
          { !numComps && ( <>
               <Button variant="light" className="mx-2" onClick={() => handleNumComps("+")}>
                 <i className="bi bi-plus-lg" style={{ color: '#1560BD' }} />
              </Button>
               </>)}
        </Form>
      </Col>
      <Col md={6}>
        <div className="preview" >
          <h5 style={{ color: '#5F5F5F', marginTop: '2vh' }}>Preview:</h5>
          <p style={{ color: '#969696', marginTop: '2vh' }}>Title: {title}</p>
          <p style={{ color: '#969696', marginTop: '12vh' }}>Publication Date: {publicationDate}</p>
        </div>
        </Col>
    </Row>
    {preview}
    { numComps>0 && ( <>
    <Button variant="light" className="mx-2" onClick={() => handleNumComps("+")}>
          <i className="bi bi-plus-lg" style={{ color: '#1560BD' , padding: '30px' }} />
     </Button>
     <Button variant="light" className="mx-2" onClick={() => handleNumComps("-")}>
          <i className="bi bi-dash-lg" style={{ color: '#1560BD' ,  padding: '30px'}} />
    </Button>
    </>)}
     </>  
  );
};

export default Page;