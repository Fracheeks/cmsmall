import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyCard(props) {
  return (
    <Col md={4} className="my-3">
      <Card style={{ backgroundColor: '#D9E9FF' }}>
        <Card.Body>
          <Card.Title>{props.page.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.page.author}</Card.Subtitle>
          <Card.Text>
            <strong style={{ color: '#1560BD' }}>Creation Date:</strong> {props.page.creationDate}<br />
            <strong style={{ color: '#1560BD' }}>Publication Date:</strong> {props.page.publicationDate}<br />
            <strong></strong> <span style={{ color: '#969696' }}>{props.page.status}</span>
          </Card.Text>

          <Link to={`/viewPage/${props.page.id}`} className="mx-2">
            <Button variant="light" style={{ backgroundColor: '#D9E9FF', color: '#1560BD' }}><i className="bi bi-eye-fill"></i></Button>
          </Link>
          {!props.isFront && props.user?.id === props.page.authorId && (
            <>
              <Link to={`/updatePage/${props.page.id}`} className="mx-2">
                <Button variant="light" style={{ backgroundColor: '#D9E9FF', color: '#1560BD' }}><i className="bi bi-pencil-square"></i></Button>
              </Link>
              <Button variant="light" style={{ backgroundColor: '#D9E9FF', color: '#1560BD' }} onClick={() => props.deletePage(props.page.id)}>
                <i className="bi bi-trash"></i>
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

function PageForm(props) {
  if (props.pagelist.length === 0) {
    return (
      <div>
        <h2 style={{ textAlign: 'center', color: '#ABCDEF', margin: '10vh' }}>There are no elements</h2>
      </div>
    );
  }

  // Suddivide le cards in gruppi di tre per riga
  const cardsPerRow = 3;
  const rows = Math.ceil(props.pagelist.length / cardsPerRow);

  return (
    <div>
      <Container fluid>
        {props.errorMsg ? (
          <Alert variant="danger" dismissible className="my-2" onClose={props.resetErrorMsg}>
            {props.errorMsg}
          </Alert>
        ) : null}
        {props.initialLoading ? (
          <Loading />
        ) : (
          <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <Row key={rowIndex}>
                {props.pagelist.slice(rowIndex * cardsPerRow, (rowIndex + 1) * cardsPerRow).map((page) => (
                  <MyCard
                    key={page.id}
                    page={page}
                    user={props.user}
                    isFront={props.isFront}
                    deletePage={props.deletePage}
                  />
                ))}
              </Row>
            ))}
            {!props.isFront && (
              <Link to="addPage">
                <Button variant="light" style={{ backgroundColor: '#FFFFFF', color: '#1560BD' }}>
                  <i className="bi bi-file-plus"></i>
                </Button>
              </Link>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default PageForm;
