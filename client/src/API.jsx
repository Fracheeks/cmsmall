import dayjs from 'dayjs';

const SERVER_URL = 'http://localhost:3001/api/';


const getPages = async (filter) => {

       const response  =  filter == 'all' 
          ? await fetch(SERVER_URL + 'pages/all')
          : await fetch(SERVER_URL + 'pages/filter=' + filter, { credentials: 'include' })

    if(response.ok){
      const pages  = await response.json();
    return pages.map((page) => ({
        id: page.id,
        author : page.authorName,
        title :  page.title, 
        creationDate : dayjs(page?.creationDate), 
        publicationDate : dayjs(page?.publicationDate),
        status : page.status
     } ))
  }
}

const getPage = async (pageId) => {
const page  = getJson( fetch(SERVER_URL + 'page/' + pageId, { credentials: 'include' }))
const components  = getJson( fetch(SERVER_URL + 'components/' + pageId, { credentials: 'include' }))

return Object.assign({}, [page,components]);
}


function updatePage(film) {
  if (page && page.publicationDate && (page.publicationDate instanceof dayjs))
      page.publicationDate = page.publicationDate.format("YYYY-MM-DD");
  return getJson(
    fetch(SERVER_URL + "pages/" + page.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(page)
    })
  )
}

function addPage(page) {
  return getJson(
    fetch(SERVER_URL + "pages/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(page) 
    })
  )
}

function deleteFilm(pageId) {
  return getJson(
    fetch(SERVER_URL + "pages/" + pageId, {
      method: 'DELETE',
      credentials: 'include'
    })
  )
}



async function logIn(credentials) {
  let response = await fetch(SERVER_URL + 'sessions', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch(SERVER_URL+'sessions/current', {
    method: 'DELETE', 
    credentials: 'include' 
  });
}

async function getUserInfo() {
  const response = await fetch(SERVER_URL+'sessions/current', {
    credentials: 'include'
  });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

const API = {logIn, getUserInfo, logOut, getPages};
export default API;