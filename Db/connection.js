const mongoose = require('mongoose');

const url ='mongodb+srv://######:######@myfirstcluster.pmnkh.mongodb.net/jwt?retryWrites=true&w=majority';

async function dbConnect() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = dbConnect;