import APIRequest from '../../public/classes/APIRequest'

  /**
     * 
     * Singleton where we write commonly used GraphQL fetches
     * For example: Get loan by id, Update loan to say user 34 already reviewed 
     * 
     * @constructor
     * @class GraphQLRequests
     */
function GraphQLRequests() {
}

GraphQLRequests.hi = function() {
  return "hello" };

    /**
     * Fetches all available properties from a loan by id
     * @param {int} id Loan id
     */
GraphQLRequests.loan = async function(id) {
        var request = new APIRequest(true);
        var res = await request.graphql(`
          {
            lend {
              loan(id: ` + id + `) {
                id
                name
                image {
                  id
                  url
                }
                loanAmount
                description
                fundraisingDate
                geocode {
                  city
                  country {
                    name
                    region
                  }
                }
                sector {
                  name
                }
                use
                video {
                  thumbnailImageId
                  youtubeId
                }
                whySpecial
              }
            }
          }
        `);
      return res;
    }

module.exports = GraphQLRequests;