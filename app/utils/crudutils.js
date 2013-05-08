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
    if (formattedModel._theme) {
      formattedModel.theme_id = formattedModel._theme[0];
    }
    formattedModel.id = formattedModel._id;
    
    delete formattedModel._user
    delete formattedModel._theme
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

    if (formattedModel._h1) {formattedModel.h1_id = formattedModel._h1[0];}
    // formattedModel.h2_id = formattedModel._h2[0];
    // formattedModel.h3_id = formattedModel._h3[0];
    // formattedModel.h4_id = formattedModel._h4[0];
    // formattedModel.h5_id = formattedModel._h5[0];
    // formattedModel.h6_id = formattedModel._h6[0];
    
    if (formattedModel._section) {formattedModel.section_id = formattedModel._section[0];}
    if (formattedModel._pre) {formattedModel.pre_id = formattedModel._pre[0];}
    if (formattedModel._div) {formattedModel.div_id = formattedModel._div[0];}
    if (formattedModel._p) {formattedModel.p_id = formattedModel._p[0];}
    if (formattedModel._li) {formattedModel.li_id = formattedModel._li[0];}
    if (formattedModel._span) {formattedModel.span_id = formattedModel._span[0];}

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
