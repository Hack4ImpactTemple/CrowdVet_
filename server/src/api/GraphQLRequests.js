import APIRequest from '../../public/classes/APIRequest'
export default class GraphQLRequests {

    /**
     * 
     * Singleton where we write commonly used GraphQL fetches
     * For example: Get loan by id, Update loan to say user 34 already reviewed 
     * 
     * @constructor
     * @class GraphQLRequests
     */
    constructor() {}

    /**
     * Fetches all available properties from a loan by id
     * @param {int} id Loan id
     */
    static async loan(id) {
        var request = new APIRequest(true);
        return await request.graphql(`
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

    }
}