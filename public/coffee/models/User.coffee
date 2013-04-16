App.User = DS.Model.extend
  name: DS.attr('string')
  email: DS.attr('string')
  password: DS.attr('string')
  slideshows: DS.hasMany('App.Slideshow')
  