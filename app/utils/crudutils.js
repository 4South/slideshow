exports.formatDbResponse = function(model) {
  if (model) {
    var formattedModel = model.toObject();
    formattedModel.id = formattedModel._id;
    delete formattedModel.password
    delete formattedModel._id;
    delete formattedModel.__v; 
    return formattedModel;
  }
  return;
};

exports.formatSlideResponse = function(model) {
  if (model) {
    var formattedModel = model.toObject();
    formattedModel.id = formattedModel._id;
    formattedModel.slideshow_id = formattedModel._slideshow[0];
    delete formattedModel._slideshow
    delete formattedModel.password
    delete formattedModel._id;
    delete formattedModel.__v; 
    return formattedModel;
  }
  return;
};

exports.formatSlideshowResponse = function(model) {
  if (model) {
    var formattedModel = model.toObject();
    formattedModel.id = formattedModel._id;
    delete formattedModel._user
    delete formattedModel.password
    delete formattedModel._id;
    delete formattedModel.__v; 
    return formattedModel;
  }
  return;
};
