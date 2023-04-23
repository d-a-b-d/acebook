const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const friendRoutes = require('./routes/friendRoutes');
const imageRoutes = require('./routes/imageRoutes');
const likeRoutes = require('./routes/likeRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const indexRouter = require('./routes/index');

dotenv.config();

async function run() {
  try {
      await mongoose.connect("mongodb://127.0.0.1:27017/acebook");
      console.log("Connected!")

  } catch (err) {
      console.error(err.message);
  }
}

run();

var app = express();

app.use(express.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/auth", authRoutes);
app.use("/friends", friendRoutes);
app.use("/image", imageRoutes);
app.use("/like", likeRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use('/', indexRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
