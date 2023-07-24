const express = require('express');

const app = express();

const {database} = require('./Database/Config');

const route = require('./Helpers/route');

const port = 3000;

/** sets up database connection **/
database.connect();

app.use(express.json());

/** maps all the available routes **/
app.use('/v1', route);

app.listen(port, () => console.log(`'Listening to port ${port}'`));
