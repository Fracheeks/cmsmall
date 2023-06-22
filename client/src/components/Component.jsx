import dayjs from 'dayjs';
import {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Component = (props) => {
    const [orderId, setOrderId] = useState(props.page ? props.component.orderId : 0 );
    const [type, setType] = useState(props.page ? props.component.type : '');
    const [content, setContent] = useState(props.page ? props.component.content : '');


  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    const component = {
      orderId: orderId,
      type: type.trim(),
      content : content
    };

    if (props.component) {
      props.components = props.components.map(Component => {
        if (Component.id === props.component.id) {
          return component;
        }
    })
      
    } else {
      props.components.add(component);
    }

    navigate('/');
  };

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <>
    <Row>
      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '2vh' }} >
            <Form.Label>Order</Form.Label>
            <Form.Control type="number" required={true} value={orderId} onChange={handleOrderIdChange} />
          </Form.Group>

          <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '1vh' }}>
                    <Form.Label>Type</Form.Label>
                    <Form.Select value={type} onChange={handleTypeChange}>
                             <option value="Header">Header</option>
                             <option value="Paragraph">Paragraph</option>
                             <option value="Image">Image</option>
                     </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3"style={{ color: '#1560BD', marginTop: '1vh' }}  >
            <Form.Label>Content</Form.Label >
            <Form.Control type="text" value={content} onChange={handleContentChange} />
          </Form.Group>
        </Form>
      </Col>
      <Col md={6}>
        <div className="preview" >         
         <p  style={{ color: '#969696', marginTop: '5vh' }}>{content} </p> 
        </div>
        </Col>
    </Row>
     </>  
  );
};

export {Component};
