App.Adapter = DS.RESTAdapter.extend
  bulkCommit: false

# App.Adapter.reopen didFindHasMany: (store, type, payload, record, key) ->
  # loader = DS.loaderFor(store)
  # loader.populateArray = (references) ->
    # store.loadHasMany record, key, references.map((reference) ->
      # reference.id
    # )

  # get(this, "serializer").extractMany loader, payload, type
  
App.Adapter.map('App.User',
  slideshows: {embedded: 'always'}
)

App.Adapter.map('App.Slideshow',
  slides: {embedded: 'always'})
  
App.Store = DS.Store.extend
  revision: 12
  adapter: App.Adapter
