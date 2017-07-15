'use strict';

const $ = require(__base + 'lib');

const processRequest = async (req, res, next) => {
  let categoryData;
  try {
    categoryData = new $.model.Category(req.body);
    // validate category schema.
    await $.utils.validation.validateInstanceSchema(categoryData);
  } catch (err) {
    $.log.Error(err);
    res.status(500).json({status: 'INVALID_ARGUMENT', error: err});
    return;
  }

  try {
    // check if an identically named category already exists in any language.
    let orQuery = [];
    Object.keys(categoryData.names).forEach((lang) => {
      let q = {};
      q['names.' + lang] = categoryData.names[lang];
      orQuery.push(q);
    });
    let existingCategory =
        await $.model.Category.findOne({'$or': orQuery}).exec();
    if (existingCategory !== null) {
      res.status(500).json({
        status: 'ALREADY_EXISTS',
        error: 'A category with identical name already exists in atleast one ' +
               'language.',
      });
      return;
    }

    // generate a new category_id.
    let categoryID = await $.act({cmd: 'generate_category_id'});
    categoryData.set({
      category_id: categoryID.id,
    });

    // save category in database.
    await categoryData.save();

    return categoryID;
  } catch (err) {
    $.log.Error(err);
    res.status(500).json({status: 'INTERNAL', error: err});
    return;
  }
};

module.exports = function(req, res, next) {
  $.log.Info('/api/insert_category');
  $.log.Debug(req.body);

  processRequest(req, res, next)
  .then((data) => {
    if (data !== undefined) {
      res.status(200).json({status: 'OK', data: data});
    }
  })
  .catch((err) => {
    $.log.Error(err);
    res.status(500).json({status: 'INTERNAL', error: err});
  });
};
