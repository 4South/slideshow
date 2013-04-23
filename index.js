var express = require('express')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose')
  , passport = require('passport');

var pass = require('./app/config/PassPort.js')
  , userRoutes = require('./app/routes/UserRoutes.js')
  , slideRoutes = require('./app/routes/SlideRoutes.js')
  , slideshowRoutes = require('./app/routes/SlideshowRoutes.js')

//APP SETUP
var app = express();

//DATABASE CONNECT
var dbPath =  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 'mongodb://localhost:27017/slideshowapp';
mongoose.connect(dbPath, 
function() {
  console.log('mongo connected at', dbPath);
});

//APP CONFIGURE
app.configure(function() {
  app.use(express["static"](__dirname + "/public"));
  app.use(express["static"](__dirname));
  //app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: '42',
  }));
  app.use(passport.initialize());
  app.use(passport.session());
});


//main page load
app.get('/', function(req, res) {
  console.log(__dirname);
  return res.sendfile(__dirname + "/index.html");
});

//API ENDPOINTS
//Slides endpoints
app.get('/slides', slideRoutes.getSlides);
app.get('/slides/:id', slideRoutes.getSlideById);
app.post('/slides', pass.verifyAuth, slideRoutes.postSlide);
app.delete('/slides/:id', pass.verifyAuth, slideRoutes.deleteSlideById); 
app.put('/slides/:id', pass.verifyAuth, slideRoutes.putSlide);
app.put('/slideshows/:id', pass.verifyAuth, slideshowRoutes.putSlideshow);

app.get('/slideshows', slideshowRoutes.getSlideshows);
app.get('/slideshows/:id', slideshowRoutes.getSlideshowById);
app.post('/slideshows', pass.verifyAuth, slideshowRoutes.postSlideshow);
app.delete('/slideshows/:id', pass.verifyAuth, slideshowRoutes.deleteSlideshow); 

app.get('/user/logout', userRoutes.getlogout);
app.post('/user/login', passport.authenticate('local'), userRoutes.postlogin);
app.post('/user/create',  userRoutes.postcreate, 
                          passport.authenticate('local'),
                          userRoutes.postlogin);

//CONNECT SERVER
app.listen(1234, function(){
    var msg = "connected on port 1234";
    console.log(msg);
});
