import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pkg from 'pg-promise';
import dbQueries from './database.js';
import regNumbers from './routes/routes.js';

const app = express();

app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('images'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: "no secret",
  resave: false,
  saveInitialized: false
}));

app.use(flash());

const connectionString=process.env.URL;
const Pool= pkg();
const db=Pool ({connectionString ,
ssl: true 
});
const queries = dbQueries(db);
const regNum= regNumbers(queries);

app.get('/',regNum.homeRoute);
app.post('/reg_numbers',regNum.recordRegNum);
app.post('/towns',regNum.show) ;
app.post("/reset", regNum.deleteAll);

let PORT = process.env.PORT || 8080;

app.listen(PORT, function () {

  console.log('App starting on port', PORT);

});
