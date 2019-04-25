/*
 * 
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
 * @class Config
 */
var Config = {

    /**
     * @property {int} port: Port to operate this service on (1-65535)
     */
    port: (typeof window === 'undefined') ? 4567 : null,

    /**
     * @property {string} serverendpoint: URL where this server can be reached (trailing slash required)
     */
    serverendpoint: 'http://localhost:4567/',

    /**
     * @property {string} graphqlendpoint: Kiva's GraphQL endpoint
     */
    graphqlendpoint: 'https://api.kivaws.org/graphql',

    /**
     * @prop {string} StageOneData: Sample csv data file (part 1)
     */
    StageOneData: (typeof window === 'undefined') ? 'https://raw.githubusercontent.com/Hack4ImpactTemple/CrowdVet_/master/server/data/Kiva_DSE_Stage_1.csv' : null,
    
    /**
     * @prop {string} StageOneDataPrimaryKey: Index of the primary key in this file
     */
    StageOneDataPrimaryKey: (typeof window === 'undefined') ? 0 : -1,

    /**
     * @prop {string} StageOneData: Sample csv data file (part 2)
     */
    StageTwoData: (typeof window === 'undefined') ? 'https://raw.githubusercontent.com/Hack4ImpactTemple/CrowdVet_/master/server/data/Kiva_DSE_Stage_2.csv' : null,
    
    /**
     * @prop {string} StageTwoDataPrimaryKey: Index of the primary key in this file
     */
    StageTwoDataPrimaryKey: (typeof window === 'undefined') ? 0 : -1,

    /**
     * @prop {string} VotingData: Sample voting data
     */
    VotingData: (typeof window === 'undefined') ? 'https://raw.githubusercontent.com/Hack4ImpactTemple/CrowdVet_/master/server/data/Kiva_Voting_Data.csv' : null,

    /**
     * @prop {string} VotingDataPrimaryKey: Index of the primary key in this file
     */
    VotingDataPrimaryKey: (typeof window === 'undefined') ? 0 : -1,

}

if (typeof window === 'undefined') {
    exports.default = Config;
} else {
    window.Config = Config;
}