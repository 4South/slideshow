var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Slideshows = new mongoose.Schema({
  title: String,
  _user: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

var Slides = new mongoose.Schema({
  name: String,
  position: Number,
  title: String,
  _slideshow: [{type: Schema.Types.ObjectId, ref: 'Slideshow'}],
  content: String,  
});


var Slide = mongoose.model('Slide', Slides);
var Slideshow = mongoose.model('Slideshow', Slideshows);

module.exports = {'Slide':Slide,
                  'Slideshow':Slideshow};
