App.SlideshowsController = Em.ArrayController.extend
  needs: ['user', 'slideshow', 'fontsettings']
  newThemeName: null 
  newSlideshowName: null
  availableThemes: null
  selectedTheme: null
  
  selectedThemeObserver:(->
    ST = @get('selectedTheme')
    if @get('selectedTheme')
      @set('controllers.fontsettings.h1', ST.get('h1'))
      @set('controllers.fontsettings.li', ST.get('li'))
      @set('controllers.fontsettings.p',  ST.get('p'))
      @set('controllers.fontsettings.pre',  ST.get('pre'))
      @set('controllers.fontsettings.section',  ST.get('section'))
      @set('controllers.fontsettings.span',  ST.get('span'))  
  ).observes('selectedTheme')

  createSlideshow: ->
    user = @get('controllers.user.content')
    theme = @get 'selectedTheme'
    if theme
      App.Slideshow.createRecord
            title: @get('newSlideshowName')
            user: user
            author: user.get('username')
            theme: theme
    @get('store').commit()
    @set('newSlideshowName', '')

  saveTheme: ->
    fsCon = @get('controllers.fontsettings')
    fontSettings = [fsCon.get('h1'), fsCon.get('p'), fsCon.get('li'), fsCon.get('section'),
                   fsCon.get('pre'), fsCon.get('div'), fsCon.get('span')]
    savedFontSettings = []
    i=0
    for item in fontSettings
      FS = App.Fontsetting.createRecord
            size: item.get('size')
            font: item.get('font')
            color: item.get('color')
            alignment: item.get('alignment')
      savedFontSettings[i] = FS
      i++
      
    @get('store').commit()
    
    Ember.run.later(@, @createThemeAndCommit, savedFontSettings, 500)
        
  createThemeAndCommit: (savedFontSettings) ->
    App.Theme.createRecord
      name: @get 'newThemeName'
      h1: savedFontSettings[0]
      # h2: savedFontSettings[]
      # h3: savedFontSettings[]
      # h4: savedFontSettings[]
      # h5: savedFontSettings[]
      # h6: savedFontSettings[]
      p: savedFontSettings[1]
      li: savedFontSettings[2]
      section: savedFontSettings[3]
      pre: savedFontSettings[4]
      div: savedFontSettings[5]
      span: savedFontSettings[6]
    @get('store').commit()
