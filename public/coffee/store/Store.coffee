App.Adapter = DS.RESTAdapter.extend
  bulkCommit: false

# App.Adapter.map('App.User', 
  # slideshows: {embedded: 'always'})

# App.Adapter.map('App.Slideshow',
  # slides: {embedded: 'always'})

App.Store = DS.Store.extend
  revision: 12
  adapter: App.Adapter



  
  