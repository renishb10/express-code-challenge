// Dependencies
const router = require('express').Router();

///////////////////////////////////////////////////////////////
/// GET all Institutions
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    return res.json('Institutions');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
