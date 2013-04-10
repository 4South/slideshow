Ember.TEMPLATES["_editableslide"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("content.title")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("<br>\n");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
    'valueBinding': ("content.content")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n<button class=\"save btn btn-success\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Save</button>\n");
  return buffer;
  
});

Ember.TEMPLATES["_header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"navbar navbar-inverse\">\n  <div class=\"navbar-inner\">\n    \n    <ul class=\"nav\">  \n      <li>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "controls", options) : helperMissing.call(depth0, "outlet", "controls", options))));
  data.buffer.push("</li>\n    </ul>\n    \n    <ul class = \"nav pull-right\">\n      <li>");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "secretcode", options) : helperMissing.call(depth0, "partial", "secretcode", options))));
  data.buffer.push("</li>\n    </ul>\n    \n  </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["_presentationslide"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("\n<h1>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.title", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n\n");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.markdown),stack1 ? stack1.call(depth0, "view.content.content", options) : helperMissing.call(depth0, "markdown", "view.content.content", options))));
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["_secretcode"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<span><b style=\"color:#2e74ff\">Enter Cheatcode</b></span>\n");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("controller.cheatcode")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    \n<button class=\"btn-mini btn-warning\"");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "enterCheat", {hash:{
    'target': ("controller")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n\n<b style = \"float:right\"> CHEAT </b>\n</button>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["_slidecreate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<form id = \"slidecreate\">\n  <fieldset>\n    <legend class = \"formlabel\">Create New</legend>\n    <label>New Slide Title</label>\n    \n    ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("newSlideName")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("      \n  </fieldset>\n  \n  <button class=\"btn btn-primary\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "create", {hash:{},contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <b>create</b>\n  </button>\n  \n  <button class=\"btn btn-warning\"");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "abdicate", {hash:{
    'target': ("controllers.application")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    <b>abdicate</b>\n  </button>\n\n  </form>\n");
  return buffer;
  
});

Ember.TEMPLATES["_slideedit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<form id = \"slidecreate\">\n  <fieldset>\n    <legend class = \"formlabel\">Edit Slide </legend>\n    <label> Slide Title </label>\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextField", {hash:{
    'valueBinding': ("controllers.slide.content.title")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    <label> Slide Content </label>\n      ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Em.TextArea", {hash:{
    'valueBinding': ("controllers.slide.content.content")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    <button class = \"btn btn-success\" ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'target': ("controllers.slide")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("> \n      Save \n    </button>\n    \n    <div id = \"savedStatus\"> ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.savedStatus", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" </div>\n    \n  </fieldset>\n</form>");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "header", options) : helperMissing.call(depth0, "partial", "header", options))));
  data.buffer.push("\n\n<aside class=\"leftbar\">\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render),stack1 ? stack1.call(depth0, "slidethumbnails", options) : helperMissing.call(depth0, "render", "slidethumbnails", options))));
  data.buffer.push("\n</aside>\n\n<section class=\"slides\">\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "slides", options) : helperMissing.call(depth0, "outlet", "slides", options))));
  data.buffer.push("\n</section>\n\n<aside class = \"rightbar\">\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.outlet),stack1 ? stack1.call(depth0, "rightbar", options) : helperMissing.call(depth0, "outlet", "rightbar", options))));
  data.buffer.push("\n</aside>\n");
  return buffer;
  
});

Ember.TEMPLATES["maincontrols"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    <button class=\"btn btn-success\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startShow", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      Play\n    </button>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n    <p class=\"lead\">No Slides</p>\n  ");
  }

  data.buffer.push("<div class=\"controls\">\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "controller.atleastOneSlide", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["rightbar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "slidecreate", options) : helperMissing.call(depth0, "partial", "slidecreate", options))));
  data.buffer.push("  \n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "slideedit", options) : helperMissing.call(depth0, "partial", "slideedit", options))));
  data.buffer.push("\n");
  return buffer;
  }

  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "App.godMode", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["showcontrols"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"showcontrols\">\n  <button class=\"btn-small btn-warning\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "pauseShow", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    Pause\n  </button>\n  <button class=\"btn-small btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "back", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    Back\n  </button>\n  <button class=\"btn-small btn-primary\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "forward", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    Forward\n  </button>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["slidedetail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n  ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "presentationslide", options) : helperMissing.call(depth0, "partial", "presentationslide", options))));
  data.buffer.push("\n");
  return buffer;
  }

  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, {hash:{
    'contentBinding': ("controller.content")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["slides"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n  <div class = \"slide\">\n    ");
  hashTypes = {'contentBinding': "STRING"};
  stack1 = helpers.view.call(depth0, {hash:{
    'contentBinding': ("slide")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n  \n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, options;
  data.buffer.push("\n      ");
  hashTypes = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial),stack1 ? stack1.call(depth0, "presentationslide", options) : helperMissing.call(depth0, "partial", "presentationslide", options))));
  data.buffer.push("\n      <hr>\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n  \n  <div class=\"lead\">No Slides</div>\n\n");
  }

  hashTypes = {};
  stack1 = helpers.each.call(depth0, "slide", "in", "arrangedContent", {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["slidethumbnail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    <button class=\"btn-mini btn-danger\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "delete", "view.content", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      X\n    </button>\n    <button class=\"btn-mini btn-primary\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "moveUp", "view.content", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      UP \n    </button>\n    <button class=\"btn-mini btn-primary\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "moveDown", "view.content", {hash:{},contexts:[depth0,depth0],types:["STRING","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n      DN \n    </button>\n  ");
  return buffer;
  }

  data.buffer.push("<div id = \"btnWrapper\">\n  ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "App.godMode", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n<span class = \"nameWrapper\">\n  <p ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clickThumbnail", "view.content", {hash:{
    'target': ("controllers.slides")
  },contexts:[depth0,depth0],types:["ID","ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.content.name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </p>\n</span>\n");
  return buffer;
  
});

Ember.TEMPLATES["slidethumbnails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {'contentBinding': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.SlideThumbnailView", {hash:{
    'contentBinding': ("slide")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("<ul>\n");
  hashTypes = {};
  stack1 = helpers.each.call(depth0, "slide", "in", "controller.arrangedContent", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});