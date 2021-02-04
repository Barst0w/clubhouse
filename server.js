require('dotenv').config()
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const Schema = mongoose.Schema;

const indexRouter = require('./routes/index')
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')

const mongoDb = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clubhouse.9hzm1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use('/', loginRouter.set_currentUser)

app.use('/', indexRouter)
app.use('/', signupRouter.get_signup)
app.use('/', loginRouter.get_login)

app.post('/signup', signupRouter.post_signup)
app.post('/login', loginRouter.post_login)

app.listen(3000, () => console.log("app listening on port 3000!"));