const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;

const configPath = 'src/configs/user-database.json';

/*
    Class that handle the database connection
    The database used is MongoDB
*/
class Database {
    #mongodb;
    #database;
    #uri;
    #databaseName;

    constructor() {
        this.#uri = this.#getUriFromFile();
        this.#mongodb = new MongoClient(this.#uri);
    }

    /*
        Connect to the database
    */
    async connect() {
        try {
            await this.#mongodb.connect();

            this.#database = this.#mongodb.db(this.#databaseName);
        } catch(e) {
            throw 'Failed to connect to the database !';
        }
    }

    /*
        Return user information by a username

        @param {String}username - Username of the user to get the informations
        @return {Object} The user information or `null` if user not found
    */
    async getUserByUsername(username) {
        let user = null;

        try {
            user = await this.#database.collection('users').findOne({ username });
        } catch (e) {
            console.error(`Error while searching the user !`);
        }

        return user;
    }

    /*
        Return the password of a user by it's username

        @param {String}username - Username of the user to get the informations
        @return {String} Password of the user or `null` if not found
    */
    async getPasswordByUsername(username) {
        return (await this.getUserByUsername(username))?.password ?? null;
    }

    /*
        Return a list of all the users present in the database

        @return {Array} Users
    */
    async getUsersList() {
        let usersList = [];

        try {
            usersList = await this.#database.collection('users').find().toArray();
        } catch (e) {
            console.log(e);
            console.error('An error occured while fetching the users from the database !');
        }

        return usersList;
    }

    #getUriFromFile() {
        const fileData = fs.readFileSync(configPath, { encoding: 'utf-8' });
        const jsonData = JSON.parse(fileData);

        const username = jsonData.username ?? "";
        const password = jsonData.password ?? "";
        const host = jsonData.host ?? "";
        const port = jsonData.port ?? 8000;
        this.#databaseName = jsonData.databaseName ?? "";
        
        return `mongodb://${username}:${password}@${host}:${port}/?maxPoolSize=20&w=majority`;
    }
}

module.exports = new Database();

if (!module.parent) {
    const db = new Database;
    
    db.connect().then(async () => {
        console.log(await db.getUsersList());
        console.log(await db.getPasswordByUsername("Betty"));
    });
}
