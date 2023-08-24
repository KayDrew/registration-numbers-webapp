import 'dotenv/config';
//console.log(process.env.DATABASE_URL);
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pkg from 'pg-promise';

import setUsers from './sql.js';


const app = express();


app.use(express.static('public'));
app.engine('handlebars', engine());

app.set('view engine', 'handlebars');

app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('images'))
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: "no secret",
  resave: false,
  saveInitialized: false
}));

app.use(flash());



app.get('/',async function (req, res,next) {


res.render("index");
}
);



let PORT = process.env.PORT || 8080;

app.listen(PORT, function () {

  console.log('App starting on port', PORT);

});
