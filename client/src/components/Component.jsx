import dayjs from 'dayjs';
import {useState, useEffect} from 'react';
import {Form,  Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';

const Component = (props) => {
    const navigate = useNavigate();

    const [orderId, setOrderId] = useState(props.component ? props.component.orderId : 0 );
    const [type, setType] = useState(props.component ? props.component.type : 'Header');
    const [content, setContent] = useState(props.component ? props.component.content : '');
    const [imageId, setImageId] = useState(props.component ? props.component.imageId : null );
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState();


    useEffect(() => {
    API.getImages().then( (images) => {
         setImages(images);
         setSelectedImage(images[0])
    })}, []);

    const handleImageChange = (event) => {
        setSelectedImage(images.find((image) => image.name === String(event.target.value)));
        setImageId(selectedImage.id)
      };
      

  useEffect ( () => {

    let component = {
      pageId : props.pageId,
      orderId: orderId,
      type: type.trim(),
      content : content,
      imageId : imageId
    };

    if (props.component) {
        props.setComponents((prevComponents) =>
          prevComponents.map((Component) => {
            if (Component.id === props.component.id) {
                component.id = props.component.id;
                return component;
            }
            return Component;
          })
        );
      } else {
        props.setComponents((prevComponents) => [...prevComponents, component]);
      }

  }, [orderId, content, type, imageId]);

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
        <Form >
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
          { type === 'Image' ?  <>
          <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '1vh' }}>
                    <Form.Label>Please select an image:</Form.Label>
                    <Form.Select value={selectedImage?.name} onChange={handleImageChange}>
                        {images.map((image) => (
                                 <option key={image.id} value={image.name}>
                              {image.name}
                         </option>
                         ))}
                    </Form.Select>

          </Form.Group>
          </>
         :

          <Form.Group className="mb-3"style={{ color: '#1560BD', marginTop: '1vh' }}  >
            <Form.Label>Content</Form.Label >
            <Form.Control type="text" value={content} onChange={handleContentChange} />
          </Form.Group>
}
        </Form>
      </Col>
      <Col md={6}>
        { type === 'Image'  && selectedImage?  <>
        <img src={"/src/components/" + selectedImage.url} alt="Component Image" style={{ marginTop: '5vh', width: '300px', height: '200px', objectFit: 'contain' }} /></> 
        :
         <><div className="preview" >         
            <p  style={{ color: '#969696', marginTop: '5vh' }}>{content} </p> 
         </div> </> }

        </Col>
    </Row>
     </>  
  );
};

export {Component};
