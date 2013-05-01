var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

//User model used by mongoose
var UserSchema = new mongoose.Schema({

  username: { type: String,
              required: true,
              index: { unique: true } },
  password: { type: String,
              require: true },
  email: { type: String,
           require: true,
           unique: true }
}); 

UserSchema.pre('save', function(next) {
  var user = this;

  //only perform hash op if password is new or changed
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, 
  function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, 
                salt, 
    function(err, hash) {
      if (err) return next(err);
      //if no error, set the password to the hash value
      user.password = hash;
      next();
    });
  });
});

var SlideshowSchema = new mongoose.Schema({
  title: String,
  author: String,
  _user: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

var SlideSchema = new mongoose.Schema({
  name: String,
  position: Number,
  title: String,
  _slideshow: [{type: Schema.Types.ObjectId, ref: 'Slideshow'}],
  _theme: [{type: Schema.Types.ObjectId, ref: 'Theme'}],
  content: String,  
});

var FontSettingSchema = new mongoose.Schema({
  size:       Number,
  font:       String,
  color:      String,
  alignment:  String,
});

var ThemeSchema = new mongoose.Schema({
  _h1:      [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _h2:      [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _h3:      [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _h4:      [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _h5:      [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _h6:      [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _p:       [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _pre:     [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _li:      [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _span:    [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _div:     [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
  _section: [{type: Schema.Types.ObjectId, ref: 'FontSetting'}],
});

var User = mongoose.model('User', UserSchema);
var Slideshow = mongoose.model('Slideshow', SlideshowSchema);
var Slide = mongoose.model('Slide', SlideSchema);
var Theme = mongoose.model('Theme', ThemeSchema);
var FontSetting = mongoose.model('FontSetting', FontSettingSchema);

module.exports = {'Slide':Slide,
                  'Slideshow':Slideshow,
                  'User': User,
                  'FontSetting': FontSetting,
                  'Theme': Theme     };
