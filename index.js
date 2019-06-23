// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const jsend = require('jsend');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

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
app.use(jsend.middleware);

// Security middlewares
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Swagger Documentation
app.use(
  '/api-doc',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);

// Authentication
app.use(auth.initialize());

// Routing
app.use('/', routes.index);
app.use(`${config.base_url_path.v1}users`, routes.users);
app.use(`${config.base_url_path.v1}books`, routes.books);

app.listen(process.env.PORT || config.port, () => {
  logger.info(`Listening on port ${process.env.PORT || config.port}`);
});

// Exporting it for unit test
module.exports = app;

// TODO: Add module 'express-load' to chain-up & load middlewares, routes, services etc later
// TODO: Add third party log store via winston & exceptions (eg: Rollbar, Sentry.io or Azure AppInsights)
