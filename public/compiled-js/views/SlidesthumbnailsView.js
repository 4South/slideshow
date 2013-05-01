require('controllers/SlidethumbnailsManager.js');

App.SlidethumbnailsView = Em.View.extend({
  tagName: 'div',
  classNames: ['slidethumbnailsviewport'],
  init: function() {
    var controller, view;

    this._super();
    controller = this.get('controller');
    view = this;
    this.set("dndManager", App.DnDManager.create({
      controller: controller,
      view: view
    }));
    return this.get('eventManager').reopen({
      parentView: this,
      dndManager: this.dndManager
    });
  },
  eventManager: Ember.Object.create({
    mouseMove: function(event, view) {
      var slide;

      if (view !== this) {
        slide = view.get('content');
        return this.get('dndManager').send("mouseMove", slide, event.offsetX);
      }
    },
    mouseLeave: function(event, view) {
      event.preventDefault();
      if (view === this.get('parentView')) {
        return this.get('dndManager').send("mouseLeft");
      }
    },
    mouseUp: function(event, view) {
      var slide;

      event.preventDefault();
      event.stopPropagation();
      slide = view.get('content');
      return this.get('dndManager').send("mouseUp", slide, event.offsetX);
    },
    mouseDown: function(event, view) {
      var slide;

      event.preventDefault();
      event.stopPropagation();
      if (view !== this.get('parentView')) {
        slide = view.get('content');
        return this.get('dndManager').send("mouseDown", slide, event.offsetX);
      }
    }
  }),
  viewportWidth: (function() {
    var thumbnailCount;

    thumbnailCount = this.get('controller.filteredContent.length');
    return "width: " + (thumbnailCount * this.get('controller.thumbnailWrapperWidth')) + "px;";
  }).property('controller.filteredContent', 'controller.thumbnailWrapperWidth')
});
