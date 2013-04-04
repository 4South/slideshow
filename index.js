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


//ROUTES
app.get('/', function(req, res) {
  return res.sendfile(__dirname + "/index.html");
});

app.get('/slides', function(req, res) {
  slide['Slide'].find({}, function(err, results) {
    if (err) {
      res.send(err);
    } else {
      res.send(results.map(formatDbResponse));
    } 
  });
});



//CRUD 
//delete slide in db and delete handlebars template
app.delete('/delete', function(req, res) {
  slide['Slide'].findOneAndRemove({_id: req.body.id}, function (err, result) {
    if (err) { 
      console.log(err);
    } else {
      deleteFile( 'public/handlebars/slides/', 
                  req.body.templateName, 
                  '.handlebars');
      res.send(req.body);
    }
  });
});

//create slide in db and create handlebars template 
app.post('/create', function(req, res) {
  //create new slide in db
  slide['Slide'].create(req.body, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      //create new handlebars template based on slidename
      createFile( 'public/handlebars/slides/', 
                  req.body.templateName, 
                  '.handlebars');
      res.send(formatDbResponse(result));
    } 
  });
});

//create file on server
createFile = function(path, name, ext) {
  var file = path+name+ext;
  fs.exists(file, function(exists) {
    if (exists) {
      fs.unlink(file, function (err) {
        console.log(file, ' already exists');
      });
    } else {
      fs.writeFile(file, "{{! autogenerated by slidesapp }}", function(err) {
        if (err) { console.log(err); }
      });
      console.log('created ', file);
    }   
  });
};

//delete file on server
deleteFile = function(path, name, ext) {
  var file = path+name+ext;
  fs.exists(file, function(exists) {
    if (exists) {
      fs.unlink(file, function (err) {
        if (err) {console.log(err);}  
      });
      console.log('deleted ', file);
    } else {
      console.log(file, ' does not exist');
    }   
  });
};

var formatDbResponse = function(result) {
  var cleaned = result.toObject();
  cleaned.id = result._id;
  delete cleaned._id;
  delete cleaned.__v;
  return cleaned;
};

app.listen(1234);
