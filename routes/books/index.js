// Dependencies
const router = require('express').Router();

// Custom Dependencies
const { Institution } = require('../../models');
const auth = require('../../services/authService');

///////////////////////////////////////////////////////////////
/// GET list of Books that the signed In user has access
/// to via Institution
///////////////////////////////////////////////////////////////
router.get('/', auth.authenticate(), async (req, res, next) => {
  try {
    if (req.user) {
      // Once user authenticates passport will set user object to the request
      // Find relevant institute
      Institution.findOne({ where: { id: req.user.InstitutionId } }).then(
        ins => {
          if (ins) {
            // If institute found, we are using accessor here to fetch associate info
            // http://docs.sequelizejs.com/manual/associations.html
            ins.getBooks().then(books => res.jsend.success(books));
          } else
            res
              .status(404)
              .jsend(`No data found for this user - id:${user.id}`);
        },
      );
    } else throw new Error('Issue in Authentication');
  } catch (e) {
    return res
      .status(400)
      .jsend.error(`Couldn\'t process your request - ${e.message}`);
  }
});

module.exports = router;

// TODO: Add additional validators like Joi / express-validator later if view models added.
// TODO: Write custom error sender, that also logs via winston & push it to third party
