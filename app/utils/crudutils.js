exports.formatDbResponse = function(model) {
  var formattedModel = model.toObject();
  formattedModel.id = formattedModel._id;
  delete formattedModel.password
  delete formattedModel._id;
  delete formattedModel.__v; 
  return formattedModel;
};
