const APIRequest = require('../../public/classes/APIRequest').default;

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
  if(request.error) {
    throw new Error(request.message);
  } else {
    return res;
  }

}

module.exports = GraphQLRequests;