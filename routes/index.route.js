const router = require('express').Router();

router.get('/', (req, res) => {
  res.end(`Express Code Challenge Started`);
});

module.exports = router;
