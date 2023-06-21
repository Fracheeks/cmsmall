import { Button,  Table, Container,  Alert  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

    function MyRow(props) {
        return (
          <tr>
            <td>{props.page.author}</td>
            <td>{props.page.title}</td>
            <td>{props.page.creationDate}</td>
            <td>{props.page.publicationDate}</td>
            <td style={{ color: '#8F8F8F' }}>{props.page.status}</td>

            <td>
            
            {!props.isFront && ( <>
             <Link to={`/viewPage/${props.page.id}`}><Button variant="light" className='mx-2'>
                 <i className="bi bi-eye-fill"></i> </Button></Link>
            { props.user.id === props.page.authorId && ( <>
             <Link to={`/updatePage/${props.page.id}`}><Button variant="light" className='mx-2'>
                 <i className='bi bi-pencil-square'></i> </Button> </Link>
             <Button variant="light" onClick={() =>props.deletePage(props.page.id)}>
              <i className="bi bi-trash"></i></Button></>)}</>)}

            </td>
          </tr>
        );
      }
      

      
      function PageForm(props) {

        if (props.pagelist.length == 0) {
          return( <div>
            <h2 style={{ textAlign: 'center', color : '#600000', margin: '10vh'}}>there're no elements</h2>
             </div>
          );
        }

        return (
          <div>
             <Container fluid>
          {props.errorMsg? <Alert variant='danger' dismissible className='my-2' onClose={props.resetErrorMsg}>
            {props.errorMsg}</Alert> : null}
          {props.initialLoading ? <Loading /> : 
          <>          
          <Table>
            <thead>
              <tr>
                {/*<th>Id</th>*/}
                <th>Author</th>
                <th>Title</th>
                <th>Creation Date</th>
                <th>Publication Date</th>
                <th></th>

              </tr>
            </thead>
            <tbody>
              {props.pagelist.map((page) =>
                <MyRow page={page} key={page.id} user={props.user} isFront={props.isFront} deletePage={props.deletePage}/>)
              }
            </tbody>
          </Table>
          
          {!props.isFront && (<Link to='addPage'> <Button variant='light'>
             <i className="bi bi-file-plus"></i>
              </Button> </Link>)}
          </>
          }
        </Container>
          </div>
          
        );
      }
      
      export default PageForm;
        