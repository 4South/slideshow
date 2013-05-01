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

Ember.TEMPLATES["_footer"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<footer class=\"sitefooter\">\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "controls", options) : helperMissing.call(depth0, "outlet", "controls", options))));
  data.buffer.push("\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "slidethumbnails", options) : helperMissing.call(depth0, "outlet", "slidethumbnails", options))));
  data.buffer.push("\r\n</footer>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["_header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"navbar navbar-inverse navbar-fixed-top\">\r\n  <div class=\"navbar-inner\">\r\n    <ul class = \"nav\">\r\n      <li class=\"controls\"> \r\n        <button class=\"btn-small btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "transitionToSlideshows", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n        Slideshows\r\n        </button> \r\n      </li>\r\n    </ul>\r\n    ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render),stack1 ? stack1.call(depth0, "user", options) : helperMissing.call(depth0, "render", "user", options))));
  data.buffer.push("\r\n  </div>\r\n</div>\r\n");
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


  data.buffer.push("<h1>");
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


  data.buffer.push("<form id = \"slidecreate\">\r\n  <fieldset>\r\n    <label id = \"subtitle\">New Slide Title</label>\r\n    \r\n    ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("newSlideName")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("      \r\n  </fieldset>\r\n  \r\n  <button class=\"btn-small btn-primary\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createSlide", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> Create\r\n  </button>\r\n</form>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["_slideedit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<form id = \"slidecreate\">\r\n  <fieldset>\r\n    <label id = \"subtitle\">Name</label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("controllers.slide.content.name")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    <label id = \"subtitle\">Header</label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("controllers.slide.content.title")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    <label id = \"subtitle\">Content</label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextArea", {hash:{
    'valueBinding': ("controllers.slide.content.content")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    \r\n    <div id = \"savedStatus\"> ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.savedStatus", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </div>\r\n    <button class = \"btn-small btn-warning\" ");
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

Ember.TEMPLATES["_usereditform"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<form id = \"usereditform\">\r\n  <fieldset>\r\n    <legend class = \"formlabel\">Edit User </legend>\r\n    <label id = \"subtitle\"> Username </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("username")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    \r\n    <div id = \"savedStatus\"> ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.savedStatus", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </div>\r\n\r\n    <button class = \"btn-small btn-warning\" ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveUserInfo", {hash:{
    'target': ("controller")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n      Save \r\n    </button>\r\n    \r\n  </fieldset>\r\n</form>\r\n");
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
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "header", options) : helperMissing.call(depth0, "partial", "header", options))));
  data.buffer.push("\r\n\r\n<section class=\"mainoutlet\">\r\n  ");
  hashTypes = {'name': "STRING"};
  options = {hash:{
    'name': ("main")
  },contexts:[],types:[],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.animatedOutlet),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "animatedOutlet", options))));
  data.buffer.push("\r\n</section>\r\n\r\n<aside class = \"rightbar\">\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "rightbar", options) : helperMissing.call(depth0, "outlet", "rightbar", options))));
  data.buffer.push("\r\n</aside>\r\n\r\n");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "footer", options) : helperMissing.call(depth0, "partial", "footer", options))));
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["blankcontrols"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("\r\n");
  
});

Ember.TEMPLATES["blankmain"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["blankrightbar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["blankthumbnails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["maincontrols"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n  <button class=\"btn-small btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startShow", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n    <i class=\"icon-play\"></i>\r\n  </button>\r\n");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "controller.atleastOneSlide", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["rightbar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "slidecreate", options) : helperMissing.call(depth0, "partial", "slidecreate", options))));
  data.buffer.push("  \r\n  ");
  hashTypes = {};
  stack2 = helpers['if'].call(depth0, "activeSlide", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\r\n    ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "slideedit", options) : helperMissing.call(depth0, "partial", "slideedit", options))));
  data.buffer.push("\r\n  ");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "controller.controllers.user.permittedAndEditing", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["showcontrols"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<button class=\"btn-small btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "pauseShow", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n  <i class=\"icon-pause\"></i> \r\n</button>\r\n<button class=\"btn-small btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "back", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n  <i class=\"icon-backward\"></i>\r\n</button>\r\n<button class=\"btn-small btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "forward", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n  <i class=\"icon-forward\"></i>\r\n</button>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slidedetail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<h1>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\r\n\r\n");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.markdown),stack1 ? stack1.call(depth0, "view.content.content", options) : helperMissing.call(depth0, "markdown", "view.content.content", options))));
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slides"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\r\n  <section class = \"presentationslide\">\r\n    ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, {hash:{
    'contentBinding': ("slide")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n  </section>\r\n");
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
  
  
  data.buffer.push("\r\n  <section class=\"emptyslidesview\"><h1>No Slides</h1></section>\r\n");
  }

  hashTypes = {};
  stack1 = helpers.each.call(depth0, "slide", "in", "filteredContent", {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slideshow"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n    \r\n    <form id = \"editslideshow\">\r\n      <fieldset>\r\n        <label id = \"subtitle\"> Edit Title </label>\r\n        ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("content.title")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n      \r\n        <label id = \"subtitle\"> Edit Description: </label>\r\n        ");
  hashTypes = {'class': "STRING",'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextArea", {hash:{
    'class': ("slideshowText"),
    'valueBinding': ("content.description")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n      \r\n      \r\n        <section id = \"slideshowButtons\">\r\n          <div id = \"savedStatus\"> ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.savedStatus", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </div>\r\n          <button ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveSlideshowTitle", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class = \"btn-small btn-warning\">\r\n            Save\r\n          </button>  \r\n          <button ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteSlideshow", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" class = \"btn-small btn-danger\">\r\n            Delete Show\r\n          </button>\r\n        </section>\r\n      </fieldset>\r\n    </form>\r\n  \r\n");
  return buffer;
  }

  data.buffer.push("  <h1> ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </h1>\r\n  <section id = \"slideshowDescription\">\r\n    <h4>  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "content.description", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </h4>\r\n    <button class=\"btn-warning btn-small\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "showSlides", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n      Show Slides\r\n    </button><br>\r\n  </section>\r\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "controllers.user.editingMode", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slideshows"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\r\n        <div class=\"span2\">\r\n        ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "slideshow", "show", options) : helperMissing.call(depth0, "linkTo", "slideshow", "show", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n        </div>    \r\n      ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n          <section id=\"showthumbnails\">\r\n           <p id = \"showtitle\"> ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "show.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </p>\r\n            Author: &nbsp; ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "show.author", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n          </section>  \r\n        ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\r\n    ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "slideshowcreate", options) : helperMissing.call(depth0, "partial", "slideshowcreate", options))));
  data.buffer.push("\r\n  ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("  \r\n    <h3> Please login to create a slideshow </h3>\r\n  ");
  }

  data.buffer.push("<section id = \"slideshowViewList\">\r\n  <h5> Choose a Slideshow to view</h5>\r\n    <section class = \"row\" id = \"slideshowlist\">\r\n      ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "show", "in", "controller.content", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </section>\r\n</section>\r\n\r\n<section id = \"slideshowCreation\"\r\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "controllers.user.loggedIn", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["slidethumbnail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"slidethumbnail btn btn-warning\" ");
  hashTypes = {'style': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'style': ("view.innerStyle")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "slide.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
<<<<<<< HEAD
  data.buffer.push("\n</div>\n");
=======
  data.buffer.push("\r\n");
>>>>>>> 81879a0bebb90ce296970254829c162b351f7fba
  return buffer;
  
});

Ember.TEMPLATES["slidethumbnails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n    ");
  hashTypes = {'contentBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideThumbnailView", {hash:{
    'contentBinding': ("slide")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n  ");
  return buffer;
  }

  data.buffer.push("<section id = \"scrollbarWrapper\">\r\n  <ul id=\"slidethumbnails\" ");
  hashTypes = {'style': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'style': ("view.viewportWidth")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n  ");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "slide", "in", "controller.filteredContent", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n  </ul>\r\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["user"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\r\n  <li class=\"controls\"> \r\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "editingMode", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n  </li>\r\n  <li><p id=\"navlabel\">Welcome, ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p></li>\r\n\r\n  <li class=\"controls\">\r\n    <button class=\"btn-mini btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "logout", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">logout</button> \r\n  </li>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n      <button class=\"btn-mini btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "exitEditing", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "editingButtonText", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n      </button>\r\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n      <button class=\"btn-mini btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "enterEditingMode", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n        ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "editingButtonText", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n      </button>\r\n    ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\r\n  <li> <p id = \"navlabel\">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "errorMessage", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</p> </li>\r\n  <li> <p id = \"navlabel\">username</p> </li>\r\n  \r\n  <li class = \"headerTextfield\">\r\n    <form class=\"navbar-form\" data-ajax=\"false\">\r\n      ");
  hashTypes = {'type': "ID",'value': "ID",'maxlength': "INTEGER",'size': "INTEGER"};
  options = {hash:{
    'type': ("text"),
    'value': ("loginUser"),
    'maxlength': (10),
    'size': (8)
  },contexts:[],types:[],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" \r\n    </form>\r\n  </li>\r\n\r\n  <li> <p id = \"navlabel\">password</p> </li>\r\n  \r\n  <li class = \"headerTextfield\">\r\n    <form class=\"navbar-form\" data-ajax=\"false\">\r\n      ");
  hashTypes = {'type': "ID",'value': "ID",'maxlength': "INTEGER",'size': "INTEGER"};
  options = {hash:{
    'type': ("password"),
    'value': ("loginPassword"),
    'maxlength': (10),
    'size': (8)
  },contexts:[],types:[],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push(" \r\n    </form>\r\n  </li>\r\n  \r\n  <li class = \"controls\">\r\n    <button class=\"btn-mini btn-warning\" type = \"button\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Login</button>\r\n  </li>\r\n\r\n  <li class = \"controls\">\r\n    <button class=\"btn-mini btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createEditUser", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Create/Edit User</button>\r\n  </li>      \r\n");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "loggedIn", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});

Ember.TEMPLATES["userCreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section id = \"usercreate\">    \r\n  <legend class = \"formlabel\">Create User </legend>\r\n  <form id = \"usercreate\">\r\n    <fieldset>\r\n      <label id = \"subtitle\"> User Name: </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("formUsername")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    \r\n      <label id = \"subtitle\"> Password: </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("formPassword")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n  \r\n      <label id = \"subtitle\"> Email Address </label>\r\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideTextField", {hash:{
    'valueBinding': ("formEmail")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n \r\n\r\n      <br>\r\n      <button class = \"btn-small btn-warning\"\r\n                ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "create", {hash:{
    'target': ("controller")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n      >Create</button>    \r\n    \r\n    </fieldset>\r\n  </form>\r\n</section> ");
  return buffer;
  
});

Ember.TEMPLATES["userEdit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\r\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "usereditform", options) : helperMissing.call(depth0, "partial", "usereditform", options))));
  data.buffer.push("\r\n");
  return buffer;
  }

  data.buffer.push("<h4> Username: ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </h4>\r\n<button class = \"btn-mini btn-warning\"\r\n  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editUserInfo", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> Edit User Info </button>\r\n\r\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "userEditingMode", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("      \r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["userIndex"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n  <h3> Welcome ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </h3>\r\n  <button class = \"btn-small btn-warning\"\r\n          ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "viewEditUser", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n          View/Edit User Info\r\n  </button>\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\r\n  <h4> Please login to view and edit user info </h4>\r\n  <button class = \"btn-small btn-warning\"\r\n      ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "createNewUser", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n      Create User\r\n  </button>   \r\n");
  return buffer;
  }

  data.buffer.push("<h1> User Management </h1>\r\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "loggedIn", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  return buffer;
  
});