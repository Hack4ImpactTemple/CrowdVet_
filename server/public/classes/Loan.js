if (typeof window === 'undefined') {

    const deepmerge = require('deepmerge')
    const GraphQLRequests = require('../../src/api/GraphQLRequests');

}

class Loan {

    /**
     * 
     * Loan is meant to be shared between server and client side code
     * It's properties match those in the GraphQL scheme (insofar as possible)
     * 
     * It's constructor takes no arguments. All properties must be set with the
     * results of a GraphQL API call/MongoDB call.
     * 
     * However: Note that contained objects, like 'geocode' or 'image' that have
     * their own types in the GraphQL API do not have their own types here. They
     * are simply treated as vanilla JSON objects
     * 
     * @class Loan
     * @constructor
     */
    constructor() {}

    /**
     * 
     * Binds matching properties in your input object to the Loan object, making sure that no new top-level properties are created.
     * 
     * @method bind
     * @param {Object} object object whose properties can be found in Loan.js. We will deep update this Loan object witht the values in your object. Perhaps this object is the result of a call to the GraphQL/MongoDB api?
     * @throws {Error} If your input object has a top-level property that doesn't exist in the Loan object (you are discouraged from created new properties)
     */
    bind(object) {

        var deepmerge = null;
        if (typeof window == 'undefined') {
            deepmerge = require('deepmerge')
        } else {
            deepmerge = window.deepmerge;
        }

        this._fromObject(deepmerge(this._toObject(), object));
    }

    /**
     * 
     * Internal method which creates a copy of the Loan object's properties/values
     * 
     * @method toObject
     * @return {Object} A copy of this Loan object (excluding methods, etc)
     */
    _toObject() {
        var obj = {};
        for (var prop in this) {
            obj[prop] = this[prop];
        }
        return obj;
    }

    /**
     * Copies key/value pairs from this object into their matching variable in this Loan object
     * @param {Object} object JSON key/value object
     */
    _fromObject(object) {
        for (var prop in object) {
            this[prop] = object[prop];
        }
    }
}

/**
 * Contructs a new Loan object using a Loan ID
 * @param {int} id ID of the loan 
 */
Loan.fromId = async function(id) {

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

    // This may fail (for instance, if a loan does not exist)
    // In that case, just pass errors "up the ladder" and handle
    // this in our routing handlers in index.js
    try {
        var loan = new Loan();
        var graphqldata = await GraphQLRequests.loan(id);

        //console.log("GraphQL Data:");
        //console.log(JSON.stringify(graphqldata));

        var csvdata = await CSVRequests.loan(id);
        loan.bind({
            meta: graphqldata['data']['lend']['loan']
        });
        loan.bind(csvdata);
        return loan;
    } catch (error) {
        throw new Error(error.message);
    }
}

if (typeof window === 'undefined') {
    // We're in node!
    module.exports = Loan;
} else {
    window.Loan = Loan;
}