const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

// Custom dependencies
const { User } = require('../models');

const jwtOptions = {
  secretOrKey: 'secretofbibliotech' + '878ad68e43a8405d968cac861e7f6030',
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

module.exports = {
  initialize: () => {
    return passport.initialize();
  },
  authenticate: () => {
    return passport.authenticate('jwt', { session: false });
  },
};
