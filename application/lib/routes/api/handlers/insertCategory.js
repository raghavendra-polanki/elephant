'use strict';

const $ = require(__base + 'lib');

const replyWithValidationError = (res, error) => {
  if (error.name == 'ValidationError') {
    let valErrors = [];
    for (let field in error.errors) {
      valErrors.push(error.errors[field].message)
    }
    res.status(500).json({err: valErrors});
  } else {
    res.status(500).json({err: 'error while validating schema'});
  }
};

module.exports = function(req, res, next) {
  console.log('inside /api/insert_category');

  console.log(req.body);

  let categoryData = new $.model.Category(req.body);
  console.log(categoryData);

  categoryData.validate((err) => {
    if (err) {
      console.error(err);
      replyWithValidationError(res, err);
    } else {
      console.log('valid');
      res.status(200).json({'a': 1});
    }
  });

  // $.act({
  //   cmd: 'generate_category_id',
  // })
  // .then((result) => {
  //   console.log('generate_category_id returned');
  //   console.log(result);
  //   res.status(200).send(result.id.toString());
  // })
  // .catch((err) => {
  //   console.error('in catch()');
  //   console.error(err);
  //   res.status(500).send('something went wrong');
  // });
};
