class APIRequest {
    
    /**
     * A one-time api request function
     * @constructor
     * @class APIRequest
     * @param {boolean} invokerIsServer Set to true if this class is being used on the server. If you want to do this in another step, see the invokerIsServer() method
     */
    constructor(invokerIsServer) {
        this.done = false;
        this.message = null;
        this.error = false;

        // This is especially important!!
        this.servermode = (invokerIsServer != undefined) ? invokerIsServer : false;
        
        // Configure the endpoints
        this.serverendpoint = 'http://localhost:4567/';
        this.graphqlendpoint = 'https://api.kivaws.org/graphql';

    }

    /**
     * When called, the server-only methods become available to this object 
     * (while the client-only methods become hidden)
     */
    invokerIsServer() {
        this.servermode = true;
    }

    /**
     * Was there an error while performing the request?
     * @return {Boolean} Whether an error occured while fetching
     */
    error() {
        return this.error;
    }

    /**
     * Returns error message, or null if there was no error
     * @return {String} Error message
     */
    message() {
        return this.message;
    }
    
    /**
     * Requests data from the Kiva GraphQL.
     * NOTE: This function can only be called when writing for the Node.js server
     * @param {String} query JSX query in the form of a string (use tick (`) character for a multiline string)
     * @return {Object} JSON response from the query
     */
    async graphql(query) {

        if(!this.servermode) {
            this._error("APIRequest.graphql must be called from a server environment");
            return;
        }

        if(this.done) {
            this._error("DO NOT REUSE APIRequest Objects!!");
            return;
        }

        // Fetch the endpoint contents
        var response = undefined;
        var json = undefined;
        try {
            response = await fetch(this.graphqlendpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query }),
            })
            json = await response.json();
        } catch (error) {}

        // We're finished
        this.done;

        // Was some kind of error encountered on our end?
        if(response == undefined || json == undefined) {
            this._error("An error occured while fetching data from GraphQL");
            return;
        }

        // Was some kind of error encountered on Kiva's end
        if(json['errors'].length != 0) {
            var errors = "";
            for(var e = 0; e < json['errors'].length; e++) {
                if(e != 0) {
                    errors = "\n";
                }
                errors += json['errors'][e]['message'];
            }
            this._error(errors);
            return;
        }

        return json;

    }   
    
    /**
     * Requests data from some form of CSV File (NEED TO IMPLEMENT THIS METHOD).
     * NOTE: This function can only be called when writing for the Node.js server
     */
    async csv() {}

    /**
     * Requests data from the Node.JS server at a given endpoint
     * @param {String} endpoint The REST path to hit (ex: '/loan/1234') 
     * @param {String} method A valid HTTP request mode (GET, POST, PUT, DELETE, etc)
     * @throws {Error} If the method is called from the wrong context/environment
     * @returns {Object} JSON response from the API
     */
    async endpoint(endpoint, method) {

        if(this.servermode) {
            this._error("APIRequest.endpoint called from a server environment");
            return;
        }

        if(this.done) {
            this._error("DO NOT REUSE APIRequest Objects!!");
            return;
        }

        if(endpoint.startsWith("/")) {
            endpoint = endpoint.substring(1);
        }

        var response = undefined;
        var json = undefined;
        try {
            console.log(this.serverendpoint + endpoint);
            response = await fetch(this.serverendpoint + endpoint, {
                method: (method == undefined) ? 'GET' : method,
                headers: { 'Content-Type': 'application/json' }
            })
            json = await response.json();
            this.done = true;
            return json;
        } catch (error) {}

        this.done = true;
        this._error("An unknown error occured while fetching data from REST endpoint " + endpoint);
        return;
        
    }

    _error(message) {
        this.error = true;
        this.message = message;
    }

}

if (typeof window === 'undefined') {
    // We're in node!
    module.exports = APIRequest;
} else {
    window.APIRequest = APIRequest;
}