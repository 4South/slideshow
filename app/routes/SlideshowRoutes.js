var formatDbResponse = require('./../utils/crudutils.js').formatDbResponse
  , Slideshow = require('./../models/models.js').Slideshow;

//NO PUT OPERATION CURRENTLY IMPLEMENTED

exports.getSlideshows = function(req, res) {
  var query = req.query;
  
  if (query.user) {
    query._user = query.user;
    delete query.user;
  } else { 
    query = {};
  } 
  
  Slideshow.find(query, 
  function(err, results) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['slideshows'] = results.map(formatDbResponse);
      res.send(response);
    } 
  });
};

exports.getSlideshowById = function(req, res) {
  Slideshow.findById(req.params.id, 
  function(err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['slideshows'] = formatDbResponse(result); 
      res.send(response);
    } 
  });
};

exports.deleteSlideshow = function(req, res) {
  Slideshow.findOneAndRemove({_id: req.params.id}, 
  function (err, result) {
    if (err) { 
      res.json({message: err});
    } else {
      res.send(req.body);
    }
  });
};

exports.postSlideshow = function(req, res) {
  var creationHash = req.body.slideshow;

  creationHash._user = creationHash.user_id;
  delete creationHash.user_id;
  
  Slideshow.create(creationHash, 
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['slideshow'] = formatDbResponse(result);
      res.send(response);
    } 
  });
};


exports.putSlideshow = function(req, res) {
  Slideshow.findOneAndUpdate({_id: req.params.id}, {$set: req.body.slide},
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['slideshow'] = formatDbResponse(result);
      res.send(response);
    }
  });
};
