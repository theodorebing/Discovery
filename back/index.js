require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const sanitizer = require('./app/middlewares/body-sanitizer');
// ajout de multer 
// const multer = require('multer');
// const bodyParser = multer();
// app.use(bodyParser.none());
const router = require('./app/router');
const port = process.env.PORT;
if (port == null || port == "") {
  port = 5050;
}

const corsOptions = {
    origin: ['http://localhost:8080', 'https://www.theodorebing.com', 'https://theodorebing.com', 'https://cocky-hodgkin-85eeba.netlify.app'],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(sanitizer);
const session = require('express-session');
app.use(session({
    secret:'zero imagination',
    userid: null,
    saveUninitialized: true,
    resave:true
}));
app.use(router);
app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});