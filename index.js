var express = require('express');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var slide = require('./slidemodel');

//APP SETUP
var app = express();
mongoose.connect('mongodb://localhost:27017');

app.configure(function() {
  app.use(express["static"](__dirname + "/public"));
  app.use(express["static"](__dirname));
  app.use(express.bodyParser());
});


//main page load
app.get('/', function(req, res) {
  console.log(__dirname);
  return res.sendfile(__dirname + "/index.html");
});

//API Endpoints
//all slides
app.get('/slides', function(req, res) {
  slide['Slideshow'].find({}, function(err, results) {
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
  slide['Slideshow'].find({}, function(err, results) {
    var response = {};
    if (err) {
      res.send(err);
    } else {
      response['slideshows'] = results.map(formatDbResponse)
      res.send(response);
    } 
  });
});

app.get('/users', function(req, res) {
  slide['User'].find({}, function(err, results) {
    var response = {};
    if (err) {
      res.send(err);
    } else {
      response['slideshows'] = results.map(formatDbResponse)
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
});app.get('/users/:id', function(req, res) {
  slide['User'].findById(req.params.id, function(err, result) {
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
  slide['User'].findOneAndRemove({_id: req.params.id}, function (err, result) {
    if (err) { 
      console.log(err);
    } else {
      res.send(req.body);
    }
  });
});




//create slide in db and create handlebars template 
app.post('/slides', function(req, res) {
  //create new slide in db
  console.log(req.body['slide']);
  slide['Slide'].create(req.body.slide, function (err, result) {
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
  console.log(req.body['slideshow']);
  slide['Slideshow'].create(req.body.slideshow, function (err, result) {
    var response = {};
    if (err) {
      console.log(err);
    } else {
      response['slideshow'] = formatDbResponse(result);
      res.send(response);
    } 
  });
});

app.post('/users', function(req, res) {
  //create new slide in db
  console.log ('user:::', req.body.user);
  slide['User'].create(req.body.user, function (err, result) {
  var response = {};
  if (err) {
    console.log(err);
  } else {
    response['user'] = formatDbResponse(result);
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

var formatDbResponse = function(result) {
  var cleaned = result.toObject();
  cleaned.id = result._id;
  delete cleaned._id;
  delete cleaned.__v;
  return cleaned;
};

app.listen(1234, function(){ console.log("Connected on 1234");});
