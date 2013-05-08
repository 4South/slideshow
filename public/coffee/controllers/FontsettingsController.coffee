App.FontsettingsController = Em.ArrayController.extend
  fontlist: ['monospace', 'Share Tech Mono', 'Jacque Francois', 'helvetica', 'arial']
  colorlist: ['black', 'white', 'yellow', 'green', 'blue', "#2e74ff", "#c2efff"]
  sizelist: ['22', '24', '26', '28', '30', '32', '34', '36']
  alignmentlist: ['left', 'center']

  init: ->
    @set 'h1', App.FontsettingDefault.create()
    # @set 'h2', App.FontsettingDefault.create()
    # @set 'h3', App.FontsettingDefault.create()
    # @set 'h4', App.FontsettingDefault.create()
    # @set 'h5', App.FontsettingDefault.create()
    # @set 'h6', App.FontsettingDefault.create()
    @set 'div', App.FontsettingDefault.create()
    @set 'pre', App.FontsettingDefault.create()
    @set 'section', App.FontsettingDefault.create()
    @set 'span', App.FontsettingDefault.create()
    @set 'li', App.FontsettingDefault.create()
    @set 'p', App.FontsettingDefault.create()

  h1: null
  h2: null
  h3: null
  h4: null
  h5: null
  h6: null
  div: null
  pre: null
  section: null
  span: null
  li: null
  p: null


  
  
  
  
  
  
  
  
  
  
  

  #Commented out code is for the itemController implementation
  
  # content: [App.FontsettingDefault.create
             # headline: '<h1 ... h6> Set the Properties for h1. 
                          # Each successive header is 10% smaller.'
             # type: 'header'
           # App.FontsettingDefault.create
             # headline: '<pre> This is used for Code Blocks'
             # type: 'pre'
           # App.FontsettingDefault.create
              # headline: '<div>'
              # type: 'div'
           # App.FontsettingDefault.create
              # headline: '<section>'
              # type: 'section'
           # App.FontsettingDefault.create
              # headline: '<span>'
              # type: 'span'
           # App.FontsettingDefault.create
              # headline: '<li>'
              # type: 'li'
           # App.FontsettingDefault.create
              # headline: '<p>'
              # type: 'p'
          # ]
  # #for some reason, had to specify the container for the itemController lookup to work
  # container: App.__container__

  