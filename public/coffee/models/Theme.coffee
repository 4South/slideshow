App.Theme = DS.Model.extend
  name:       DS.attr 'string'
  h1:         DS.belongsTo 'App.FontSetting'
  h2:         DS.belongsTo 'App.FontSetting'
  h3:         DS.belongsTo 'App.FontSetting'
  h4:         DS.belongsTo 'App.FontSetting'
  h5:         DS.belongsTo 'App.FontSetting'
  h6:         DS.belongsTo 'App.FontSetting'
  p:          DS.belongsTo 'App.FontSetting'
  li:         DS.belongsTo 'App.FontSetting'
  div:        DS.belongsTo 'App.FontSetting'
  section:    DS.belongsTo 'App.FontSetting'
  pre:        DS.belongsTo 'App.FontSetting'
  span:       DS.belongsTo 'App.FontSetting'















