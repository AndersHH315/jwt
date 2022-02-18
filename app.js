const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const connection = require('./Db/connection');
const cors = require('cors');
const dotenv = require('dotenv');
const pages = require('./routes/pages');
dotenv.config();

const authRoute = require('./routes/auth');
const secureRoute = require('./routes/secure');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', authRoute);
app.use('/api', secureRoute);
app.use('/', pages);

connection();

app.listen(port, () => console.log(`Listening to port ${port}`));