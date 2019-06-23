// Dependencies
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

// Custom dependencies
const { User } = require('../models');
const config = require('../config');

const jwtOptions = {
  secretOrKey: config.auth.jwtKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new Strategy(jwtOptions, (payload, cb) => {
  User.findByPk(payload.id)
    .then(user => {
      if (user) {
        return cb(null, {
          id: user.id,
          email: user.email,
          InstitutionId: user.InstitutionId,
        });
      }
      return cb(null, false);
    })
    .catch(err => cb(err, null));
});

passport.use(jwtStrategy);

// Wrappers
const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate('jwt', { session: false });
};

module.exports = {
  initialize,
  authenticate,
};
