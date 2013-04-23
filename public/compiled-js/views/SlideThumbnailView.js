App.SlideThumbnailView = Em.View.extend({
  templateName: 'slidethumbnail',
  tagName: 'li',
  attributeBindings: ['style'],
  classNameBindings: ['highlighted'],
  classNames: ['slides-thumbnail'],
  highlighted: (function() {
    if (this.get('content.id') === this.get('controller.activeSlide.id')) {
      return true;
    } else {
      return false;
    }
  }).property('controller.activeSlide').cacheable()
});
