App.Theme = DS.Model.extend({
  name: DS.attr('string'),
  h1: DS.belongsTo('App.Fontsetting'),
  h2: DS.belongsTo('App.Fontsetting'),
  h3: DS.belongsTo('App.Fontsetting'),
  h4: DS.belongsTo('App.Fontsetting'),
  h5: DS.belongsTo('App.Fontsetting'),
  h6: DS.belongsTo('App.Fontsetting'),
  p: DS.belongsTo('App.Fontsetting'),
  li: DS.belongsTo('App.Fontsetting'),
  div: DS.belongsTo('App.Fontsetting'),
  section: DS.belongsTo('App.Fontsetting'),
  pre: DS.belongsTo('App.Fontsetting'),
  span: DS.belongsTo('App.Fontsetting')
});
