App.UserController = Ember.ObjectController.extend({
  needs: ['slideshow', 'slide'],
  content: '',
  formUsername: '',
  formPassword: '',
  formEmail: '',
  errorMessage: '',
  loginUser: '',
  loginPassword: '',
  userEditingMode: false,
  editingMode: false,
  editingButtonText: (function() {
    if (this.get('editingMode')) {
      return "goto viewing mode";
    } else {
      return "goto editing mode";
    }
  }).property('editingMode'),
  savedStatus: (function() {
    if (this.get('content.isDirty')) {
      return "Unsaved Changes";
    } else {
      return "All Changes Saved";
    }
  }).property('content.isDirty').cacheable(),
  loggedInUser: (function() {
    return this.get('content.username');
  }).property('content.username').cacheable(),
  permissionToEdit: (function() {
    var author, user;

    author = this.get('controllers.slideshow.content.author');
    user = this.get('username');
    if (author === user) {
      return true;
    } else {
      return false;
    }
  }).property('controllers.slideshow.content.author', 'username'),
  permittedAndEditing: (function() {
    if (this.get('permissionToEdit') && this.get('editingMode')) {
      return true;
    } else {
      return false;
    }
  }).property('permissionToEdit', 'editingMode'),
  enterEditingMode: function() {
    return this.set('editingMode', true);
  },
  exitEditing: function() {
    return this.set('editingMode', false);
  },
  createData: (function() {
    return {
      username: this.get('formUsername'),
      password: this.get('formPassword'),
      email: this.get('formEmail')
    };
  }).property('formUsername', 'formPassword', 'formEmail'),
  loginData: (function() {
    return {
      username: this.get('loginUser'),
      password: this.get('loginPassword')
    };
  }).property('loginUser', 'loginPassword'),
  loggedIn: (function() {
    if (this.get('content')) {
      return true;
    } else {
      return false;
    }
  }).property('content'),
  validNewUser: function() {
    if (this.get('formUsername') !== '' && this.get('formPassword') !== '' && this.get('formPassword') !== '') {
      return true;
    } else {
      return false;
    }
  },
  resetForm: function() {
    this.set('formUsername', '');
    this.set('formPassword', '');
    return this.set('formEmail', '');
  },
  editUserInfo: function() {
    return this.set('userEditingMode', true);
  },
  saveUserInfo: function() {
    this.get('store').commit();
    this.resetForm();
    return this.set('userEditingMode', false);
  },
  userAjax: function(url, type, hash) {
    this.set('errorMessage', '');
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    hash.contentType = 'application/json; charset=utf-8';
    hash.context = this;
    if (hash.data && type !== "GET") {
      hash.data = JSON.stringify(hash.data);
    }
    return Ember.$.ajax(hash);
  },
  create: function() {
    if (this.validNewUser() === true) {
      return this.userAjax('/user/create', 'POST', {
        data: this.get('createData'),
        success: function(data) {
          return Ember.run(this, function() {
            this.get('store').load(App.User, data);
            this.set('content', App.User.find(data.id));
            return this.transitionToRoute('user');
          });
        },
        error: function(xhr) {
          return Ember.run(this, function() {
            return this.set('errorMessage', 'account creation failed, try again');
          });
        },
        complete: function() {
          return Ember.run(this, function() {
            return this.resetForm();
          });
        }
      });
    } else {
      alert('Please fill out each field for User Creation');
      return this.resetForm();
    }
  },
  sessionLogin: function() {
    return this.userAjax('/user/sessionlogin', 'GET', {
      success: function(data) {
        return Ember.run(this, function() {
          this.get('store').load(App.User, data);
          return this.set('content', App.User.find(data.id));
        });
      },
      error: function(xhr) {},
      complete: function() {
        return Ember.run(this, function() {
          return this.resetForm();
        });
      }
    });
  },
  login: function() {
    return this.userAjax('/user/login', 'POST', {
      data: this.get('loginData'),
      success: function(data) {
        return Ember.run(this, function() {
          this.get('store').load(App.User, data);
          return this.set('content', App.User.find(data.id));
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          return this.set('errorMessage', 'login failed please try again');
        });
      },
      complete: function() {
        return Ember.run(this, function() {
          return this.resetForm();
        });
      }
    });
  },
  logout: function() {
    return this.userAjax('/user/logout', 'GET', {
      success: function(data) {
        return Ember.run(this, function() {
          this.get('store').unloadRecord(this.get('content'));
          this.set('content', null);
          return this.exitEditing();
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          return this.set('errorMessage', 'logout failed');
        });
      }
    });
  }
});
