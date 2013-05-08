App.FontsettingsView = Em.ContainerView.extend
  childViews: ['h1', 'div', 'pre', 'section', 'span', 'li', 'p']
  # templateName: 'fontsettings'
  tagName: 'ul'
  # controller: App.FontsettingsController.create()
  h1: App.FontsettingView.create
        headline: 'headers'
        contentBinding: 'controller.h1'
  div: App.FontsettingView.create
        headline: '<div>'
        contentBinding: 'controller.div'
  pre: App.FontsettingView.create
        headline: '<pre>'
        contentBinding: 'controller.pre'
  li: App.FontsettingView.create
        headline: '<li>'
        contentBinding: 'controller.li'
  p: App.FontsettingView.create
        headline: '<p>'
        contentBinding: 'controller.p'
  section: App.FontsettingView.create
        headline: '<section>'
        contentBinding: 'controller.section'
  span: App.FontsettingView.create
        headline: '<span>'
        contentBinding: 'controller.span'
  