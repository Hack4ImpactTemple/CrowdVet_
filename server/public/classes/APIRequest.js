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

        if (typeof window === 'undefined') {
            const Config = require('../config.js').default;
        } else {
            window.APIRequest = APIRequest;
        }

        // This is especially important!!
        this.servermode = (invokerIsServer != undefined) ? invokerIsServer : false;
        
        // Configure the endpoints
        this.serverendpoint = 'http://localhost:4567/';

        /**
         * @var {string} graphqlendpoint Kiva's GraphQL endpoint
         */
        this.graphqlendpoint = 'https://api.kivaws.org/graphql';

        /**
         * @var {string} csvfile currently active csv file against which all csv parse requests will be made. Unlike serverendpoing and graphqlendpoint, this will need to be changed quite frequently
         */
        this.csvfile = null;
        this.csvfiles = ['/../../data/DSE-Loan-Inquiry-Stage-I-.csv', '/../../data/DSE-Loan-Application-Stage-II-.csv' ]

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
     * 
     * @function graphph Requests data from the Kiva GraphQL

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
            json = this._clean(json);
        } catch (error) {
            console.error(error);
        }

        // We're finished
        this.done;

        // Was some kind of error encountered on our end?
        if(response == undefined || json == undefined) {
            this._error("An error occured while fetching data from GraphQL");
            return;
        }

        // Was some kind of error encountered on Kiva's end
        if(json['errors'] != undefined && json['errors'].length > 0) {
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
     * 
     * @function csv "Search CSV files for some info"
     * 
     * @param {Object[]} search Array of search targets. Properties for each object shown below
     * @param {string} search[i].label Label for this value in the resulting associative array
     * @param {string} search[i].file File path to CSV file
     * @param {int} search[i].property Index of the property to get
     * @param {*} search[i].key Will be matched exactly to the primary key of a row
     * @param {int} search[i].keyindex What row index is the primary key on
     * @param {string?} file All requests will be made to the same on the same CSV file
     * @param {string?} key All requests will be requesting for the same key
     * @param {string?} keyindex All requests will be made using the same keyindex (usually used in conjunction with the "key" param)
     * [
     *   { 
     *     label: '<label for this value in the resulting associative array>'
     *     file: '<file name>'
     *     property: <column index>
     *     key: <match Loan name>
     *     keyindex: <column index of the name>
     *   }
     * ]
     * @throws {Error} Common error: Results for a key are 0 or > 1.
     * @returns {Object} A JSON object mapping labels from the search object to values
     * {
     *    'name': 'Dance Peace',
     *    'business_plan': 'We will sell tshirts with our logo...'
     * }
     */
    async csv(search, file, key, keyindex) {
        var rows = {};
        var result = {};
        for(var searchobj of search) {

            if(file != undefined) {
                searchobj['file'] = file;
            }

            if(key != undefined) {
                searchobj['key'] = key;
            }

            if(keyindex != undefined) {
                searchobj['keyindex'] = keyindex;
            }

            try {
                
                // If we're accessing the same file, indexed by the same key, with the same search parameter
                // .. we're getting the exact same row. Instead of repeatedly fetching the same row, cache
                // .. it in the rows object.
                var rowhash = this._sanitize(searchobj['file'] + "_" + searchobj['key'] + "_" + searchobj['keyindex']);
                if(rows[rowhash] == undefined) {
                    rows[rowhash] = await this._rowInFor(searchobj['file'], searchobj['key'], searchobj['keyindex']);
                } 

                // Save the value of the cell to our results tree, mapped to the
                // .. convienence label it was given in searchobj
                result[searchobj['label']] = rows[rowhash][searchobj['property']];
            } catch (error) {
                throw error;
            }
        }
        return result;
    }

    /**
     * Gets the row for a project with the given name in the given CSV file
     * @param {string} file Path to CSV file
     * @param {string} key Match this search key (will be matched used javascript == operator)
     * @param {int} keyindex What index is the primary key in?
     * @param {function} customComparator (Optionally) Instead of using JavaScript == to compare keys, use this function (value, key) -> Bool. This could be useful in using case insensitive comparators, checking just if the first word is equal, etc. This is optional.
     * @return {Object[]} A (nullable) array of values (a single row from the CSV file)
     */
    async _rowInFor(file, key, keyindex, customComparator) {
        
        const fetch = require("node-fetch");
        const Papa = require('papaparse');
        const fs = require('fs');

        // Get the data from the csv file
        var filecontents = await fetch(file)
        var text = await filecontents.text();

        var result = await Papa.parse( text , {
            delimiter: ',',
            dynamicTyping: true
        });

        var results = 0;
        var row = null;
        
        for(var i = 0; i < result['data'].length; i++) {     

            //console.log("\t key index: " + keyindex + "          key: " + key + "       value(" + i + ") " + result['data'][i][keyindex]);

            // Does this row's primary key match the search parameter
            var matches = false;
            if(customComparator == undefined) {
                if(result['data'][i][keyindex] + "" === key + "") {
                    matches = true;
                }    
            } else {
                matches = customComparator(result['data'][i][keyindex], key);
            }

            // Keep track of the number of matches (we shouldn't have more than one)
            if(matches) {
                results++;
                row = result['data'][i];
                break;
            }
        }

        // We should have EXACTLY one result
        if(results == 0) {
            throw new Error("No rows matched this query.");
        }
        if(results > 1) {
            throw new Error(results + " rows matched this query.");
        }
            
        return this._clean(row);
        
    }

    /**
     * Requests data from the Node.JS server at a given endpoint
     * @param {String} endpoint The REST path to hit (ex: '/loan/1234') 
     * @param {String} method A valid HTTP request mode (GET, POST, PUT, DELETE, etc)
     * @param {Object?} data (Optionally) JSON data to send with the requst (usually used when method is POST)

     * @throws {Error} If the method is called from the wrong context/environment
     * @returns {Object} JSON response from the API
     */
    async endpoint(endpoint, method, data) {

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
            response = await fetch(this.serverendpoint + endpoint, {
                method: (method == undefined) ? 'GET' : method,
                headers: { 'Content-Type': 'application/json' },
                body: (data != undefined) ? JSON.stringify(data) : null
            })
            json = await response.json();
            json = this._clean(json);
        } catch (error) {}

        // We're finished
        this.done;

        // Was some kind of error encountered on our end?
        if(response == undefined || json == undefined) {
            this._error("An error occured while fetching data from GraphQL");
            return;
        }

        // Was some kind of error encountered on Kiva's end
        if(json['errors'] != undefined && json['errors'].length > 0) {
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

        // Check for the other error syntax
        if(json['error'] == true) {
            this._error(json['message']);
            return;
        }

        return json;
        
    }

    _error(message) {
        this.error = true;
        this.message = message;
    }

    _clean(json) {
        return JSON.parse(JSON.stringify(json).replace(/\uFFFD/g, ''));
    }

    _sanitize(str) {
        return str.replace(/[\W_]+/g,"_");
    }

}
if (typeof window === 'undefined') {
    exports.default = APIRequest;
} else {
    window.APIRequest = APIRequest;
}