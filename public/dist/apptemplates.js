Ember.TEMPLATES["_editableslide"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("content.title")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\r\n");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("content.content")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n<button class=\"save btn btn-success\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save</button>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["_loggedin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div id = \"login\" style = \"margin-top: 8px;\">\r\n  <span>User: ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.userCon.content.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" &nbsp; Status: Logged In</span>\r\n  <button class = \"btn-mini btn-warning\"\r\n          ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> Logout </button>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<span><div id = \"login\">Username: </div>\r\n\r\n</span>\r\n\r\n  ");
  hashTypes = {'valueBinding': "STRING",'maxlength': "STRING",'placeholder': "STRING",'classNames': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'valueBinding': ("controller.userName"),
    'maxlength': ("10"),
    'placeholder': ("User"),
    'classNames': ("loginfield")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n<span><div id = \"login\">Password: </div>\r\n\r\n  ");
  hashTypes = {'valueBinding': "STRING",'maxlength': "STRING",'placeholder': "STRING",'classNames': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'valueBinding': ("controller.userPassword"),
    'maxlength': ("10"),
    'placeholder': ("Password"),
    'classNames': ("loginfield")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("    \r\n\r\n<button class=\"btn-mini btn-warning\"");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{
    'target': ("controller")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n\r\nLogin \r\n</button>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["_presentationslide"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("\r\n<h1>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\r\n\r\n");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.markdown),stack1 ? stack1.call(depth0, "view.content.content", options) : helperMissing.call(depth0, "markdown", "view.content.content", options))));
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["_slidecreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<button class=\"btn-small btn-warning\"");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "exitEditing", {hash:{
    'target': ("controllers.application")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n  Exit Editing Mode\r\n</button>\r\n\r\n<hr>\r\n\r\n<form id = \"slidecreate\">\r\n  <fieldset>\r\n    <legend class = \"formlabel\">Create New</legend>\r\n    <label id = \"subtitle\">New Slide Title</label>\r\n    \r\n    ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("newSlideName")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("      \r\n  </fieldset>\r\n  \r\n  <button class=\"btn-small btn-primary\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "create", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> Create\r\n  </button>\r\n\r\n  </form>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["_slideedit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<form id = \"slidecreate\">\r\n  <fieldset>\r\n    <legend class = \"formlabel\">Edit Slide </legend>\r\n    <label id = \"subtitle\"> Slide Header </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("controllers.slide.content.title")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    <label id = \"subtitle\"> Slide Content </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextArea", {hash:{
    'valueBinding': ("controllers.slide.content.content")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    \r\n    <div id = \"savedStatus\"> ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.savedStatus", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </div>\r\n\r\n    <button class = \"btn-small btn-warning\" ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'target': ("controllers.slide")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> \r\n      Save \r\n    </button>\r\n    \r\n  </fieldset>\r\n</form>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["_slideshowcreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<form id = \"slideshowcreate\">\r\n  <fieldset>\r\n    <legend class = \"formlabel\">Create New Slideshow</legend>\r\n    <label id = \"subtitle\">New Slideshow Title</label>\r\n    \r\n    ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("controller.newName")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n    <br>\r\n   <button class = \"btn-warning btn-mini\"\r\n           ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createSlideshow", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n           Create\r\n           </button>  </fieldset>\r\n  </form>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["_usercreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section id = \"usercreate\">\r\n  <form id = \"usercreate\">\r\n    <fieldset>\r\n      <legend class = \"formlabel\">Create User </legend>\r\n      <label id = \"subtitle\"> User Name: </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("controllers.user.formUsername")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n      \r\n      <label id = \"subtitle\"> Password: </label><br>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("controllers.user.formPassword")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    \r\n      <label id = \"subtitle\"> Email Address </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("controllers.user.formEmail")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n     \r\n    <br>\r\n    <button class = \"btn-small btn-warning\"\r\n                  ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "create", {hash:{
    'target': ("controllers.user")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    >Create</button>\r\n    \r\n    </fieldset>\r\n  </form>\r\n</section> ");
  return buffer;
  
});

Ember.TEMPLATES["_userlogin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section id = \"userlogin\">\r\n  <form id = \"userlogin\">\r\n    <fieldset>\r\n      <legend class = \"formlabel\"> Login </legend>\r\n      <label id = \"subtitle\"> User Name: </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("controllers.user.loginUser")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n      \r\n      <label id = \"subtitle\"> Password: </label>\r\n      ");
  hashTypes = {'type': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'type': ("password"),
    'valueBinding': ("controllers.user.loginPassword")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    <br>\r\n    <button class = \"btn-small btn-warning\"\r\n                  ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{
    'target': ("controllers.user")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    >Login</button>\r\n    \r\n    </fieldset>\r\n  </form>\r\n</section> ");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "render", "user", options))));
  data.buffer.push("\r\n\r\n<aside class=\"leftbar\">\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "slidethumbnails", options) : helperMissing.call(depth0, "outlet", "slidethumbnails", options))));
  data.buffer.push("\r\n</aside>\r\n\r\n<section class=\"slides\">\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "slides", options) : helperMissing.call(depth0, "outlet", "slides", options))));
  data.buffer.push("\r\n</section>\r\n\r\n<aside class = \"rightbar\">\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "rightbar", options) : helperMissing.call(depth0, "outlet", "rightbar", options))));
  data.buffer.push("\r\n</aside>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["blank"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["blank_controls"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push(" \r\n        <button class = \"btn btn-warning\">\r\n          View Slideshows\r\n        </button>\r\n      ");
  }

  data.buffer.push("<section id = \"splashpage\">\r\n    <h1>4-South Ember Slideshows</h1>\r\n    \r\n      ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "slideshows", options) : helperMissing.call(depth0, "linkTo", "slideshows", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n    <hr>\r\n    <h4> \r\n      Login or create a user account to edit a Slideshow\r\n    </h4>\r\n    <div class = \"row-fluid\" id = \"loginOptions\">\r\n      <div class = \"span6 offset1\">\r\n        ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "usercreate", options) : helperMissing.call(depth0, "partial", "usercreate", options))));
  data.buffer.push("\r\n      </div>\r\n      <div class = \"span5\">\r\n        ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "userlogin", options) : helperMissing.call(depth0, "partial", "userlogin", options))));
  data.buffer.push("\r\n      </div>\r\n    </div>\r\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["maincontrols"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n    <button class=\"btn-small btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startShow", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n      Play\r\n    </button>\r\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n    <p class=\"lead\">No Slides</p>\r\n  ");
  }

  data.buffer.push("<div class=\"controls\">\r\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "controller.atleastOneSlide", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["rightbar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(" <button class = 'btn-warning btn-small'> Slideshows </button>\r\n");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\r\n  ");
  hashTypes = {};
  stack1 = helpers.unless.call(depth0, "controller.controllers.slideshow.editingMode", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "controller.controllers.slideshow.editingMode", {hash:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n    <br>\r\n    <button ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToEditing", {hash:{
    'target': ("controllers.application")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n              class = \"btn-small btn-warning\">\r\n    Edit Slides </button>\r\n  ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\r\n    <br>\r\n    ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "slidecreate", options) : helperMissing.call(depth0, "partial", "slidecreate", options))));
  data.buffer.push("  \r\n    ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "slideedit", options) : helperMissing.call(depth0, "partial", "slideedit", options))));
  data.buffer.push("\r\n  ");
  return buffer;
  }

  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "slideshows", options) : helperMissing.call(depth0, "linkTo", "slideshows", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("  \r\n\r\n<hr>\r\n\r\n<span id = \"subtitle\"> \r\n  Slideshow Title: ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.controllers.slideshow.content.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n</span>\r\n\r\n\r\n");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "controller.controllers.user.loggedIn", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  return buffer;
  
});

Ember.TEMPLATES["showcontrols"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"showcontrols\">\r\n  <button class=\"btn-small btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "pauseShow", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n    Pause\r\n  </button>\r\n  <button class=\"btn-small btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "back", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n    Back\r\n  </button>\r\n  <button class=\"btn-small btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "forward", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n    Forward\r\n  </button>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slidedetail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "presentationslide", options) : helperMissing.call(depth0, "partial", "presentationslide", options))));
  data.buffer.push("\r\n");
  return buffer;
  }

  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, {hash:{
    'contentBinding': ("controller.content")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slides"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\r\n  <div class = \"slide\">\r\n    ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, {hash:{
    'contentBinding': ("slide")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n  </div>\r\n  \r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\r\n      ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "presentationslide", options) : helperMissing.call(depth0, "partial", "presentationslide", options))));
  data.buffer.push("\r\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\r\n  \r\n  <div class=\"emptyslidesview\"><h1>No Slides</h1></div>\r\n\r\n");
  }

  data.buffer.push("\r\n");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "slide", "in", "arrangedContent", {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slideshow"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push(" \r\n<button class = 'btn btn-warning'> View Slides </button>\r\n\r\n");
  }

  data.buffer.push("<section id = \"splashpage\">\r\n\r\n<h1> Slideshow Title: ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </h1>\r\n\r\n");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "slides", options) : helperMissing.call(depth0, "linkTo", "slides", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["slideshows"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n            <div class = \"span2\">\r\n            ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "slideshow", "show", options) : helperMissing.call(depth0, "linkTo", "slideshow", "show", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </div>    \r\n          ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n              <section id = \"showthumbnails\">\r\n                Title: <br> ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "show.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \r\n              </section>  \r\n            ");
  return buffer;
  }

  data.buffer.push("<section id = 'splashpage'>\r\n\r\n      <h3> Welcome ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.controllers.user.content.username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </h3>\r\n      <h5> Choose a Slideshow </h5>\r\n        <div class = \"row-fluid\" id = \"slideshowlist\">\r\n          ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "show", "in", "controller.content", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n      <hr>\r\n           ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "slideshowcreate", options) : helperMissing.call(depth0, "partial", "slideshowcreate", options))));
  data.buffer.push("\r\n \r\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["slidethumbnail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n    <button class=\"btn-mini btn-danger\"\r\n              ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "delete", "view.content", {hash:{
    'target': ("controllers.slidethumbnails")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n      X\r\n    </button>\r\n    <button class=\"btn-mini btn\"\r\n         ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "moveUp", "view.content", {hash:{
    'target': ("controllers.slidethumbnails")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">   \r\n      UP \r\n    </button>\r\n    <button class=\"btn-mini btn\"\r\n        ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "moveDown", "view.content", {hash:{
    'target': ("controllers.slidethumbnails")
  },contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n      DN \r\n    </button>\r\n  ");
  return buffer;
  }

  data.buffer.push("<div id = \"btnWrapper\">\r\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "controller.controllers.slideshow.editingMode", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n\r\n<span class = \"nameWrapper\">\r\n  <p ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickThumbnail", "view.content", {hash:{},contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n  </p>\r\n</span>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slidethumbnails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n    ");
  hashTypes = {'contentBinding': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideThumbnailView", {hash:{
    'contentBinding': ("slide")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n");
  return buffer;
  }

  data.buffer.push("<ul style = \"height:inherit;\">\r\n");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "slide", "in", "controller.arrangedContent", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</ul>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["user"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, stack2, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n  <ul class = \"nav pull-right\">\r\n    <li> <p id = \"navlabel\"> You logged in as ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </p> </li>\r\n\r\n    <li style = 'padding-top:4px;margin-left:5px;'>\r\n      <button class=\"btn-mini btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">logout</button> \r\n    </li>\r\n  </ul>\r\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n    <ul class = \"nav pull-right\">\r\n      <li> <p id = \"navlabel\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errorMessage", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p> </li>\r\n      <li> <p id = \"navlabel\">username</p> </li>\r\n      \r\n      <li>\r\n        <form class=\"navbar-form\">\r\n          ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("loginUser")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \r\n        </form>\r\n      </li>\r\n\r\n      <li> <p id = \"navlabel\">password</p> </li>\r\n      \r\n      <li>\r\n        <form class=\"navbar-form\">\r\n          ");
  hashTypes = {'type': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'type': ("password"),
    'valueBinding': ("loginPassword")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \r\n        </form>\r\n      </li>\r\n      \r\n      <li style = 'padding-top:4px;margin-left:5px;'>\r\n        <button class=\"btn-mini btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">login</button>\r\n      </li>      \r\n      \r\n      <li style = 'padding-top:4px;margin-left:5px;'>\r\n        <button class=\"btn-mini btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "home", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Home</button>\r\n      </li>\r\n      \r\n\r\n    </ul>\r\n  ");
  return buffer;
  }

  data.buffer.push("<div class=\"navbar-inner\">\r\n  <ul class = \"nav\">\r\n    <li> ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "controls", options) : helperMissing.call(depth0, "outlet", "controls", options))));
  data.buffer.push(" </li>\r\n  </ul>\r\n\r\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "loggedIn", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n\r\n</div>\r\n\r\n\r\n\r\n");
  return buffer;
  
});