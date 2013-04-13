App.SlideShow = DS.Model.extend
  title: DS.attr('string')
  username: DS.belongsTo('App.User')
  
  