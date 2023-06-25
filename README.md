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

- GET `/api/application`
  - parameters : null
  - response : name (nome dell'applicazione)
- POST `/api/application/:name`
  - parameters : name (nome dell'applicazione)
  - response : name (nome dell'applicazione)
- GET `/api/users`
  - parameters : null
  - response : users (lista degli utenti)
- GET `/api/pages/:filter`
  - parameters : filter 
(filtraggio basato sullo stato, 'all' => ritona tutte le pagine)
  - response : users (lista delle pagine)
- GET `/api/page/:id`
  - parameters : id (identificativo della pagina)
  - response : components (componenti della pagina richiesta)
- POST `/api/pages`
  - parameters : null
  - response : pagina creata
- POST `/api/pages/:id`
  - parameters : id (identificativo della pagina modificata )
  - response : pagina modificata
- DELETE `/api/pages/:id`
  - parameters : id (identificativo della pagina da eliminare)
  - response : null
- POST `/api/author/:pageId/:authorId`
  - parameters : id (identificativo della pagina) e authorId (identificativo del nuovo autore)
  - response : authorId (identificativo del nuovo autore)
- POST `/api/session`
  - parameters : null
  - response : user (utente)
- GET `/api/session/current`
  - parameters : user (utente)
  - response : null
- DELETE `/api/session/current`
  - parameters : user (utente)
  - response : null


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

- `ViewForm` (in `ViewForm.jsx`): ha il ruolo di far visualizzare i componenti aggiuntivi relativi alla pagina

- il file `PageLayout.js` fa da wrapper ad una serie di componenti:
  - NotFoundLayout : Layout per la visualizzazione di errore 
  - DefaultLayout : Layout per la visualizzazione delle schermate principali di Front-Office e Back-Office
  - LoadingLayout : Layout per il caricamento dati
  - LoginLayout : Layout per la effettuare il login  
  - ViewLayout : Layout per la visualizzazione della pagina con i corrispettivi componenti
  - EditPageLayout : Layout per la modifica di una pagina e dei suoi componenti
  - AddPageLayout: layout per l'aggiunta di una pagina insiema ai suoi componenti

- `PageForm` (in `PageForm.jsx`): visualizzazione delle pagine e delle loro informazioni tramite il componente "Card" di React-Boostrap. In base allo stato 'isFront', verrà visualizzato alternativamente il Front-Office o il Back-Office, le pagine filtrate e i relativi 'Button' per effettuare modiche/eliminazione di pagine o l'eventuale aggiunta.

- `Page` (in `PageForm.jsx`): serve per l'aggiunta, la modifica e la visualizzazione dell'anteprima di una pagina in maniera dinamica.

- `Component` (in `Component.jsx`): serve per l'aggiunta, la modifica, l'eliminazione e la visualizzazione dell'anteprima di un componente di una pagina in maniera dinamica.

- `Navigation` (in `Navigation.jsx`): serve per la gestione della navbar e dei suoi elementi e della loro eventuale visualizzazione o meno in base ai valore assegnati agli stati 'opsNavbar', 'isFront' e 'editMode'

- `LoginForm` (in `Auth.jsx`): serve per convalidare il profilo di un utente o , eventualmente, di bloccarne l'accesso in base a delle credenziali errate, mostrando un messaggio di errore.


## Screenshot

![Screenshot](./screenshot/screenshot.jpg)

## Users Credentials

- username : Francesca , password : esame, email : francesca@test.com, role : Regular
- username : Admin , password : esame, email : admin@test.com, role : Admin
- username : Matteo , password : esame, email : matteo@test.com, role : Regular
- username : Davide, password : esame, email : davide@test.com, role : Regular

