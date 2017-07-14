'use strict';

const $ = require(__base + 'lib');

const processRequest = async (req, res, next) => {
  let categoryData;
  try {
    categoryData = new $.model.Category(req.body);
    await $.utils.validation.validateInstanceSchema(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({status: 'INVALID_ARGUMENT', error: err});
  }

  try {
    let categoryID = await $.act({cmd: 'generate_category_id'});
    categoryData.set({
      category_id: categoryID.id,
    });
    await categoryData.save();
    return categoryID;
  } catch (err) {
    console.error(err);
    res.status(500).json({status: 'INTERNAL', error: err});
  }
};

module.exports = function(req, res, next) {
  console.log('inside /api/insert_category');

  processRequest(req, res, next)
  .then((data) => {
    if (data !== undefined) {
      res.status(200).json({status: 'OK', data: data});
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({status: 'INTERNAL', error: err});
  });
};
