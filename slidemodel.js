var mongoose = require('mongoose');

var Slides = new mongoose.Schema({
  name: String,
  position: Number,
  title: String,
  content: String
});

var Slide = mongoose.model('Slide', Slides);

module.exports = {'Slide':Slide};
