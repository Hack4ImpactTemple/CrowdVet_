if (typeof window === 'undefined') {

    const deepmerge = require('deepmerge')
    const GraphQLRequests = require('../../src/api/GraphQLRequests');

}


class User {

    constructor(id, token) {
        this.id = id;
        this.token = token;
        this.inited = false;
    }

}

User.prototype.init = async function() {

    try {
        // If we're doing this on the server side
        if (typeof window !== 'undefined') {
            return await this.initClientSide();
        } 
     
         // If we're doing this on the client side
        else {
            return await this.initServerSide();
        }
    } catch (error) {
        throw error;
    }

}

User.prototype.initServerSide = async function() {
    
    const MongoClient = require('mongodb').MongoClient;
    const Config = require('../config.js').default;
    const client = new MongoClient(Config.MongoDbURL);

    try {
                
        // Connect to the database
        await client.connect();
        var db = await client.db(Config.MongoDbName);

        var user = await db.collection('users').findOne({'_id': this.id});

        // If we need to create the user
        if(user == null) {
            await db.collection('users').insertOne({
                '_id': this.id,
                'createdAt': (new Date() / 1000)
            })

            user = await db.collection('users').findOne({'_id': this.id});
            
        }

        for(key in user) {
            if(key == '_id') {
                this['id'] = user['_id']
            } else {
                this[key] = user[key];
            }
        }

        client.close();

    } catch (error) {
        throw error;
    }

}

User.prototype.initClientSide = async function() {

    // Call the API in some way
    var request = new window.APIRequest();
    var response = await request.endpoint('/user/get?token=' + this.token);

    console.log("Called " + '/user/get?token=' + this.token);
    console.log("... and got " + JSON.stringify(response));

    if(response != null) {
        this.bind(response);
        this.inited = true;
    } else {
        throw new Error("Could not init user object!");
    }

}



/**
 * Allow the user to be updated via API autoMAGICALLY
 * @param {Object} updates A JSON tree of updates to be added. Duplicate properties will be overwritten, new properties will simply be added
 * @returns {Object} The json response returned by the server (This should probably have an 'error' or 'success' property or something like it) 
 */
User.prototype.update = async function(updates) {
    
    // If we're doing this on the server side
    if (typeof window === 'undefined') {
        console.log("SS update");
       return await this.serverSideUpdate(updates);
    } 
    
    // If we're doing this on the client side
    else {
        console.log("CS update");
        return await this.clientSideUpdate(updates);
    }

}

User.prototype.bind = function(updates) {

    // If we're doing this on the server side
    if (typeof window === 'undefined') {
        const deepmerge = require('deepmerge')

        var merged = deepmerge(this, updates);

        for(var prop in merged) {
            this[prop] = merged[prop];
        }
    }

    // If we're doing this on the client side
    else {
        const deepmerge = window.deepmerge;

        var merged = deepmerge(this, updates);

        for(var prop in merged) {
            this[prop] = merged[prop];
        }

    }

}

User.prototype.serverSideUpdate = async function(updates) {

    const MongoClient = require('mongodb').MongoClient;
    const Config = require('../config.js').default;
    const client = new MongoClient(Config.MongoDbURL);

    try {
                
        // Connect to the database
        await client.connect();
        var db = await client.db(Config.MongoDbName);

        this.bind(updates);

        var copy = {};
        for(var key in this) {
            if(key == 'id') {
                copy['_id'] = this[key];
            } else {
                copy[key] = this[key];
            }
        }

        await db.collection('users').replaceOne({'_id': this.id}, copy);
        return await db.collection('users').findOne({'_id': this.id});
    
    } catch (error) {
        throw error;
    }

}

User.prototype.clientSideUpdate = async function(updates) {

    // If this hasn't been inited yet
    if(this.id == null) {
        return false;
    }
    
    var req = new window.APIRequest();
    var res = await req.endpoint('/user/update?token=' + this.authToken, 'POST', {
        'updates': updates
    });

    console.log("Got " + JSON.stringify(res));

    if(res == undefined || res['error'] == true) {
        throw new Error("Unable to update user");
    } else {
        this.bind(res);
        return this;
    }

}

if (typeof window === 'undefined') {
    // We're in node!
    module.exports = User;
} else {
    window.User = User;
}