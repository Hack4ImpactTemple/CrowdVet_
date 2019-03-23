if (typeof window === 'undefined') {

    const deepmerge = require('deepmerge')
    const GraphQLRequests = require('../../src/api/GraphQLRequests');

}


class User {

    constructor() {
        this.id = null;
    }

    /**
     * 
     * Binds matching properties in your input object to the User object, making sure that no new top-level properties are created.
     * 
     * @method bind
     * @param {Object} object object whose properties can be found in User.js. We will deep update this User object witht the values in your object. Perhaps this object is the result of a call to the GraphQL/MongoDB api?
     * @throws {Error} If your input object has a top-level property that doesn't exist in the User object (you are discouraged from created new properties)
     */
    bind(object) {

        var deepmerge = null;
        
        if (typeof window == 'undefined') {
            deepmerge = require('deepmerge')
        } else {
            deepmerge = window.deepmerge;
        }

        // On the server side, update this in the mongodb
        if (typeof window !== 'undefined') {
            const MongoClient = require('mongodb').MongoClient;
            const url = 'mongodb://localhost:27017';
            const Config = require('../config.js').default;

            const client = new MongoClient(Config.MongoDbURL);

            try {
                
                // Connect to the database
                client.connect();
                var db = client.db(Config.MongoDbName);

                // Get the users collection
                var res = db.collection('users').updateOne({
                    id: this.id
                }, {
                    $set: object
                });

                console.log(JSON.stringify(res));

                return true;

            } catch (error) {
                throw error;
            }

        }

        // Update the local properties of this object
        this._fromObject(deepmerge(this._toObject(), object));

    }

    /**
     * 
     * Internal method which creates a copy of the User object's properties/values
     * 
     * @method toObject
     * @return {Object} A copy of this User object (excluding methods, etc)
     */
    _toObject() {
        var obj = {};
        for (var prop in this) {
            obj[prop] = this[prop];
        }
        return obj;
    }

    /**
     * Copies key/value pairs from this object into their matching variable in this User object
     * @param {Object} object JSON key/value object
     */
    _fromObject(object) {
        for (var prop in object) {
            this[prop] = object[prop];
        }
    }
}

/**
 * Contructs a new User object using a User ID
 * @param {int} id ID of the User 
 */
User.fromId = async function(id) {

    this.id = id;

    // If we're on the client side, we can't use this because
    // we won't have access to the GraphQL requests class
    // (I can open this back up later by moving GraphQLRequests to public)
    if (typeof window !== 'undefined') {
        throw new Error("Cannot call this method on the client side")
    }

    // Since this require will break in a browser environment, we cannot
    // leave it at the top of this file.
    // Instead, we require it inside the function where we use it
    const GraphQLRequests = require('../../src/api/GraphQLRequests');
    const CSVRequests = require('../../src/api/CSVRequests').default;

    // This may fail (for instance, if a User does not exist)
    // In that case, just pass errors "up the ladder" and handle
    // this in our routing handlers in index.js
    try {
        var user = new User();
        var graphqldata = await GraphQLRequests.user(id);

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Allow the user to be updated via API autoMAGICALLY
 * @param {Object} updates A JSON tree of updates to be added. Duplicate properties will be overwritten, new properties will simply be added
 * @returns {Object} The json response returned by the server (This should probably have an 'error' or 'success' property or something like it) 
 */
User.update = async function(id, updates) {
    
    // If we're doing this on the server side
    if (typeof window === 'undefined') {
        throw new Error("Cannot call this method on the server side. Should use bind instead")
        return false;
    }

    // If this hasn't been inited yet
    if(this.id == null) {
        return false;
    }
    
    var req = new window.APIRequest();
    var res = await req.endpoint('/user/' + this.id + '/update', 'POST', updates);

    alert(JSON.stringify(res));

    this.bind(id, updates);

}

if (typeof window === 'undefined') {
    // We're in node!
    module.exports = User;
} else {
    window.User = User;
}