const APIRequest = require('../../public/classes/APIRequest').default;
const Config = require('../../public/config').default;

class CSVRequests {

    /**
     * 
     * Singleton where we write commonly used CSV fetches
     * For example: Get the ownership of a company
     * 
     * @constructor
     * @class CSVRequests
     */
    constructor() {}

}

/**
 * Fetches all useful properties (see ReviewPage) for a loan (in the csv files) searching by the loan's id
 * @param {int} id Id of the loan
 * @returns {Object} A map of properties
 * @throws {Error} When errors encountered in fetching CSV info
 */
CSVRequests.loan = async function(id) {

    console.log("Looking for " + id + "...");

    try {
   
        var metareq = new APIRequest(true);
        var application = await metareq.csv([
            {
                label: 'problem',
                file: Config.StageTwoData,
                property: 18,
                key: id,
                keyindex: Config.StageTwoDataPrimaryKey,
            },
            {
                label: 'business_model',
                file: Config.StageTwoData,
                property: 19,
                key: id,
                keyindex: Config.StageTwoDataPrimaryKey,
            },
            {
                label: 'began_operations',
                file: Config.StageTwoData,
                property: 16,
                key: id,
                keyindex: Config.StageTwoDataPrimaryKey,
            },
            {
                label: 'paid_employees',
                file: Config.StageTwoData,
                property: 26,
                key: id,
                keyindex: Config.StageTwoDataPrimaryKey,
            },
            {
                label: 'ownership_status',
                file: Config.StageTwoData,
                property: 17,
                key: id,
                keyindex: Config.StageTwoDataPrimaryKey,
            },
            {
                label: 'currency',
                file: Config.StageOneData,
                property: 43,
                key: id,
                keyindex: Config.StageOneDataPrimaryKey
            },
            {
                label: 'current_assets',
                file: Config.StageOneData,
                property: 44,
                key: id,
                keyindex: Config.StageOneDataPrimaryKey
            },
            {
                label: 'previous_year_revenue',
                file: Config.StageOneData,
                property: 45,
                key: id,
                keyindex: Config.StageOneDataPrimaryKey
            },
            {
                label: 'loan_purpose_summary',
                file: Config.StageOneData,
                property: 53,
                key: id,
                keyindex: Config.StageOneDataPrimaryKey
            },
            {
                label: 'loan_usage',
                file: Config.StageOneData,
                property: 54,
                key: id,
                keyindex: Config.StageOneDataPrimaryKey
            },
            {
                label: 'loan_benefit_to_revenue',
                file: Config.StageOneData,
                property: 55,
                key: id,
                keyindex: Config.StageOneDataPrimaryKey
            }
        ]);

        console.log("Application:");
        console.log(application);
        
        var votingreq = new APIRequest(true);
        var voting = await votingreq.csv([
            {
                label: 'valid_votes',
                property: 2
            },
            {
                label: 'impact',
                property: 3
            },
            {
                label: 'business',
                property: 4
            },
            {
                label: 'prioritization',
                property: 5
            },
            {
                label: 'kiva_impact',
                property: 6
            },
            {
                label: 'kiva_business',
                property: 7
            },
            {
                label: 'kiva_prioritization',
                property: 8
            },
            {
                label: 'kiva_decision',
                property: 9
            }
        ], Config.VotingData, id, Config.VotingDataPrimaryKey);      
        
        return {
            application: application,
            voting: voting
        };
        
    } catch (error) {
        throw error;
    }
}

exports.default = CSVRequests;