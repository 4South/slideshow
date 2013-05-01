App.Slide = DS.Model.extend
  name: DS.attr('string')
  position: DS.attr('number')
  title: DS.attr('string')
  content: DS.attr('string', {defaultValue: ""})
  active: DS.attr('boolean', {defaultValue: false})
  slideshow: DS.belongsTo('App.Slideshow')
  settings: DS.belongsTo('App.SlideSettings')