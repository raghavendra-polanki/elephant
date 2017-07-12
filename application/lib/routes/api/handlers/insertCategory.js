'use strict';

const $ = require(__base + 'lib');

// const compileValidationErrors = (error) => {
//   if (error.name == 'ValidationError') {
//     let valErrors = [];
//     for (let field in error.errors) {
//       valErrors.push(error.errors[field].message);
//     }
//     return valErrors;
//   } else {
//     return 'error while validating schema';
//   }
// };
//
// const validateInstanceSchema = (instance) => {
//   return new $.promise((resolve, reject)=> {
//     instance.validate((err) => {
//       if (err) {
//         console.error(err);
//         reject(compileValidationErrors(err));
//       } else {
//         resolve();
//       }
//     });
//   });
// };

module.exports = function(req, res, next) {
  console.log('inside /api/insert_category');

  console.log(req.body);

  let categoryData = new $.model.Category(req.body);
  console.log(categoryData);

  console.log($);

  $.utils.validation.validateInstanceSchema(categoryData)
  .then(() => {
    console.log('valid');
    res.status(200).json({'a': 1});
  })
  .catch((err) => {
    res.status(500).json({err: err});
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
