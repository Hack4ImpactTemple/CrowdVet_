# CrowdVet
Helping Kiva vet its microloan applications

## Project Plan
Here's our [project plan](https://docs.google.com/document/d/1jrIrxAneA-t-oQ2bk3MPt95zJg_WvD7gXU905PUOoTw/edit)

### Team
Temple University's Hack4Impact Chapter
 * Jake Lawrence
 * Nasir K
 * Jared Massa
 * Brendan Manning

## Installing
#### Installing depeendencies
1. Install server dependencies `cd server && npm install && cd ..`
2. Install client dependencies `cd client && npm install && cd ..`
#### Installing MongoDB
1. Tap and Install MongoDB Server `brew tap mongodb/brew && brew install mongodb-community@4.0`
2. Start the server `mongod --config /usr/local/etc/mongod.conf`
3. 
#### Config File/Constants
1. Modify `server/public/config.js`, filling in the appropriate values
2. Modify `client/src/index.js`, replacing the urls in the `loadJS(<url>)` calls with the URL Crowdvet server will be running on.
3. Edit the two url constants at the top of `server/src/public/classes/APIRequest.js`
4. See the `Sensitive Data` Google Doc and follow all steps there.
#### Generating Documentation
1. In the root folder `yuidoc . -o doc` 

### Weird Things you should know
#### Code Sharing
In order to share `Loan.js`, `APIRequest.js`, and `config.js` classes between client and server, I had to make a few tweaks, which you should keep in mind:
1. Because code intended for the server only will require dependencies unavailable on the client, in these three files *use const module = require(....)* inside the requiring function. Do not create any top-level import/require statements
2. Likewise, when requiring one of these "shared" files on the server, you may need to use the form *var Config = require('./public/config.js').default;*
3. On the clientside, prefix each class name with widow *(var loan = new window.Loan())*

#### Third Party Attributions
