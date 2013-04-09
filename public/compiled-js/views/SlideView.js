App.SlideView = Em.View.extend({
  layoutName: 'slideframe',
  classNames: ['slideList'],
  init: function() {
    var name;

    this._super();
    name = "slides/" + this.get('content.name');
    if (Ember.TEMPLATES[name]) {
      return this.set('templateName', name);
    } else {
      return this.set('template', Ember.Handlebars.compile('<h1 style="color:red;">whatev</h1>'));
    }
  }
});
