const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

module.exports = app;
