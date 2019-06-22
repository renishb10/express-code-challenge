// Dependencies
const router = require('express').Router();

///////////////////////////////////////////////////////////////
/// GET all Users
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    return res.json('Users');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
