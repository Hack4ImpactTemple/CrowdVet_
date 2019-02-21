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
    try {
        var req = new APIRequest(true);
        var result = await req.csv([{
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
                file: Config.StageOneData,
                property: 31,
                key: id,
                keyindex: Config.StageOneDataPrimaryKey,
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
        return result;
    } catch (error) {
        throw error;
    }
}

exports.default = CSVRequests;