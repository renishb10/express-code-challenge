// Dependencies
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// Custom dependencies
const { User, Institution } = require('../../models');

///////////////////////////////////////////////////////////////
/// GET all Users
///////////////////////////////////////////////////////////////
router.post('/create', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (email && password && name) {
      const userEmailDomain = email.substring(email.lastIndexOf('@') + 1);
      Institution.findOne({ where: { emailDomain: userEmailDomain } }).then(
        ins => {
          if (ins) {
            const userInstitute = ins.dataValues;
            User.findOne({ where: { email: email } }).then(usr => {
              if (usr)
                return res.status(400).jsend.error({
                  code: 400,
                  message: 'Email address already exists',
                });

              // Create new user
              User.create({ ...req.body, InstitutionId: userInstitute.id })
                .then(data => {
                  res.jsend.success(data);
                })
                .catch(err => {
                  res.status(400).jsend.error(err.message);
                });
            });
          } else
            return res
              .status(400)
              .jsend.error({ code: 400, message: 'No such Institutions' });
        },
      );
    } else {
      res.status(400).jsend.error({ code: 400, message: 'Not good' });
    }
  } catch (e) {
    next(e);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    if (req.body.email && req.body.password) {
      User.findOne({ where: { email: req.body.email } })
        .then(usr => {
          if (!usr) return res.status(404).jsend.error('User not found');

          if (User.comparePassword(usr.password, req.body.password)) {
            const token = jwt.sign(
              {
                id: usr.id,
                email: usr.email,
                InstitutionId: usr.InstitutionId,
              },
              'secretofbibliotech' + '878ad68e43a8405d968cac861e7f6030',
              {
                expiresIn: 86400,
              },
            );

            res.jsend.success(token);
          } else {
            res.status(401).jsend.error('Check credentials, UnAuthorized');
          }
        })
        .catch(err => {
          res.status(401).jsend.error('Check credentials, UnAuthorized');
        });
    } else {
      res.status(400).jsend.error('Bad request');
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
