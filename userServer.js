require('dotenv').config();
require('./backend/user-server/config/config');
require('./backend/user-server/models/db');
require('./backend/user-server/config/passportConfig');

const express = require('express'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 passport = require('passport'),
 rtsIndex = require('./backend/user-server/routes/index.routes');

var app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use(passport.initialize());

//error handler
app.use((err, req, res, next) => {
  if (err.name == 'ValidationError'){
    console.log(err);
    var valErrors = [];
    Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
    res.status(422).send(valErrors)
  }
});

app.listen(process.env.PORT, ()=> console.log(`Server started at port: ${process.env.PORT}`));
