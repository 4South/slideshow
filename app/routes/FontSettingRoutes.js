var formatFontSettingResponse = require('./../utils/crudutils.js').formatFontSettingResponse,
    FontSetting = require('./../models/models.js').FontSetting;

exports.getFontSettings = function(req, res) {
  FontSetting.find({},
  function(err, results){
    var response = {};
    if (err){
      res.json({message: err});  
    } else {
      response['fontSettings'] = results.map(formatFontSettingResponse);
      res.send(response);
    }
  });
};


exports.getFontSettingById = function(req, res){
  FontSetting.findById(req.params.id,
  function(err, result){
    if (err){
      res.json({message: err});  
    } else {
      response['fontSetting'] = formatFontSettingResponse(result);
      res.send(response);
    }
  });
};


exports.deleteFontSettingById = function(req, res) {
  FontSetting.findOneAndRemove({_id: req.params.id}, 
  function (err, result) {
    var response = {};
    if (err) { 
      res.json({message: err});
    } else {
      res.status(200).send({});
    }
  });
};

exports.postFontSetting = function(req, res) {
  var creationHash = req.body.fontSetting;

  FontSetting.create(creationHash, 
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['fontSetting'] = formatFontSettingResponse(result);
      res.send(response);
    } 
  });
};

exports.putFontSetting = function(req, res) {
  FontSetting.findOneAndUpdate({_id: req.params.id}, {$set: req.body.fontSetting},
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['fontSetting'] = formatFontSettingResponse(result);
      res.send(response);
    }
  });
};
