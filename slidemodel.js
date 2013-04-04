var mongoose = require('mongoose');

var Slides = new mongoose.Schema({
  number: Number,
  name: String,
  templateName: String 
});

var Slide = mongoose.model('Slide', Slides);

module.exports = {'Slide':Slide};
