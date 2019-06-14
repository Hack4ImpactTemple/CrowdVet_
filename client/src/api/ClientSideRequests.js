export default class ClientSideRequests {

    /**
     * Endpoint string for GET loan 
     * @param {int} id Loan id
     * @returns {String} API endpoint for getting loan by id
     */
    static loan(id) {
        return 'loan/' + id;
    }
}