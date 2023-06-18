import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { React, useState, useEffect, useContext } from 'react';
import { Container, Toast } from 'react-bootstrap/'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { NotFoundLayout, LoginLayout, LoadingLayout, DefaultLayout } from './components/PageLayout';

import API from './API';

const filters = {
  all : 'all',
  draft :  'draft', 
  publish : 'published',
  scheduled : 'scheduled',
  };


function App() {
  

  const [pages, setPages] = useState([]);

  const [dirty, setDirty] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  const [filter, setFilter] = useState(filters.all);

  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg);
  }

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const user = await API.getUserInfo();
        setUser(user);
        setLoggedIn(true);
        setLoading(false);
      } catch (err) {
        handleErrors(err);
        setUser(null);
        setLoggedIn(false); setLoading(false);
      }
    };
    init();
  }, []);  

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setUser(user);
      setLoggedIn(true);
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    setDirty(true);
  }, [filter])

  useEffect(() => {

    if (dirty) {
      API.getPages(filters.all)
        .then(pages => {

          setPages(pages);
          setDirty(false);
        })
        .catch(e => { 
          handleErrors(e); setDirty(false); 
        } ); 
    }
  }, [filter]);

  const deletePage = (pageId) => {
    API.deletePage(pageId)
      .then(() => { setDirty(true); })
      .catch(e => handleErrors(e)); 
  }

  const updatePage = (page) => {
    API.updateFilm(page)
      .then(() => { setDirty(true); })
      .catch(e => handleErrors(e)); 
  }

  return (
    <BrowserRouter>
        <Container fluid className="App">
          <Navigation logout={handleLogout} user={user} loggedIn={loggedIn} />
          <Routes>
          <Route path="/" element={
            loading ? <LoadingLayout /> : <DefaultLayout  user={user} pagelist={pages} deletePage={deletePage}  filters={filters} />
            } />
          <Route path="/login" element={!loggedIn ? <LoginLayout login={handleLogin} /> : <Navigate replace to='/' />} />
          <Route path="*" element={<NotFoundLayout />} />
          </Routes>

          <Toast show={message !== ''} onClose={() => setMessage('')} delay={4000} autohide bg="danger">
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Container>
    </BrowserRouter>
  );

}

export default App;