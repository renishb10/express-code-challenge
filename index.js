// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

// Custom dependencies
const config = require('./config');
const logger = require('./helpers/logger');
const routes = require('./routes');
const db = require('./data/db');

// Express app initiate
const app = express();

// Logging assigned globally
global.logger = logger;

// Default middlewares
app.use(helmet()); // Adds security headers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routing middlewares
app.use('/', routes.index);

// To relevant routes
app.use(`${config.base_url_path.v1}users`, routes.users);
app.use(`${config.base_url_path.v1}books`, routes.books);
app.use(`${config.base_url_path.v1}institutions`, routes.institutions);

// Initiate DB and run the server
db.sync({
  // Be cautious, setting true will clean up your db
  force: false,
})
  .then(() => {
    app.listen(process.env.PORT || config.port, () => {
      logger.info(`Listening on port ${process.env.PORT || config.port}`);
    });
  })
  .catch(e => {
    logger.error(e.message);
  });

// Exporting it for Chai test
module.exports = app;
