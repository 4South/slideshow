var formatDbResponse = require('./../utils/crudutils.js').formatDbResponse
  , User = require('./../models/models.js').User;

exports.postlogin = function(req, res) {
  res.json( { id: req.user.id, username: req.user.username});
};

//attempts to log a "new page" in using their cookie
exports.getsessionlogin = function(req, res) {
  res.json( { id: req.user.id, username: req.user.username });
},

//defers to passport.authenticate on success for session token
exports.postcreate = function(req, res, next) {
  User.findOne({username: req.body.username},
  function(err, user) {
    var data = {};
    if (err) {
      res.json({message: err});
    } 
    if (user) {
      console.log('User already exists!');
      res.status(400).send('User already exists');
    } else {
    //TODO: check for valid user
      data.username = req.body.username;
      data.password = req.body.password;
      data.email = req.body.email;
      User.create(data,
      function(err, user) {
        if (err) {
          res.json({message: err});
        }
        console.log(user, 'created!');
        //Here we do not return the user right away because we first
        //pipe this into the auth system to return a valid ses-cookie 
        //res.json(formatDbResponse(user)); 
        delete req.body.email;
        next();
      }); 
    }
  });
};

exports.putUser = function(req, res) {
  User.findOneAndUpdate({_id: req.params.id}, {$set: req.body.user},
  function (err, result) {
    var response = {};
    if (err) {
      res.json({message: err});
    } else {
      response['user'] = formatDbResponse(result);
      res.send(response);
    }
  });
};

exports.getlogout = function(req, res) {
  req.logout();
  res.json( {responseText: 'succesful logout'} );
};
