import APIRequest from '../classes/APIRequest.js';
export default class GraphQLRequests {
    
    /**
     * 
     * Singleton where we write commonly used CSV fetches
     * For example: Get the ownership of a company
     * 
     * @constructor
     * @class CSVRequests
     */
    constructor() {}

    /**
     * Fetches all available properties for a loan (in the csv files) searching by the loan's name
     * @param {String} name Name of the loan
     */
    static async loan(name) {
        var request = new APIRequest();
        
    }
}