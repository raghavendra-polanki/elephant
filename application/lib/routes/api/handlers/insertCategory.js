'use strict';

const $ = require(__base + 'lib');

module.exports = function(req, res, next) {
  console.log('inside /api/insert_category');

  console.log(req.body);

  let categoryData = new $.model.Category(req.body);

  categoryData.validate((err) => {
    if (err) {
      console.error(err);
    }
    res.json({'a': 1});
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
