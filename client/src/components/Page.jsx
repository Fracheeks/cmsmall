import dayjs from 'dayjs';
import { Component } from './Component';
import {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Page = (props) => {
  const [title, setTitle] = useState(props.page ? props.page.title : '');
  const [publicationDate, setPublicationDate] = useState(
    props.page && props.page.publicationDate ? dayjs(props.page.publicationDate).format('YYYY-MM-DD') : ''
  );
  const [components, setComponents] = useState(props.page ? props.page.components : []);
  const [numComps, setNumComps] = useState(props.page ?  props.page.components.length : 0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleBackRoute = () => {
    props.setOpsNavbar(true);
    navigate(nextpage);
  };

  const nextpage = location.state?.nextpage || '/';

  const handleNumComps = (sign) => { 
  switch (sign){
    case '+' : setNumComps(numComps+1);
      break;
    case '-' : setNumComps(numComps-1);
      break;
  }
  }

  const handleComponents = () => {
    const array = [];
    for (let i = 0; i < numComps; i++) {
      array.push(<Component key={i} setComponents={setComponents} pageId={props.page.id} component={components[i]} />);
    }

    return <>{array}</>;
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
console.log(components)
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '2vh' }} >
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" required={true} value={title} onChange={handleTitleChange} />
          </Form.Group>

          <Form.Group className="mb-3"style={{ color: '#1560BD', marginTop: '1vh' }}  >
            <Form.Label>Publication Date</Form.Label >
            <Form.Control type="date" value={publicationDate} onChange={handlePublicationDateChange} />
          </Form.Group>

          <Button className="mx-2" variant="light" type="submit">
            <i className="bi bi-download" style={{ color: '#1560BD' }} />
          </Button>
          &nbsp;
          <Button variant="light" className="mx-2" onClick={() => handleBackRoute()}>
            <i className="bi bi-x-lg" style={{ color: '#1560BD' }} />
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
          <p style={{ color: '#969696', marginTop: '6vh' }}>Publication Date: {publicationDate}</p>
        </div>
        </Col>
    </Row>
    {handleComponents()}
    { numComps>0 && ( <>
    <Button variant="light" className="mx-2" onClick={() => handleNumComps("+")}>
          <i className="bi bi-plus-lg" style={{ color: '#1560BD' }} />
     </Button>
     <Button variant="light" className="mx-2" onClick={() => handleNumComps("-")}>
          <i className="bi bi-dash-lg" style={{ color: '#1560BD' }} />
    </Button>
    </>)}
     </>  
  );
};

export default Page;
