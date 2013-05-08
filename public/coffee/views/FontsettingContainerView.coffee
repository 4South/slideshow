App.FontsettingContainerView = Em.ContainerView.extend
  childViews: ['h1', 'pre', 'div', 'section', 'span', 'li', 'p']
  h1: App.FontsettingView.create
    headline: '<h1 ... h6> Set the Properties for h1. Each successive header is 10% smaller.'
  pre: App.FontsettingView.create
    headline: '<pre> This is used for Code Blocks'
  div: App.FontsettingView.create
    headline: '<div>'
  section: App.FontsettingView.create
    headline: '<section>'
  span: App.FontsettingView.create
    headline: '<span>'
  li: App.FontsettingView.create
    headline: '<li>'
  p: App.FontsettingView.create
    headline: '<p>'
    
