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
3. You can access the local mongob concole by running `mongo`
#### Config File/Constants
1. Modify `server/public/config.js`, filling in the appropriate values
2. Modify `client/src/index.js`, replacing the urls in the `loadJS(<url>)` calls with the URL Crowdvet server will be running on.
3. Edit the two url constants at the top of `server/src/public/classes/APIRequest.js`
4. See the `Sensitive Data` Google Doc and follow all steps there.
#### Generating Documentation
1. In the root folder `yuidoc . -o doc`
#### Setting up the dev environment
(Use three different terminal windows for this)
1. Open the `server` folder and run `yarn start`
2. Open the `client` folder and run `yarn start`
3. As described above, start the server `mongod --config /usr/local/etc/mongod.conf`

### Weird Things you should know
#### Code Sharing
In order to share `Loan.js`, `APIRequest.js`, and `config.js` classes between client and server, I had to make a few tweaks, which you should keep in mind:
1. Because code intended for the server only will require dependencies unavailable on the client, in these three files *use const module = require(....)* inside the requiring function. Do not create any top-level import/require statements
2. Likewise, when requiring one of these "shared" files on the server, you may need to use the form *var Config = require('./public/config.js').default;*
3. On the clientside, prefix each class name with widow *(var loan = new window.Loan())
#### User object nonsense
On the client side, the user object can be easily accessed and manipulated through `window.user`. Whatever changes you make through the `await window.user.update` function will be reflected in the browser and on the server. Overall this should make for a fluid experience, however, there are a few things you should know.
* `window.user` is nullable. A null window.user can mean that we are logged out or have not finished loading data yet. Therefore, this is a poor way to check authentication/loaded state.
* To check if the user is logged in, check `window.loggedIn`. If this is `true` the user is logged in (though perhaps not fully loaded yet). If this is either `false` or `null` the user is logged out or not loaded yet.
* To redirect away from pages that do not work for logged out users, implement the `allowRedirectIfDesired()` method in your page's builder object, like so ``` allowRedirectIfDesired() {
    if(window.loggedIn == false || window.loggedIn == null) {
      window.location.href = '/login';
    }
  } ```
* For pages that require all user data to be loaded. You can render null content for your page when `window.user.inited != true`. To ensure that your page reloads when the user object becomes fully available, implement `rerenderOnUserLoaded` in your builder, like so ``` rerenderOnUserLoaded() {
    return true;
  } ```

#### Third Party Attributions
* https://fontawesome.com/license
* Using progress loader code from https://www.w3schools.com/howto/howto_css_loader.asp
* A lot more we have to add
