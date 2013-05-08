App.SlideshowsController = Em.ArrayController.extend({
  needs: ['user', 'slideshow', 'fontsettings'],
  newThemeName: null,
  newSlideshowName: null,
  availableThemes: null,
  selectedTheme: null,
  selectedThemeObserver: (function() {
    var ST;

    ST = this.get('selectedTheme');
    if (this.get('selectedTheme')) {
      this.set('controllers.fontsettings.h1', ST.get('h1'));
      this.set('controllers.fontsettings.li', ST.get('li'));
      this.set('controllers.fontsettings.p', ST.get('p'));
      this.set('controllers.fontsettings.pre', ST.get('pre'));
      this.set('controllers.fontsettings.section', ST.get('section'));
      return this.set('controllers.fontsettings.span', ST.get('span'));
    }
  }).observes('selectedTheme'),
  createSlideshow: function() {
    var theme, user;

    user = this.get('controllers.user.content');
    theme = this.get('selectedTheme');
    if (theme) {
      App.Slideshow.createRecord({
        title: this.get('newSlideshowName'),
        user: user,
        author: user.get('username'),
        theme: theme
      });
    }
    this.get('store').commit();
    return this.set('newSlideshowName', '');
  },
  saveTheme: function() {
    var FS, fontSettings, fsCon, i, item, savedFontSettings, _i, _len;

    fsCon = this.get('controllers.fontsettings');
    fontSettings = [fsCon.get('h1'), fsCon.get('p'), fsCon.get('li'), fsCon.get('section'), fsCon.get('pre'), fsCon.get('div'), fsCon.get('span')];
    savedFontSettings = [];
    i = 0;
    for (_i = 0, _len = fontSettings.length; _i < _len; _i++) {
      item = fontSettings[_i];
      FS = App.Fontsetting.createRecord({
        size: item.get('size'),
        font: item.get('font'),
        color: item.get('color'),
        alignment: item.get('alignment')
      });
      savedFontSettings[i] = FS;
      i++;
    }
    this.get('store').commit();
    return Ember.run.later(this, this.createThemeAndCommit, savedFontSettings, 500);
  },
  createThemeAndCommit: function(savedFontSettings) {
    App.Theme.createRecord({
      name: this.get('newThemeName'),
      h1: savedFontSettings[0],
      p: savedFontSettings[1],
      li: savedFontSettings[2],
      section: savedFontSettings[3],
      pre: savedFontSettings[4],
      div: savedFontSettings[5],
      span: savedFontSettings[6]
    });
    return this.get('store').commit();
  }
});
