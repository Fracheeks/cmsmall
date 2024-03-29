const express = require('express');
const morgan = require('morgan');                                  
const cors = require('cors');
const dayjs = require('dayjs');
const { check, validationResult, } = require('express-validator'); // validation middleware

const userDao = require('./dao-users.js');
const pagesDao = require('./dao.js');


const app = express();
app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

const passport = require('passport');                              
const LocalStrategy = require('passport-local');                   


passport.use(new LocalStrategy(async function verify(username, password, callback) {
  const user = await userDao.getUser(username, password)
  if(!user)
    return callback(null, false, 'Incorrect username or password');  
    
  return callback(null, user);
}));

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (user, callback) {

  return callback(null, user);
});

const session = require('express-session');

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => { 
    if (err)
      return next(err);
      if (!user) {
        return res.status(401).json({ error: info});
      }
      req.login(user, (err) => {
        if (err)
          return next(err);
        return res.json(req.user);
      });
  })(req, res, next);
});

app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.status(200).json({});
  });
});

// Verifies that the components received from the frontend satisfy some required features
const verifyComps= check('components')
  // must have at least 2 components 
  .isArray({ min: 2 }).withMessage("Components must be a non-empty array")
  // must have at least one header and one between an header and a paragraph
  .custom((components) => {
    const hasHeader = components.some(element => element.type === 'Header');
    const hasImageParag = components.some(element => {
      return (element.type === 'Paragraph' || element.type === 'Image')
    });
    if (!hasHeader || !hasImageParag) {
      throw new Error("There must be at least one header and one other element")
    }
    return true
  })
  // checks that components of type 'Paragraph' and 'Header' have a content and do not have an imageId related
  // checks that components of type 'Image' have an imageId related and do not have a content
  .custom((components) => {
    for (elem of components) {
      let isValid;
      if (elem.type == "Header" || elem.type == "Paragraph") {
        isValid = elem.content && !elem.imageId
      }
      else {
        isValid = elem.imageId && !elem.content
      }
      if (!isValid) {
        throw new Error("Headers and Paragraphs must have a content and Images must refer to an image")
      }
      return true
    }
  })

  app.get('/api/application',
  (req, res) => {
    pagesDao.getAppName()
      .then(name => 
           res.json(name))
      .catch((err) => res.status(500).json(err));
  }
);


  app.put('/api/application/:name',
  isLoggedIn,
  (req, res) => {

    if(req.user.role  != 'Admin' ){
      return res.status(400).json({error : "Unauthorized"});
    }

    pagesDao.setAppName(req.params.name)
      .then(() => 
           res.json({name: req.params.name}))
      .catch((err) => res.status(500).json(err));
  }
);


  app.get('/api/users',
  isLoggedIn,
  (req, res) => {
    pagesDao.getUsers()
      .then(users => {
        if (!req.isAuthenticated() && req.user.role != 'Admin'){
          res.status(404).json({error : 'Not authorized'})
        }else{
           res.json(users);}})
      .catch((err) => res.status(500).json(err));
  }
);

  app.get('/api/pages/:filter',
  (req, res) => {
    pagesDao.getPages(req.params.filter, req.user?.id)
      .then(pages =>{
        if (!req.isAuthenticated() && pages.some((page)=>page.status != 'published')){
          res.status(404).json({error : 'Not authorized'})
        }else{
           res.json(pages);}})
      .catch((err) => res.status(500).json(err)); 
  }
);

app.get('/api/page/:id',
  [ check('id').isInt({min: 1}) ], 
  async (req, res) => {
    try {
      const result = await pagesDao.getPage(req.params.id);
      if (result.error)
        res.status(404).json(result);
      else
        if(!req.isAuthenticated() && result.status != 'published'){
          res.status(404).json({error : 'Not authorized'});
        }else{
           res.json(result);}
    } catch (err) {
      res.status(500).end();
    }
  }
);

app.get('/api/components/:id',
  [ check('id').isInt({min: 1}) ], 
  async (req, res) => {
    try {
      const result = await pagesDao.getComponents(req.params.id);
      if (result.error)
        res.status(404).json(result);
      else
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

app.get('/api/images',
  [ check('id').isInt({min: 1}) ], 
  async (req, res) => {
    try {
      const result = await pagesDao.getImages();
      if (result.error)
        res.status(404).json(result);
      else
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

const defineStatus = (publicationDate) =>{
  if (publicationDate == null)
        return 'draft';
  return publicationDate<=dayjs().format('YYYY-MM-DD') ? 'published' : 'scheduled';
}

checkPublicationDate = (publicationDate, creationDate) =>{
  return new Date(publicationDate)<new Date(creationDate) ? 0 : 1;
}

app.post('/api/pages', 
  isLoggedIn,
  [ verifyComps,
    check('title').isLength({min: 1, max:160}),
    check('publicationDate').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }); // error message is a single string with all error joined together
    }

    if(!checkPublicationDate(req.body?.publicationDate, req.body.creationDate)) {
      return res.status(400).json({ error: "Invalid publication date"})
    }
    try {
    const page = {
      authorId: req.user.id,
      title : req.body.title,
      publicationDate: req.body?.publicationDate,
      creationDate : dayjs().format('YYYY-MM-DD'),
      status : defineStatus(req.body?.publicationDate)
    };
    const resultPage = await pagesDao.createPage(page); 

    const components  = req.body.components.map((e) => {

     return {  
        pageId : resultPage.id,
        orderId : e.orderId,
        type : e.type,
        content : e.content,
        imageId : e.imageId
     }
    })

    const resultComps = await pagesDao.createComponents(components); 

      res.json({resultPage, resultComps});
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of new page: ${err}` }); 
    }
  }
);


app.put('/api/pages/:id',
  isLoggedIn,
  [ verifyComps,
    check('id').isInt(),
    check('title').isLength({min: 1, max:160}),
    check('publicationDate').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }); // error message is a single string with all error joined together
    }
    if (req.body.id !== Number(req.params.id)) {
      return res.status(422).json({ error: 'URL and body id mismatch' });
    }
    if(req.user.id != req.body.authorId && req.user.role  !== 'Admin' ){
      return res.status(400).json("Unauthorized");
    }

    if(!checkPublicationDate(req.body.publicationDate, req.body.creationDate)) {
      return res.status(400).json({ error: "Invalid publication date"})}

    try {

      const page = {
        id: req.body.id,
        title : req.body.title,
        authorId: req.user.id,
        creationDate: req.body.creationDate,
        publicationDate: req.body.publicationDate,
        status : defineStatus(req.body?.publicationDate)

      };


      result = await pagesDao.updatePage(page);

      const deleteComponents =  pagesDao.deleteComponents(req.body.id)

      const components  = req.body.components.map((e) => {

        return {  
           pageId : page.id,
           orderId : e.orderId,
           type : e.type,
           content : e.content,
           imageId : e.imageId
        }
       })
       result = await pagesDao.createComponents(components); 

      if (result.error)
        res.status(404).json(result);
      else
        res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the update of page ${req.params.id}: ${err}` });
    }
  }
);


app.delete('/api/pages/:id',
  isLoggedIn,
  [ check('id').isInt() ],
  async (req, res) => {
    try {

      const page  = await pagesDao.getPage(req.params.id);

      if(page.error){
          return res.status(400).json(page.error);
      }
      if(req.user.id != page.authorId && req.user.role  !== 'Admin' ){
        return res.status(400).json("Unauthorized");
      }
      const resultPage = await pagesDao.deletePage(req.params.id);

      if (resultPage !== null)
      return res.status(400).json(resultPage); 

      const resultComps = await pagesDao.deleteComponents(req.params.id);

      if (resultComps == null)
        return res.status(200).json({}); 
      else
        return res.status(404).json(resultComps);
    } catch (err) {
      res.status(503).json({ error: `Database error during the deletion of page ${req.params.id}: ${err} ` });
    }
  }
);


app.post('/api/author/:pageId/:authorId',
isLoggedIn,
[ check('pageId').isInt(),
  check('authorId').isInt()
 ],
  async (req, res) => {

    if(req.user.role  != 'Admin' ){
      return res.status(400).json({error : "Unauthorized"});
    }

   pagesDao.getUsers().then( 
      (users) => {
         if(users.every(user => user.id != req.params.authorId)){
               return res.status(400).json({error : "user not found"})}
    })

    try {
      const result = await pagesDao.setAuthor(req.params.pageId, req.params.authorId)
      if (result.error)
        res.status(404).json(result.error);
      else
        res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the update of author foe the page n. ${req.params.id}: ${err}` });
    }
  }
);




const PORT = 3001;
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));