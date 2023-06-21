import React from 'react';
import { Link,} from 'react-router-dom';
import {Button } from 'react-bootstrap';

function ViewForm(props) {

  if (!props.page) {
    return <div>Pagina non trovata</div>;
  }

  if (props.user.id !== props.page.authorId) {
    return( <div>
      <h2 style={{ textAlign: 'center'}}>User not authorized</h2>
         <Link to={props.isFront ? '/' : '/back-office'}>
         <Button variant="light" className='mx-2'>
        <i className="bi bi-backspace-fill"></i>
       </Button></Link>
       </div>
    );
  }

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to bottom, #2F2F2F, #FFFFFF)',
  };

  return (
    <div>
      <header style={{ ...gradientStyle, padding: '120px', marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center' , color: '#FFFFFF' }}>{props.page.title}</h1>
        <p style={{ textAlign: 'left' , color: '#FFFFFF'  }}>
          <strong>Created by:</strong> {props.page.author}
          <br />
          <strong>Creation Date:</strong> {props.page.creationDate}
          <br />
          <strong>Publication Date:</strong> {props.page.publicationDate}
        </p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '60%' }}>
          {props.page.components.map((component, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              {component.type === 'Header' && <h3>{component.content}</h3>}
              {component.type === 'Paragraph' && <p>{component.content}</p>}
              {component.type === 'Image' && <img src="/src/components/images/ironman.jpg" alt="Component Image" />}
            </div>
          ))}
        </div>
      </div>
      <Link to={props.isFront ? '/' : '/back-office'}>
           <Button variant="light" className='mx-2'>
      <i className="bi bi-backspace-fill"></i>
            </Button>
      </Link>

    </div>
  );
}

export { ViewForm };
