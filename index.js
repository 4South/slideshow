var express = require('express')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose')
  , slide = require('./slidemodel')
  , passport = require('passport')
  , pass = require('./app/config/PassPort.js')
  , userRoutes = require('./app/routes/UserRoutes.js')
  , db = require('./app/DB/DB.js');
//APP SETUP
var app = express();
mongoose.connect('mongodb://localhost:27017');

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
  app.use(app.router);
});


//main page load
app.get('/', function(req, res) {
  console.log(__dirname);
  return res.sendfile(__dirname + "/index.html");
});

//API Endpoints
//all slides
app.get('/slides', function(req, res) {
  console.log("slideQuery:", req.query)
  var query = req.query;
  if( query !== {}){
    query._slideshow = query.slideshow;
    delete query.slideshow;
  };
  
    slide['Slide'].find(query, function(err, results) {
      var response = {};
      if (err) {
        res.send(err);
      } else {
        response['slides'] = results.map(formatDbResponse)
        res.send(response);
      } 
    });
});

app.get('/slideshows', function(req, res) {
  slide['Slideshow'].find(req.query, function(err, results) {
    var response = {};
    if (err) {
      res.send(err);
    } else {
      response['slideshows'] = results.map(formatDbResponse);
      res.send(response);
    } 
  });

});

app.get('/users', function(req, res) {
  console.log("finding users");
  db['User'].find({}, function(err, results) {
    var response = {};
    if (err) {
      console.log("ERROR");
      res.send(err);
    } else {
      response['users'] = results.map(formatDbResponse);
      res.send(response);
    } 
  });
});

//single slide
app.get('/slides/:id', function(req, res) {
  slide['Slide'].findById(req.params.id, function(err, result) {
    var response = {};
    if (err) {
      console.log(err);
    } else {
      response['slide'] = formatDbResponse(result); 
      res.send(response);
    } 
  });
});

app.get('/slideshows/:id', function(req, res) {
  slide['Slideshow'].findById(req.params.id, function(err, result) {
    var response = {};
    if (err) {
      console.log(err);
    } else {
      response['slideshows'] = formatDbResponse(result); 
      res.send(response);
    } 
  });
});

app.get('/users/:id', function(req, res) {
  db['User'].findById(req.params.id, function(err, result) {
    var response = {};
    if (err) {
      console.log(err);
    } else {
      response['users'] = formatDbResponse(result); 
      res.send(response);
    } 
  });
});


//CRUD 
//delete slide in db and delete handlebars template
app.delete('/slides/:id', function(req, res) {
  slide['Slide'].findOneAndRemove({_id: req.params.id}, function (err, result) {
    if (err) { 
      console.log(err);
    } else {
      res.send(req.body);
    }
  });
});

app.delete('/slideshows/:id', function(req, res) {
  slide['Slideshow'].findOneAndRemove({_id: req.params.id}, function (err, result) {
    if (err) { 
      console.log(err);
    } else {
      res.send(req.body);
    }
  });
});

app.delete('/users/:id', function(req, res) {
  db['User'].findOneAndRemove({_id: req.params.id}, function (err, result) {
    if (err) { 
      console.log(err);
    } else {
      res.send(req.body);
    }
  });
});




//create slide in db and create handlebars template 
app.post('/slides', function(req, res) {
  
  var creationHash = req.body.slide;
  creationHash._slideshow = creationHash.slideshow_id;

  slide['Slide'].create(creationHash, function (err, result) {
    var response = {};
    if (err) {
      console.log(err);
    } else {
      response['slide'] = formatDbResponse(result);
      res.send(response);
    } 
  });
});

app.post('/slideshows', function(req, res) {
  //create new slide in db
  console.log("REQ", req.body.slideshow);
  var creationHash = req.body.slideshow;
  creationHash._user = creationHash.user_id;
  delete creationHash.user_id;
  
  slide['Slideshow'].create(creationHash, function (err, result) {
    var response = {};
    if (err) {
      console.log(err);
    } else {
      response['slideshow'] = formatDbResponse(result);
      res.send(response);
    } 
  });
});


app.put('/slides/:id', function(req, res) {
  slide['Slide'].findOneAndUpdate({_id: req.params.id},
    {$set: req.body.slide},
    function (err, result) {
      var response = {};
      if (err) {
        console.log(err);
      } else {
        response['slide'] = formatDbResponse(result);
        res.send(response);
      }
  });
});

app.put('/users/:id', function(req, res) {
  console.log("REQ.BODY.USER::::", req.body.user);
  db['User'].findOneAndUpdate({_id: req.params.id},
    {$set: req.body.user},
    function (err, result) {
      var response = {};
      if (err) {
        console.log('error', err);
      } else {
        response['user'] = formatDbResponse(result);
        res.send(response);
      }
  });
});

var formatDbResponse = function(result) {
  if(result){
    var cleaned = result.toObject();
    cleaned.id = result._id;
    delete cleaned._id;
    delete cleaned.__v;
    return cleaned;
  }else {
    console.log("nothing found");
    return false;
  }
};

//Routes

app.post('/user/login', passport.authenticate('local'), userRoutes.postlogin);
app.post('/user/create', userRoutes.postcreate);
app.get('/user/logout', userRoutes.getlogout);
app.get('/user/sample', pass.verifyAuth, userRoutes.getsample);




app.listen(1234, function(){
    var msg = "connected on port 1234";
    console.log(msg);
});
