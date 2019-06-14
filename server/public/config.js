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
     * @prop {string} DetailedVotingData: Sample voting data
     */
    DetailedVotingData: (typeof window === 'undefined') ? 'https://raw.githubusercontent.com/Hack4ImpactTemple/CrowdVet_/master/server/data/Kiva_Detailed_Voting_Data.csv' : null,

    /**
     * @prop {string} VotingDataPrimaryKey: Index of the primary key in this file
     */
    VotingDataPrimaryKey: (typeof window === 'undefined') ? 0 : -1,

    /**
     * @prop {string} MongoURL: URL pointing to the mongodb database
     */
    MongoDbURL: (typeof window === 'undefined') ? 'mongodb://localhost:27017' : null,

    /**
     * @prop {string} MongoURL: URL pointing to the mongodb database
     */
    MongoDbName: (typeof window === 'undefined') ? 'crowdvet' : null,

    /**
     * @prop {string} tosUrl: URL for Crowdvet's Terms of Service
     */
    tosUrl: (typeof window === 'undefined') ? null : 'https://ourwebsite1234.com/tos',

    /**
     * @prop {string} privacyUrl: URL for Crowdvet's Privacy Policy
     */
    privacyUrl: (typeof window === 'undefined') ? null : 'https://ourwebsite1234.com/privacy',

    evaluationFeedbackDescriptions: {
        'impact': [
            "This indicates any social enterprise you feel has negative social impact, or takes advantage of people - either the people it claims to serve, or other parties.",
            "This company has no discernable social impact at all. Most for-profit companies fall into this category rating.",
            "This company has one or more of the following: - Questionable social impact; - Social impact based on donations; - Possible social impact that is not integral to the business model.",
            "The social impact model of this company makes sense, but it is not currently being measured clearly and methodically.",
            "The social impact model of this company makes sense, and is being measured clearly and methodically.",
            "The social impact of this company has been documented and tested with a study or similarly rigorous measure, with demonstrated proof. Or, the company is following an established social impact model which has been tested and demonstrated by research."
        ],
        'business_model': [
            "This business is not making money. It is dependant on donations and grants.​",
            "This business has some income, but is mostly dependent on grants and donations, somewhere around a 20:80 ratio.",
            "This company has raised cash capital, but has minimal sales, or questionably low sales volume considering its current lifespan.​",
            "This company is on the road to profitability - the business model has clear potential, it seems a barrier is the current lack of working capital.",
            "This business does not display robust profits, as it is reinvesting its profit into growth of the company.",
            "This company is already healthily profitable and sustainable, and has the ability to scale.​"
        ],
        'prioritization': [
            "I really wouldn’t recommend moving forward with this enterprise.",
            "I don’t like it. It might be profitable, but social impact is questionable; It might have great social impact, but business model has significant holes. I don’t think this is for Kiva.",
            "I’m not sold on this. This isn’t a clear ‘yes’ for Kiva.",
            "This sounds suitable for Kiva. I would recommend considering this.",
            "This sounds mostly great. Only a few minor concerns with business model/social enterprise/other.",
            "This is a definite yes. If everything checks out, let’s send this to crowdfunding right now."
        ]
    }

}

if (typeof window === 'undefined') {
    exports.default = Config;
} else {
    window.Config = Config;
}
