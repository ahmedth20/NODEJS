const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const http = require("http");

const mongo = require("mongoose");

const indexRouter = require("./routes/index");
const paysRouter= require("./routes/pays");
const usersRouter = require("./routes/users");


// App setup
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
 
app.set('view engine', 'pug'); 

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



const mongoConnection = require("./config/mongoconnection.json");
  app.use('/', indexRouter);
  app.use('/api/users', usersRouter);
  app.use('/pays',paysRouter);

  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
   
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
      res.render('error', {
      errorTitle: 'Oops! Something went wrong.',
      errorMessage: err.message,
  });
  });
  //mongoconnection
  mongo.connect(mongoConnection.url)
    .then(() => {
      console.log("Connexion à MongoDB réussie !");
    })
    .catch((err) => {
      console.error("Erreur lors de la connexion à MongoDB :", err);
    });

   
  module.exports = app;