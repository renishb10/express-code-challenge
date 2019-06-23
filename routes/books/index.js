// Dependencies
const router = require('express').Router();

// Custom Dependencies
const { Book, Institution } = require('../../models');
const auth = require('../../services/authService');

///////////////////////////////////////////////////////////////
/// GET all books
///////////////////////////////////////////////////////////////
router.get('/', auth.authenticate(), async (req, res, next) => {
  try {
    Book.findAll({})
      .then(data => {
        Institution.findOne({ where: { id: 1 } }).then(ins => {
          if (ins) {
            ins.getBooks().then(books => res.jsend.success(books));
          } else res.status(200).jsend([]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
