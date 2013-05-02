require('controllers/SlidethumbnailsManager.js');

App.SlidethumbnailsView = Em.View.extend({
  tagName: 'div',
  templateName: 'slidethumbnails',
  classNames: ['slidethumbnailsviewport'],
  thumbnailWrapperWidth: 160,
  thumbnailWidth: (function() {
    return this.get('thumbnailWrapperWidth') * .9;
  }).property('thumbnailWrapperWidth'),
  portStyle: (function() {
    var thumbnailCount;

    thumbnailCount = this.get('controller.filteredContent.length');
    return "width: " + (thumbnailCount * this.get('thumbnailWrapperWidth')) + "px;";
  }).property('controller.filteredContent', 'thumbnailWrapperWidth'),
  dragSlide: null,
  dragStartOffset: null,
  draggingThumbnail: null,
  init: function() {
    var controller, view;

    this._super();
    controller = this.get('container').lookup('controller:slidethumbnails');
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
        return this.get('dndManager').send("mouseMove", slide, event, view);
      }
    },
    mouseLeave: function(event, view) {
      event.preventDefault();
      event.stopPropagation();
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
  recordStartOffset: function(slide, xpos) {
    return this.set("dragStartOffset", xpos);
  },
  configureCursorImage: function(viewEl) {
    var clone, image;

    clone = viewEl.clone();
    image = clone.find('.slidethumbnail');
    image.removeClass('btn-warning');
    image.addClass('btn-primary');
    return image;
  },
  startDrag: function(slide, view) {
    this.set("dragSlide", slide);
    slide.set("isDragging", true);
    this.draggingThumbnail = this.configureCursorImage(view.$());
    return this.draggingThumbnail.appendTo('body');
  },
  endDrag: function(dragSlide) {
    dragSlide.set("isDragging", false);
    this.setProperties({
      dragSlide: null,
      dragStartOffset: null
    });
    this.draggingThumbnail.remove();
    return this.get('controller.store').commit();
  },
  updateDraggingThumbnail: function(cursorX, cursorY) {
    return this.draggingThumbnail.css({
      position: 'absolute',
      left: cursorX,
      top: cursorY
    });
  }
});
