App.Slideshow = DS.Model.extend
  title: DS.attr('string')
  user: DS.belongsTo('App.User')
  slides: DS.hasMany('App.Slide')
