'user strict';

const express = require('express'),
    //morgan = require('morgan'),
    config = require('./config'),
    router = require('./router'),
    bodyParser = require('body-parser'),
    db = require('./orm');

    
    
    
const sjs = require('sequelize-json-schema');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
    
const app = express()
const PORT = config.PORT;
console.log(config)
//OPTIONAL: Security headers?????
// app.use((req, res, next) => {
//     res.header('Content-Type', 'application/json');
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

//app.use(mrogan('combined'));
app.use(bodyParser.json());
router(app, db);

console.log(db)

//OPTIONAL: Activate Logging


//drop and resync with { force: true }
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log('Express listening on port:', PORT);
    });
  });


// Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//     swaggerDefinition: {
//       info: {
//         version: "1.0.0",
//         title: "Customer API",
//         description: "Customer API Information",
//         contact: {
//           name: "Amazing Developer"
//         },
//         servers: ["http://localhost:5555"],
//         explorer: true
//       }
//     },
//     // ['.routes/*.js']
//     apis: ["./src/router/routes/*.js"]
//   };
  
const expressJSDocSwagger = require('express-jsdoc-swagger');

const docOptions = {
  info: {
    version: '1.0.0',
    title: 'Albums store',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './../**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

  //const swaggerDocs = expressJSDocSwagger(swaggerOptions);

expressJSDocSwagger(app)(docOptions);
  //app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  //generate schemas from sequelize
  const options = {exclude: ['id', 'createdAt', 'updatedAt']};
  console.log(sjs.getSequelizeSchema(db.sequelize, options));