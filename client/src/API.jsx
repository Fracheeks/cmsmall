import dayjs from 'dayjs';

const SERVER_URL = 'http://localhost:3001/api/';

async function getUsers(){
  const response = await fetch(SERVER_URL + 'users', {
    method: 'GET',
    credentials: 'include'})
    

const users = await response.json();

if(response.ok){
    return users;
  }
   else{
  throw users;}
}

const setAppName = async (name) => {

  const response = await fetch(SERVER_URL + 'application/'+ name, {
    method: 'PUT',
    credentials: 'include',})

  const result = await response.json();
  if(response.ok){
    return result;
  }
  else{
    throw result;
  }
}

const getAppName = async () => {

  const response = await fetch(SERVER_URL + 'application', {
  method: 'GET'})

  const result = await response.json();
  if(response.ok){
    return result;
  }
  else{
    throw result;
  }
}

const getPages = async (filter) => {

       const response  =  filter == 'published' 
          ? await fetch(SERVER_URL + 'pages/published')
          : await fetch(SERVER_URL + 'pages/' + filter, { credentials: 'include' })

    const pages  = await response.json();

    if(response.ok){

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
        publicationDate : page.publicationDate ? dayjs(page?.publicationDate).format("YYYY-MM-DD") : null,
        status : page.status
     } ))
  }
  else {
    throw pages
  }
}

const getPage = async (pageId) => {
const responsePage = await fetch(SERVER_URL + 'page/' + pageId, { credentials: 'include' })
const responseComponents  =  await fetch(SERVER_URL + 'components/' + pageId, { credentials: 'include' })

const page  = await responsePage.json();

if(responsePage.ok){

const components  = await responseComponents.json();

if(responseComponents.ok){

              return ({
                      id: page.id,
                      authorId : page.authorId,
                      author : page.authorName,
                      title :  page.title, 
                      creationDate : dayjs(page?.creationDate).format("YYYY-MM-DD"), 
                      publicationDate : page.publicationDate ? dayjs(page?.publicationDate).format("YYYY-MM-DD") : null,
                      status : page.status,
                      components : components.sort((a, b) => a.orderId - b.orderId)})
        }else {
          throw components}

}else{
  throw page} 
}

const getImages = async () => {

  const response = await fetch(SERVER_URL + 'images', { credentials: 'include' })
  const images = await response.json();

  if(response.ok){

    return(
      images.map(image =>({
      id : image.id,
      name : image.name,
      url : image.url
    })))
  }
  else{
    throw images
  }
}


const updatePage = async (page) =>{
  if (page && page?.publicationDate && (page?.publicationDate instanceof dayjs))
      page.publicationDate = page.publicationDate.format("YYYY-MM-DD");
  
      const response =  await fetch(SERVER_URL + "pages/" + page.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(page)
      })

  const resultPage = await response.json();

  if(response.ok){
    return resultPage;
  }
  else{
    throw resultPage;
  }
}

const addPage = async (page) => {

const response = await
          fetch(SERVER_URL + "pages/", {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',},
          credentials: 'include',
          body: JSON.stringify(page) 
          })

          const resultPage = await response.json();

          if(response.ok){
            return resultPage;
          }
          else{
            throw resultPage;
          }
        }


const deletePage = async (pageId) => {

const response = await
fetch(SERVER_URL + "pages/" + pageId, {
  method: 'DELETE',
  credentials: 'include'
})

const result = await response.json();

      if(response.ok){
          return result;
        }
         else{
        throw result;}
}

async function setAuthor(pageId, authorId){
  const response = await fetch(SERVER_URL + 'author/'+pageId+'/'+ authorId, {
    method: 'POST',
    credentials: 'include',})
  
    const author = await response.json();

    if(response.ok){
      return author;
    }
    else{
      throw author;
    }
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

const API = {logIn, getUserInfo, logOut, getPages, getPage, deletePage, getImages, 
updatePage, addPage, setAuthor, getUsers, setAppName, getAppName};
export default API;