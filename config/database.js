const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = () => {
    try {
        mongoose.connect(process.env.DATABASE_URL).then(() => {
            console.log(`Data is Successfully Connected at : ${mongoose.connection.host}`)
        })
    }
    catch (e) {
        console.log(`Getting Error While Connecting to the DB : ${e}`);
    }
}
module.exports = dbConnect;