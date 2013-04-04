App.SlideView = Em.View.extend({
  layoutName: 'slideframe',
  templateName: (function() {
    return 'slides/' + this.get('content.templateName');
  }).property()
});
