import dayjs from 'dayjs';
import {useState, useEffect} from 'react';
import {Form,  Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';

const Component = (props) => {

    const [orderId, setOrderId] = useState(props.component ? props.component.orderId : props.index+1 );
    const [type, setType] = useState(props.component ? props.component.type : 'Header');
    const [content, setContent] = useState(props.component ? props.component.content : '');
    const [imageId, setImageId] = useState(props.component && props.component.imageId ? props.component.imageId : null);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState({id : 0});

    useEffect(() => {
      setOrderId(props.component ? props.component.orderId : props.index+1);
      setType(props.component ? props.component.type : 'Header');
      setContent(props.component ? props.component.content : '')
      setImageId(props.component && props.component.imageId ? props.component.imageId : null);

    }, [props.preview])



    useEffect(() => {
    API.getImages().then( (images) => {
          
         setImages(images);
         imageId == null ? setSelectedImage(images[0]) : setSelectedImage(images[imageId-1]);
    })}, []);

    const handleImageChange = (event) => {
        setSelectedImage(images.find((image) => image.id == event.target.value));
        setImageId(event.target.value)
      };
      

      useEffect(() => {
        const component = {
          orderId: orderId,
          type: type.trim(),
          content: content,
          imageId: imageId,
        };
            
        props.setComponents((Components) =>
          Components.map((Component, index) => {
            if (index === props.index) {
              return { ...Component, ...component };
            }
            return Component;
          }).sort((a, b) => a.orderId - b.orderId)
        );


        props.setIsModified((isModified) => !isModified);


      }, [orderId, content, type, imageId]);
      
const deleteComponent = () => {
        props.setComponents((Components) =>
          Components.filter((_, index) => index !== props.index)
        );
        props.setNumComps((num)=>num-1)
        props.setIsModified((isModified) => !isModified);
    }
      

    const handleOrderIdChange = (sign) => {

      let value = orderId
      switch (sign) {
        case '+' : value++ ; break ;
        case '-' : value-- ; break ;}

      props.setComponents((Components) =>
        Components.map((Component) => {
          if (Component.orderId == value) {
            console.log(Component)
            return { ...Component, orderId: props.component.orderId };
          }
          return Component;
        })
    );
    setOrderId(value)
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
        <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '1vh', padding: '30px' }}>
                <Form.Label>Order</Form.Label>
                        <div className="d-flex">
                               <Button variant="light" onClick={() => handleOrderIdChange('-')} disabled={orderId <= 1}>
                                        <i className="bi bi-caret-up-fill" />
                               </Button>
                           <Button variant="light" onClick={() => handleOrderIdChange('+')} disabled={orderId >= props.max}>
                               <i className="bi bi-caret-down-fill" />
                           </Button> </div>
                </Form.Group>
          <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '1vh', padding: '30px' }}>
                    <Form.Label>Type</Form.Label>
                    <Form.Select value={type} onChange={handleTypeChange}>
                             <option value="Header">Header</option>
                             <option value="Paragraph">Paragraph</option>
                             <option value="Image">Image</option>
                     </Form.Select>
          </Form.Group>
          { type === 'Image' && selectedImage?  <>
          <Form.Group className="mb-3" style={{ color: '#1560BD', marginTop: '1vh', padding: '30px' }}>
                    <Form.Label>Please select an image:</Form.Label>
                    <Form.Select value={selectedImage.id} onChange={handleImageChange}>
                        {images.map((image) => (
                                 <option key={image.id} value={image.id}>
                              {image.name}
                         </option>
                         ))}
                    </Form.Select>

          </Form.Group>
          </>
         :
          <Form.Group className="mb-3"style={{ color: '#1560BD', marginTop: '1vh',  padding: '30px' }}  >
            <Form.Label>Content</Form.Label >
            <Form.Control type="text" value={content} onChange={handleContentChange} />
          </Form.Group>
}
        </Form>
      </Col>
      <Col md={6}>
        { type === 'Image'  && selectedImage?  <>
        <img src={"/src/components/" + selectedImage.url} alt="Component Image" style={{ marginTop: '7vh', width: '300px', height: '200px', objectFit: 'contain' }} /></> 
        :
         <><div className="preview" >         
            <p  style={{ color: '#969696', marginTop: '7vh' }}>{content} </p> 
         </div> </> }

        </Col>
        <Button variant="light" className="mx-2" onClick={() => deleteComponent()}>
                 <i className="bi bi-trash" style={{ color: '#1560BD', padding: '30px' }} />
        </Button>
    </Row>
     </>  
  );
};

export {Component};