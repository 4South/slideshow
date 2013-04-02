App.SlideThumbnailView = Em.View.extend({
  attributeBindings: ['style'],
  classNameBindings: ['highlighted'],
  classNames: ['slides-thumbnail'],
  highlighted: false,
  height: 40,
  mouseEnter: function(event) {
    return this.set("highlighted", true);
  },
  mouseLeave: function(event) {
    return this.set("highlighted", false);
  },
  click: function(event) {
    return this.get('controller').transitionToRoute("slide", this.get('slide'));
  },
  style: (function() {
    return "height:" + (this.get('height')) + "px; width: 100%;";
  }).property('height', 'width')
});
