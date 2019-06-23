// Dependencies
const router = require('express').Router();

// Custom dependencies
const { User, Institution } = require('../../models');
const userController = require('./controller');

///////////////////////////////////////////////////////////////
/// Create User
///////////////////////////////////////////////////////////////
router.post('/create', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (email && password && name) {
      // Get domain from user's email id
      const userEmailDomain = userController.getDomainFromEmail(email);

      // Check if Institution available
      Institution.findOne({ where: { emailDomain: userEmailDomain } }).then(
        ins => {
          if (ins) {
            const userInstitute = ins.dataValues;

            // Check if user already available in our system
            User.findOne({ where: { email: email } }).then(usr => {
              if (usr)
                return res
                  .status(400)
                  .jsend.error('Email Id already exist in our system.');

              // Create new user
              User.create({ ...req.body, InstitutionId: userInstitute.id })
                .then(result => {
                  // Masking password - delete operator not working due to inheritence
                  result['password'] = 'xxxxxxxxxxxxxxxx';

                  res.jsend.success(result);
                })
                .catch(err => {
                  res.status(400).jsend.error(err.message);
                });
            });
          } else
            return res
              .status(400)
              .jsend.error(
                'Whoops :/ It appears we currently cannot give your domain access...',
              );
        },
      );
    } else {
      return res.status(400).jsend.error('Please check your input.');
    }
  } catch (e) {
    return res
      .status(400)
      .jsend.error(`Couldn\'t process your request - ${e.message}`);
  }
});

///////////////////////////////////////////////////////////////
/// SignIn User
///////////////////////////////////////////////////////////////
router.post('/signin', async (req, res, next) => {
  try {
    if (req.body.email && req.body.password) {
      // Check if user exist in our system
      User.findOne({ where: { email: req.body.email } })
        .then(usr => {
          if (!usr)
            return res.status(404).jsend.error('Wrong email or password');

          // If exist, compare the passwords & generate token
          if (User.comparePassword(usr.password, req.body.password)) {
            res.jsend.success(userController.getJwtUserToken(usr));
          } else {
            res.status(401).jsend.error('Invalid credentials');
          }
        })
        .catch(err => {
          res.status(401).jsend.error('Invalid credentials');
        });
    } else {
      return res.status(400).jsend.error('Please check your input.');
    }
  } catch (e) {
    return res
      .status(400)
      .jsend.error(`Couldn\'t process your request - ${e.message}`);
  }
});

module.exports = router;

// TODO: Add additional validators like Joi / express-validator later if view models added.
// TODO: Write custom error sender, that also logs via winston & push it to third party
