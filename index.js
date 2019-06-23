// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const jsend = require('jsend');

// Custom dependencies
const config = require('./config');
const logger = require('./helpers/logger');
const routes = require('./routes');
const auth = require('./services/authService');

// Express app initiate
const app = express();

// Logging assigned globally
global.logger = logger;

// Default middlewares
app.use(helmet()); // Adds security headers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jsend.middleware);

// Authentication
app.use(auth.initialize());

// Routing middlewares
app.use('/', routes.index);

// To relevant routes
app.use(`${config.base_url_path.v1}users`, routes.users);
app.use(`${config.base_url_path.v1}books`, routes.books);
app.use(`${config.base_url_path.v1}institutions`, routes.institutions);

app.listen(process.env.PORT || config.port, () => {
  logger.info(`Listening on port ${process.env.PORT || config.port}`);
});

// Exporting it for Chai test
module.exports = app;
