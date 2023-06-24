import {React, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button } from 'react-bootstrap';

function ViewForm(props) {

  const navigate = useNavigate();

  const handleBackRoute = () => {
    
    props.setOpsNavbar(true);
    navigate('/');
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#2F2F2F'	;

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  if (!props.page) {
    return <div>Pagina non trovata</div>;
  }

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to bottom, #6397D0, #2F2F2F	)',
  };

  return (
    <div>
      <header style={{ ...gradientStyle, padding: '120px', marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center' , color: '#FFFFFF' }}>{props.page.title}</h1>
        <p style={{ textAlign: 'left' , color: '#FFFFFF'  }}>
          <strong>Created by:</strong> {props.page.author}
          <br />
          <strong>Creation Date:</strong> {props.page.creationDate}
           {props.page.publicationDate && ( <><br /> <strong>Publication Date:</strong> {props.page.publicationDate} </>)}
        </p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', color : "#FFFFFF"}}>
        <div style={{ width: '60%' }}>
          {props.page.components.map((component, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              {component.type === 'Header' && <h3>{component.content}</h3>}
              {component.type === 'Paragraph' && <p>{component.content}</p>}
              {component.type === 'Image' && ( <div>
             <img src={"/src/components/" + component.url} alt="Component Image" style={{ width: '300px', height: '200px', objectFit: 'contain' }} />
             <p style={{ color: 'gray' }}>{"["+component.description+"]"}</p></div>)}
            </div>
          ))}
        </div>
      </div>
           <Button variant="light" className='mx-2' onClick = {() => handleBackRoute()}>
      <i className="bi bi-backspace-fill"></i>
            </Button>
    </div>
  );
}

export { ViewForm };

