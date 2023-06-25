import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { LoginForm } from './components/Auth.jsx';
import { Navigation } from './components/Navigation.jsx';
import { NotFoundLayout, LoadingLayout, DefaultLayout , ViewLayout, EditPageLayout, AddPageLayout} from './components/PageLayout.jsx';

import API from './API';


function App() {
  

  const [pages, setPages] = useState([]);

  const [dirty, setDirty] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');

  const [filter, setFilter] = useState('published');

  const [isFront, setFront] = useState(true);

  const [opsNavbar, setOpsNavbar] = useState(true);


  function handleError(err) {
    console.log('err: '+JSON.stringify(err)); 
    let errMsg = 'Unkwnown error';
    if (err.errors) {
      if (err.errors[0])
        if (err.errors[0].msg)
          errMsg = err.errors[0].msg;
    } else if (err.error) {
      errMsg = err.error;
    }
    setErrorMsg(errMsg);
    setTimeout(()=>setDirty(true), 2000);  
  }

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch(err) {
      }
    };
    checkAuth();
  }, []);


  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
    /* set state to empty if appropriate */
  }
  

  const loginSuccessful = (user) => {
    setUser(user);
    setLoggedIn(true);
    setDirty(true);  // load latest version of data, if appropriate
  }


  useEffect(() => {
    setDirty(true);
  }, [filter])

  useEffect(() => {

    if (dirty) {
      API.getPages(filter)
        .then(pages => {

          setPages(pages);
          setDirty(false);
          setLoading(false);
        })
        .catch(e => { 
          handleError(e); setDirty(false); 
        } ); 
    }
  }, [dirty]);

  const deletePage = (pageId) => {
    API.deletePage(pageId)
      .then(() => { setDirty(true); })
      .catch(e => handleError(e)); 
  }

  const editPage = (page) => {
    API.updatePage(page)
      .then(() => { setDirty(true); })
      .catch(e => handleError(e))
  }

  const addPage = (page) => {
    API.addPage(page)
      .then(() => { setDirty(true); })
      .catch(e => handleError(e))
  }

  const getPage = (pageId) => {
    return API.getPage(pageId)
  }

  return (
    <BrowserRouter>
          <Navigation handleError={handleError} user={user} opsNavbar = {opsNavbar} setOpsNavbar = {setOpsNavbar}  
           isFront = {isFront} setFilter={setFilter} setFront={setFront} logout={doLogOut} 
           loggedIn={loggedIn} pagelist={pages}  setPages={setPages} filter={filter} />

          <Routes>
          <Route path="/" element={loading ? <LoadingLayout /> : 
          <DefaultLayout  setErrorMsg={setErrorMsg} errorMsg={errorMsg} user={user} isFront = {isFront} pagelist={pages} deletePage={deletePage} loading={loading} />
            } />
        <Route path='/login' element={loggedIn? <Navigate replace to='/' />:  <LoginForm loginSuccessful={loginSuccessful} />} />
          <Route path="*" element={<NotFoundLayout />} />
          <Route path="/viewPage/:id" element={ <ViewLayout setOpsNavbar = {setOpsNavbar}  isFront = {isFront} user={user} getPage = {getPage} /> } />
          <Route path="/editPage/:id" element={ <EditPageLayout handleError={handleError} setOpsNavbar = {setOpsNavbar} user={user} editPage={editPage} getPage = {getPage} /> } />
          <Route path="/addPage" element={ <AddPageLayout handleError={handleError} setOpsNavbar = {setOpsNavbar} user={user} addPage={addPage}/> } />
          </Routes>
    </BrowserRouter>
  );

}

export default App;