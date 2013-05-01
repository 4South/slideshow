var formatSlideResponse = require('./../utils/crudutils.js').formatSlideResponse
  , Slide = require('./../models/models.js').Slide;

exports.getSlides = function(req, res) {
  var query = req.query;
  if (query.slideshow) {
    query._slideshow = query.slideshow;
    delete query.slideshow;
  };
  console.log("QUERY", query);
  Slide.find(query, 
  function(err, results) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['slides'] = results.map(formatSlideResponse);
      console.log("RESULTS", response);
      res.send(response);
    } 
  });
};

exports.getSlideById = function(req, res) {
  Slide.findById(req.params.id, 
  function(err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['slide'] = formatSlideResponse(result); 
      res.send(response);
    } 
  });
};

exports.deleteSlideById = function(req, res) {
  Slide.findOneAndRemove({_id: req.params.id}, 
  function (err, result) {
    var response = {};
    if (err) { 
      res.json({message: err});
    } else {
      //TEST
      res.status(200).send({});
      //response['slide'] = formatSlideResponse(result); 
      //res.send(response);
    }
  });
};

exports.postSlide = function(req, res) {
  var creationHash = req.body.slide;
  creationHash._slideshow = creationHash.slideshow_id;

  Slide.create(creationHash, 
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['slide'] = formatSlideResponse(result);
      res.send(response);
    } 
  });
};

exports.putSlide = function(req, res) {
  Slide.findOneAndUpdate({_id: req.params.id}, {$set: req.body.slide},
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['slide'] = formatSlideResponse(result);
      res.send(response);
    }
  });
};
