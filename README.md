[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/suhcjUE-)
# Exam #1: "CMSmall"
## Student: s315084 DI MELLA FRANCESCA

## React Client Application Routes

- Route `/`: una volta che la pagina è stata caricata (setLoading(false)) , si accede tramite la DefaultRoute ai contenuti del file PageForm per la visualizzazione delle schermate di Front-Office/Back-Office, l'oggetto "isFront" che viene passato è utilizzato per discriminare la visualizzazione di funzionalià aggiuntive.

- Route `/viewPage/:id`: l'obiettivo è quello di visualizzare informazioni aggiuntive relative alla pagina, le quali vengono recuperate tramite l'utilizzo della funzione getPage in API.jsx, alla quale viene prontamente passato il parametro "id" relativo alla pagina. l'utilizzo di setNavOps permette di nascondere elementi della navbar superflui a fini della visualizzazione o modifica/creazione di una pagina

- Route `/login`: rispetto alle funzionalità standard, nella funzione del LogoutButton() ho aggiunto una callback che permette di essere reindirizzati alla pagina iniziale (Front-Office).

- Route `*`: nel caso di inserimento di url non valido, si viene reindirizzati ad una pagina di errore.

- Route `/editPage/:id`: serve per editare la pagina, aggiungere/eliminare componenti in maniera dinamica e visualizzarne un'anteprima tramite le funzionalità offerte in Page.jsx e Component.jsx.

- Route `/addPage` : serve per poter craere un nuovo componente partendo da zero. La creazione è vincolata a livello server, dove vengono fatti dei controlli per validitare che la pagina abbia determinate caratteristiche.


## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/pages/:filter`
  - request parameters : filtro per la selezione delle tuple in base allo stato (all/published/scheduled/draft)
  - response body content : oggetto json contenente le informazioni base di tutte la pagine e in aggiunta il nome dell'authore della pagina
- GET `/api/page/:id`
  - request parameters : id della pagina
  - response body content : oggetto json contenente le informazioni base della pagina richiesta e in aggiunta il nome dell'authore della pagina
- GET `/api/components/:id` 
  - request parameters : id della pagina di riferimento per i componenti
  - response body content : array contenete la lista dei componenti riferiti ad ogni pagina

## Database Tables

- Table `users` - utilizzata a livello multi-utente
   contiene :
    - id : unico per ogni utente
    - role : utilizzato lato client per discriminare funzionalità aggiuntive per la tipologia 'amministratore'
    - email
    - name : utilizzato per poter visualizzare informazioni sull'utente senza dover ricorrere all'id.
    - salt
    - password

- Table `pages` - utilizzata per poter mantenere le informazioni base relative alle diverse pagine e che verranno visualizzate a livello di "Front-Office"/"Back-Office"
  contiene :
  - id : unico per ogni pagina
  - authorId : id del singolo utente, necessario per poter effettuare operazioni di join tra le due tabelle
  - title 
  - creationDate : viene inserita automaticamente alla creazione della pagina
  - publicationDate : può essere inserita/modifcata a posteriori
  - status : viene inserito automaticamente alla creazione in base alle informazioni fornite dalla data di pubblicazione (vd. defineStatus(publicationDate))

- Table `components` - utilizzata per poter mantenere le informazioni aggiuntive relative alla singola pagina
  contiene :
  - id : unico per ogni componente
  - pageId : id della singola pagina, necessario per poter effettuare operazioni di join tra le due tabelle
  - orderId : relativo alla possibilità di scambiare l'ordine di visualizzazione dei componenti 
  - type : tipologia di componente
  - content : contenuto del componente (se Header o Paragraph)
  - imageId : se presente, id della simgola immagine, necessario per poter effettuare operazioni di join tra le due tabelle (images  e components)

  - Table `images`- utilizzata per poter mantenere le informazioni relative alle singole immagini
    contiene :
    - id : unico per ogni immagine
    - name : breve descrizione immagine
    - url : path relativo per individuare la posizione dell'immagine

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username : Francesca , password : esame, email : francesca@test.com
- username : Admin , password : esame, email : admin@test.com
- username : Matteo , password : esame, email : matteo@test.com
- username : Davide, password : esame, email : davide@test.com

