const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let url = "mongodb+srv://saintclevertech2001:09073502837@cluster0.qxq9gc3.mongodb.net/mySimpleApp?retryWrites=true&w=majority";

async function getDatabase() {
    let client = await MongoClient.connect(url)
    let database = client.db("mySimpleApp")
    if (!database) {
        console.log("please connect to database ");
    }
    return database
}

module.exports = { getDatabase }