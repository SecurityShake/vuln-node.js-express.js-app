'user strict';

const express = require('express'),
    // OPTIONAL:Logging
    //bodyParser = require('body-parser'),
    //morgan = require('morgan'),
    config = require('./config'),
    router = require('./router'),
    db = require('./orm');
    
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

router(app, db);

//OPTIONAL: Activate Logging
// app.use(mrogan('combined'));

//drop and resync with { force: true }
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log('Express listening on port:', PORT);
    });
  });