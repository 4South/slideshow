App.SlideTextField = Em.TextField.extend({
  keyUp: function(e) {
    return e.stopPropagation();
  },
  keyDown: function(e) {
    return e.stopPropagation();
  },
  keyPress: function(e) {
    return e.stopPropagation();
  }
});

App.SlideTextArea = Em.TextArea.extend({
  keyUp: function(e) {
    return e.stopPropagation();
  },
  keyDown: function(e) {
    return e.stopPropagation();
  },
  keyPress: function(e) {
    return e.stopPropagation();
  }
});
