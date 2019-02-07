
class APIRequest {
    async graphql(endpoint, query) {

        // Fetch the endpoint contents
        var response = undefined;
        var json = undefined;
        try {
            response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query }),
            })
            json = await response.json();
        } catch (error) { }


        // Was some kind of error encountered?
        if(response == undefined || json == undefined) {
            throw new Error("We could not fetch the API content");
            return;
        }

        return json;

    }    
}
 
function conforms(o, t) {
    switch(t) {
        case T.I: return typeof o;
        case T.D: return typeof o;
        case T.S: return typeof o;
        case T.O: return typeof o;
        default: return false;
    }
}

var T = Object.freeze({
    "I": 1,
    "D": 2,
    "S": 3,
    "O": 4
});

export { GraphQLRequest, T }