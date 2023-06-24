import dayjs from 'dayjs';

const SERVER_URL = 'http://localhost:3001/api/';

const getPages = async (filter) => {

       const response  =  filter == 'published' 
          ? await fetch(SERVER_URL + 'pages/published')
          : await fetch(SERVER_URL + 'pages/' + filter, { credentials: 'include' })

    if(response.ok){
      const pages  = await response.json();

      const sortedPages = pages.sort((a, b) => {
      const dateA = dayjs(a.publicationDate);
      const dateB = dayjs(b.publicationDate);
      
      if (dateA.isValid() && dateB.isValid()) {
        return dateB - dateA;
      } else if (dateA.isValid() && !dateB.isValid()) {
        return -1; // Metti a precedenza le pagine con data di pubblicazione valida
      } else if (!dateA.isValid() && dateB.isValid()) {
        return 1; // Metti a precedenza le pagine con data di pubblicazione valida
      } else {
        return 0; // Le due date sono entrambe null, mantieni l'ordine originale
      }
    });

    return sortedPages.map((page) => ({
        id: page.id,
        authorId : page.authorId,
        author : page.authorName,
        title :  page.title, 
        creationDate : dayjs(page?.creationDate).format("YYYY-MM-DD"), 
        publicationDate : dayjs(page?.publicationDate).format("YYYY-MM-DD"),
        status : page.status
     } ))
  }
}

const getPage = async (pageId) => {
const responsePage = await fetch(SERVER_URL + 'page/' + pageId, { credentials: 'include' })
const responseComponents  =  await fetch(SERVER_URL + 'components/' + pageId, { credentials: 'include' })

const page  = await responsePage.json();
const components  = await responseComponents.json();

return ({
  id: page.id,
  authorId : page.authorId,
  author : page.authorName,
  title :  page.title, 
  creationDate : dayjs(page?.creationDate).format("YYYY-MM-DD"), 
  publicationDate : dayjs(page?.publicationDate).format("YYYY-MM-DD"),
  status : page.status,
  components : components.sort((a, b) => a.orderId - b.orderId)
}) 
}

const getImages = async () => {

  const response = await fetch(SERVER_URL + 'images', { credentials: 'include' })

  if(response.ok){
    const images = await response.json();

    return(
      images.map(image =>({
      id : image.id,
      name : image.name,
      url : image.url
    })))
  }
}


const updatePage = async (page) =>{
  if (page && page.publicationDate && (page.publicationDate instanceof dayjs))
      page.publicationDate = page.publicationDate.format("YYYY-MM-DD");
  
      const response =  await fetch(SERVER_URL + "pages/" + page.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(page)
      })

  return response.json();
}

const addPage = async (page) => {

const response = await
fetch(SERVER_URL + "pages/", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify(page) 
})
  return response.json();
}

const deletePage = async (pageId) => {

const response = await
fetch(SERVER_URL + "pages/" + pageId, {
  method: 'DELETE',
  credentials: 'include'
})
  return response.json();
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

const API = {logIn, getUserInfo, logOut, getPages, getPage, deletePage, getImages, updatePage, addPage};
export default API;