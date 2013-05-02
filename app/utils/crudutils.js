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
    console.log(formattedModel);
    if (formattedModel._slideshow) {
      formattedModel.slideshow_id = formattedModel._slideshow[0];
    }
    if (formattedModel._theme) {
      formattedModel.theme_id = formattedModel._theme[0];
    }
    delete formattedModel._theme;
    delete formattedModel._slideshow;
    delete formattedModel.password;
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

exports.formatFontSettingResponse = function(model) {
  if (model) {
    var formattedModel = model.toObject();
    formattedModel.id = formattedModel._id;
    delete formattedModel._id;
    delete formattedModel.__v; 
    return formattedModel;
  }
  return;
};

exports.formatThemeResponse = function(model) {
  if (model) {
    var formattedModel = model.toObject();
    formattedModel.id = formattedModel._id;
    formattedModel.h1_id = formattedModel._h1;
    formattedModel.h2_id = formattedModel._h2;
    formattedModel.h3_id = formattedModel._h3;
    formattedModel.h4_id = formattedModel._h4;
    formattedModel.h5_id = formattedModel._h5;
    formattedModel.h6_id = formattedModel._h6;
    formattedModel.section_id = formattedModel._section;
    formattedModel.pre_id = formattedModel._pre;
    formattedModel.div_id = formattedModel._div;
    formattedModel.p_id = formattedModel._p;
    formattedModel.li_id = formattedModel._li;
    formattedModel.span_id = formattedModel._span;

    delete formattedModel._id;
    delete formattedModel.__v; 
    delete formattedModel._h1;
    delete formattedModel._h2;
    delete formattedModel._h3;
    delete formattedModel._h4;
    delete formattedModel._h5;
    delete formattedModel._h6;
    delete formattedModel._section;
    delete formattedModel._pre;
    delete formattedModel._div;
    delete formattedModel._p;
    delete formattedModel._li;
    delete formattedModel._span;
    return formattedModel;
  }
  return;
};
