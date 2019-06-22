// Dependencies
const router = require('express').Router();

///////////////////////////////////////////////////////////////
/// GET all books
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    return res.json('Books');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
