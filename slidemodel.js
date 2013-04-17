var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Slides = new mongoose.Schema({
  name: String,
  position: Number,
  title: String,
  content: String,
  _slideshow: [{type: Schema.Types.ObjectId, ref: 'Slideshow'}]
  
});

var Slideshows = new mongoose.Schema({
  title: String,
  _user: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

// var Users = new mongoose.Schema({
  // name: String,
  // email: String,
  // password: String,
// });


var Slide = mongoose.model('Slide', Slides);
//var User = mongoose.model('User', Users);
var Slideshow = mongoose.model('Slideshow', Slideshows);

module.exports = {'Slide':Slide,
                  //'User':User, 
                  'Slideshow':Slideshow};
