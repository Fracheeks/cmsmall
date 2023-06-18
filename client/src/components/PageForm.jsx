import { Button,  Table, Container,  Spinner, Alert  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AiOutlineVideoCameraAdd} from "react-icons/ai";


    function MyRow(props) {

        return (
          <tr>
            <td>{props.page.author}</td>
            <td>{props.page.title}</td>
            <td>{props.page.creationDate.format("YYYY-MM-DD")}</td>
            <td>{props.page.publicationDate.format("YYYY-MM-DD")}</td>
            <td>{props.page.status}</td>

            <td>
            <Link to={`/viewPage/${props.page.id}`}>
              <Button variant="light" className='mx-2'  disabled={props.userId} ><i class="bi bi-eye-fill"></i></Button>
            </Link>
            <Link to={`/updatePage/${props.page.id}`}>
              <Button variant="light" className='mx-2'  disabled={props.userId} ><i className='bi bi-pencil-square'></i></Button>
            </Link>
            <Button variant="light"  disabled={props.userId}  onClick={props.deletePage}><i className="bi bi-trash"></i></Button></td>
          </tr>
        );
      }
      

      
      function PageForm(props) {
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
                <th>Status</th>

              </tr>
            </thead>
            <tbody>
              {props.pagelist.map((page) =>
                <MyRow page={page} key={page.id} userId={props.user && props.user.id}/>)
              }
            </tbody>
          </Table>
          <Link to='addPage'>
            <Button variant='light'  disabled={props.user?.id? false : true}><i className="bi bi-file-plus"></i>
              </Button></Link>
          </>
          }
        </Container>
          </div>
          
        );
      }
      
      export default PageForm;
        