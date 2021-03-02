const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const apiSpec = path.join(__dirname, '../openapi/Bookstore.yaml');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load(apiSpec);
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/demo', { useNewUrlParser: true, useUnifiedTopology: true });

// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initalize EOV Middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    operationHandlers: path.join(__dirname),
  }),
);

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})