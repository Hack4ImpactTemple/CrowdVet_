var Config = {
    
    /**
     * 
     * WARNING: THIS FILE IS BEING SERVED TO THE PUBLIC
     * 
     * To resolve some issues with code sharing, this 
     * config file will be made public at <serverurl>/config.js
     * 
     * For that reason, you must NOT PUT ANY SENSISITIVE INFO 
     * in this file.
     * 
     * The endpoints are okay because they are either already known (as
     * in the case of Kiva's GraphQL) or the client will be making HTTP
     * requests to it anyway (as in the case of our server)
     * 
     * Likewise, the data file names are okay because they depend on __dirname
     * and will not reveal the underlying structure of our server
     * 
     * DO NOT PUT API KEYS OR ANYTHING OF THE LIKE HERE
     * 
     */


    /**
     * @var {int} port Port to operate this service on (1-65535)
     */
    port: (typeof window === 'undefined') ? 4567 : null,

    /**
      * @var {string} serverendpoint URL where this server can be reached (trailing slash required)
     */
    serverendpoint: 'http://localhost:4567/',

    /**
     * @var {string} graphqlendpoint Kiva's GraphQL endpoint
     */
    graphqlendpoint: 'https://api.kivaws.org/graphql',

    /**
     * @var {string} StageOneData Sample csv data file (part 1)
     */
    StageOneData: (typeof window === 'undefined') ? __dirname + '/data/DSE-Loan-Inquiry-Stage-I-.csv' : null,
    
    /**
     * @var {string} StageOneData Sample csv data file (part 2)
     */
    StageTwoData: (typeof window === 'undefined') ? __dirname + '/data/DSE-Loan-Application-Stage-II-.csv' : null
    
}

if (typeof window === 'undefined') {
    exports.default = Config;
} else {
    window.Config = Config;
}