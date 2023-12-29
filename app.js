const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

let sessionOptions = session({
  secret: "i love coding",
  // store: new MongoStore({client: require("./db")}),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())

const router = require('./router');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.set("views", "views")
app.set("view engine", "ejs");

app.use('/', router);

app.listen("http://profclever.com"

, () => {
  console.log('app listening on port 3000!');
});