// Dependencies
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let db = null;

module.exports = app => {
  if (!db) {
    const env = process.env.NODE_ENV || 'development';
    const config = app.libs.config[env];
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config,
    );
    db = {
      sequelize,
      Sequelize,
      models: {},
    };
    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });
    Object.keys(db.models).forEach(key => {
      db.models[key].associate(db.models);
    });
  }

  db.authenticate()
    .then(() => {
      logger.info(
        `Database: Connection has been established successfully with ${
          config.db.host
        } : ${config.db.name}`,
      );
    })
    .catch(err => {
      logger.error(
        `Unable to connect to the database - ${config.db.host} : ${
          config.db.name
        } - `,
        err,
      );
    });
  return db;
};
