App.SlideshowController = Em.ObjectController.extend({
  needs: ['slides', 'user'],
  editingMode: false,
  userIsAuthor: (function() {
    var author, user;

    author = this.get('author');
    user = this.get('controllers.user.content.username');
    if (author === user) {
      return true;
    } else {
      return false;
    }
  }).property('content.author', 'controllers.user.content.@each'),
  goToEditing: function() {
    if (this.get('userIsAuthor')) {
      return this.set('editingMode', true);
    } else {
      return console.log('This slideshow may only be edited by: ', this.get('author'));
    }
  },
  exitEditing: function() {
    return this.set('editingMode', false);
  }
});
