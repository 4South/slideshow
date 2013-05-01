App.SlideSettings = DS.Model.extend({
  header: DS.belongsTo('App.FontSettings'),
  content: DS.belongsTo('App.FontSettings'),
  background: DS.attr('string'),
  logoIsVisible: DS.attr('boolean')
});
