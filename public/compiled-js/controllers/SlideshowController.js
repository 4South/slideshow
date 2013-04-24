App.SlideshowController = Em.ObjectController.extend({
  needs: ['slides', 'user'],
  editingMode: false,
  userIsAuthor: (function() {
    var author, user;

    author = this.get('content.author');
    user = this.get('controllers.user.content.username');
    if (author === user) {
      return true;
    } else {
      return false;
    }
  }).property('content.author', 'controllers.user.content.@each'),
  goToEditing: function() {
    var author;

    if (this.get('userIsAuthor')) {
      return this.set('editingMode', true);
    } else {
      author = this.get('content.author');
      return alert('This slideshow may only be edited by: ' + author);
    }
  },
  exitEditing: function() {
    return this.set('editingMode', false);
  },
  showSlides: function() {
    return this.transitionToRoute("slides");
  }
});
