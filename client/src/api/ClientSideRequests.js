export default class ClientSideRequests {
    
    /**
     * Shared functions which construct "endpoint strings" for API requests.
     * For examle: loan(id) returns "loan/{id}" 
     * Purpose: If we ever change the URL schema of our NodeJS server, we only need to update the URLs in this one file
     * @constructor
     * @class ClientSideRequests
     */
    constructor() {}

    /**
     * Endpoint string for GET loan 
     * @param {int} id Loan id
     * @returns {String} API endpoint for getting loan by id
     */
    static loan(id) {
        return 'loan/' + id;
    }
}