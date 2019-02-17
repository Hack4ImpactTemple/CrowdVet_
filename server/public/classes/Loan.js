
if (typeof window === 'undefined') {
    console.log("WE'RE IN NODE JS AHHHHHH")
    // We're in node!
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
    constructor() {

        this.id = null;
        this.name = null;
        this.image = null;
        this.loanAmount = null;
        this.description = null;
        this.fundraisingDate = null;
        this.geocode = null;
        this.sector = null;
        this.use = null;
        this.video = null;
        this.whySpecial = null;

    }

    /**
     * Contructs a new Loan object using a Loan ID
     * @param {int} id ID of the loan 
     */
    static async fromId(id) {

        const deepmerge = require('deepmerge')
        const GraphQLRequests = require('../../src/api/GraphQLRequests');

        var data = await GraphQLRequests.loan(id);
        var loan = new Loan();
        loan.bind(data['data']['lend']['loan']);
        return loan;
    }

    /**
     * 
     * Binds matching properties in your input object to the Loan object, making sure that no new top-level properties are created.
     * 
     * @method bind
     * @param {Object} object object whose properties can be found in Loan.js. We will deep update this Loan object witht the values in your object. Perhaps this object is the result of a call to the GraphQL/MongoDB api?
     * @throws {Error} If your input object has a top-level property that doesn't exist in the Loan object (you are discouraged from created new properties)
     */
    bind(object) {
        for(var prop1 in object) {
            var found = false;
            for(var prop2 in this) {
                if(prop1 == prop2) {
                    found = true;
                }
            }
            if(!found) {
                //throw new Error("This bind operation attempted to create a new top-level property in the Loan object");
                //return;
            }
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
        for(var prop in this) {
            obj[prop] = this[prop];
        }
        return obj;
    }

    /**
     * Copies key/value pairs from this object into their matching variable in this Loan object
     * @param {Object} object JSON key/value object
     */
    _fromObject(object) {
        for(var prop in object) {
            this[prop] = object[prop];
        }
    }
}

if (typeof window === 'undefined') {
    // We're in node!
    module.exports = Loan;
} else {
    window.Loan = Loan;
}