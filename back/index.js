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
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:8080',
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(sanitizer);
app.use(router);
app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});