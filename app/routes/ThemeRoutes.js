var formatThemeResponse = require('./../utils/crudutils.js').formatThemeResponse,
    Theme = require('./../models/models.js').Theme;

exports.getThemes = function(req, res) {
  Theme.find({},
  function(err, results){
    var response = {};
    if (err){
      res.json({message: err});  
    } else {
      response['themes'] = results.map(formatThemeResponse);
      res.send(response);
    }
  });
};


exports.getThemeById = function(req, res){
  Theme.findById(req.params.id,
  function(err, result){
    if (err){
      res.json({message: err});  
    } else {
      response['theme'] = formatThemeResponse(result);
      res.send(response);
    }
  });
};


exports.deleteThemeById = function(req, res) {
  Theme.findOneAndRemove({_id: req.params.id}, 
  function (err, result) {
    var response = {};
    if (err) { 
      res.json({message: err});
    } else {
      res.status(200).send({});
    }
  });
};

exports.postTheme = function(req, res) {
  var creationHash = req.body.theme;
  creationHash._h1 = creationHash.h1_id;
  creationHash._h2 = creationHash.h2_id;
  creationHash._h3 = creationHash.h3_id;
  creationHash._h4 = creationHash.h4_id;
  creationHash._h5 = creationHash.h5_id;
  creationHash._h6 = creationHash.h6_id;
  creationHash._div = creationHash.div_id;
  creationHash._section = creationHash.section_id;
  creationHash._pre = creationHash.pre_id;
  creationHash._li = creationHash.li_id;
  creationHash._p = creationHash.p_id;
  creationHash._span = creationHash.span_id;

  Theme.create(creationHash, 
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['theme'] = formatThemeResponse(result);
      res.send(response);
    } 
  });
};

exports.putTheme = function(req, res) {
  Theme.findOneAndUpdate({_id: req.params.id}, {$set: req.body.theme},
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['theme'] = formatThemeResponse(result);
      res.send(response);
    }
  });
};
