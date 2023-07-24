const mongoose = require('mongoose');

const databaseLink = "mongodb://localhost:27017/mydb";

exports.database = {
    connect(){

        mongoose.connect(databaseLink);

        const database = mongoose.connection;

        database.on('error', (error) => {
            console.log(error);
            return false;
        })
        
        database.once('connected', () => {
            console.log('Database Connected');
            return true;
        })
    },
}