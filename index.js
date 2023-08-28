import 'dotenv/config';
//console.log(process.env.DATABASE_URL);
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pkg from 'pg-promise';
import dbQueries from './sql.js';
import regNumbers from './routes/registration.js';

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

const connectionString=process.env.URL;
const Pool= pkg();
const db=Pool ({connectionString ,
ssl: true 
});

const queries = dbQueries(db);
const regNum= regNumbers(queries);

app.get('/',async function (req, res,next) {
  
//regNum.getAllTowns();

//await queries.deleteData();
res.render("index");
}
);

app.post('/reg_numbers',regNum.recordRegNum);


app.get('/reg_numbers',async function (req, res,next) {

  let result= await queries.getAll();

res.render("index",{
  regNums:result}
);

}
);



let PORT = process.env.PORT || 8080;

app.listen(PORT, function () {

  console.log('App starting on port', PORT);

});
