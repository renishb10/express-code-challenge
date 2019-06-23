const jwt = require('jsonwebtoken');
const config = require('../../config');

// Extracts the domain name from the given email address
const getDomainFromEmail = emailAddress =>
  emailAddress.substring(emailAddress.lastIndexOf('@') + 1);

// Generates JWT
const getJwtUserToken = user => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      InstitutionId: user.InstitutionId,
    },
    config.auth.jwtKey,
    {
      expiresIn: config.auth.jwtExpiresIn,
    },
  );

  return token;
};

module.exports = {
  getDomainFromEmail,
  getJwtUserToken,
};
