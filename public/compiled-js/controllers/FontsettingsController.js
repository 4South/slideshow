App.FontsettingsController = Em.ArrayController.extend({
  fontlist: ['monospace', 'Share Tech Mono', 'Jacque Francois', 'helvetica', 'arial'],
  colorlist: ['black', 'white', 'yellow', 'green', 'blue', "#2e74ff", "#c2efff"],
  sizelist: ['22', '24', '26', '28', '30', '32', '34', '36'],
  alignmentlist: ['left', 'center'],
  init: function() {
    this.set('h1', App.FontsettingDefault.create());
    this.set('div', App.FontsettingDefault.create());
    this.set('pre', App.FontsettingDefault.create());
    this.set('section', App.FontsettingDefault.create());
    this.set('span', App.FontsettingDefault.create());
    this.set('li', App.FontsettingDefault.create());
    return this.set('p', App.FontsettingDefault.create());
  },
  h1: null,
  h2: null,
  h3: null,
  h4: null,
  h5: null,
  h6: null,
  div: null,
  pre: null,
  section: null,
  span: null,
  li: null,
  p: null
});
