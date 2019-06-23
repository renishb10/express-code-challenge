// Dependencies
const router = require('express').Router();

// Models
const models = require('../../models');

///////////////////////////////////////////////////////////////
/// GET all books
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    models.Book.findAll({})
      .then(data => {
        return res.jsend.success(data);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
