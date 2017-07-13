'use strict';

const $ = require(__base + 'lib');

module.exports = function(req, res, next) {
  console.log('inside /api/insert_category');

  let categoryData = new $.model.Category(req.body);

  $.utils.validation.validateInstanceSchema(categoryData)
  .then(() => {
    console.log('valid');
    return $.act({
      cmd: 'generate_category_id',
    });
  })
  .then((result) => {
    console.log('generate_category_id returned');
    console.log(result);
    return categoryData.save();
  })
  .then(() => {
    console.log('inserted');
    res.status(200).json({status: 0});
  })
  .catch((err) => {
    console.error('in catch()');
    res.status(500).json({err: err});
  });
};
