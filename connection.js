require('dotenv').config();
const mongoose = require('mongoose')

async function connectDB() {
    const URI = process.env.DB;

    try {
        mongoose.connect(URI, { serverApi: { version: '1', strict: true, deprecationErrors: true } });
        console.log("Connected to MongoDB")

    } catch (e) {
        console.error(e);
        throw new Error('Unable to Connect to Database')
    }
}

module.exports = connectDB;