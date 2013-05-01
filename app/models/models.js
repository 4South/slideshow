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
  description: String,
  _user: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

var SlideSchema = new mongoose.Schema({
  name: String,
  position: Number,
  title: String,
  _slideshow: [{type: Schema.Types.ObjectId, ref: 'Slideshow'}],
  content: String,  
});

var User = mongoose.model('User', UserSchema);
var Slideshow = mongoose.model('Slideshow', SlideshowSchema);
var Slide = mongoose.model('Slide', SlideSchema);

module.exports = {'Slide':Slide,
                  'Slideshow':Slideshow,
                  'User': User};
