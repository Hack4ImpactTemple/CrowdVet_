import Url from 'domurl';
var firebase = require('firebase');
var firebaseui = require('firebaseui');

// put firebase creds here


const configureLoginStateCallbacks = async function () {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {

            // We will need this to authenticate with the server
            var authToken = await user.getIdToken();

            window.user = new window.User(user.uid, authToken);
            await window.user.init();

            // Bind properties from Firebase to the local user object
            window.user.displayName = (user.displayName != null) ? user.displayName : "Hello friend!";
            window.user.email = user.email;
            window.user.emailVerified = user.emailVerified;
            window.user.photoURL = (user.photoURL != null) ? user.photoURL : window.location.protocol + "//" + window.location.host + '/img/ProfileIcon.png';
            window.user.id = user.uid;
            window.user.providerData = user.providerData;
            window.user.authToken = authToken;

            // Also keep track of loggedin status as a boolean
            window.loggedIn = true;

            // This is relly helpful to have in the terminal
            console.log(JSON.stringify(user));


            // Update the UI
            document.getElementById('sign-out-toggle').style.display = 'inline-block';
            document.getElementById('profile-header-icon-sign-in').style.display = 'none';
            document.getElementById('profile-header-text').innerHTML = window.user.displayName;
            document.getElementById("profile-header-image").src = window.user.photoURL;
            document.getElementById("profile-header-image").style.display = '';

            // if we're on a page with ProfileLead
            if (document.getElementById('profile-section-loading')) {
                document.getElementById('profile-section-loading').style.display = 'none';
                document.getElementById('profile-lead-content').style.display = 'flex';
                document.getElementById('profile-lead-content').classList.toggle('blur');
                document.getElementById('profile-lead-headshot').src = window.user.photoURL;
                document.getElementById('profile-lead-name').innerText = window.user.displayName;
            }

            // if(window.href.endsWith('profile')){}

            // TODO: - Does this work?
            setInterval(30, function () {
                alert("Might refresh...")
                refreshToken();
            });

        } else {
            // if we're on a page with ProfileLead
            if (document.getElementById('profile-section-loading')) {
                document.getElementById('profile-section-loading').style.display = 'none';
                document.getElementById('profile-lead-content').style.display = 'flex';
                document.getElementById('login-text').style.display = 'flex';
            }

            // User is signed out.
            window.user = null;
            window.loggedIn = false;
            document.getElementById('sign-out-toggle').style.display = 'none';
            document.getElementById("profile-header-image").style.display = 'none';
            document.getElementById('profile-header-icon-sign-in').style.display = '';
            document.getElementById('profile-header-text').innerHTML = "Login";

        }


    }, function (error) {
        console.log(error);
    });
};

const refreshToken = async function () {
    var before = window.user.token;
    var token = await firebase.auth().currentUser.getIdToken();
    window.user.token = token;
    console.log("Changed? " + (before != token));
}


const configureLoginUI = async function () {

    getRedirectUrl();

    // I don't like some of their CSS, so override it
    document.head.innerHTML += '<style>.firebaseui-list-item { background-color: \'white\' !important}</style>';

    // FirebaseUI config.
    var uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: getRedirectUrl(),
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
            }
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: window.Config.tosUrl,
        // Privacy policy url/callback.
        privacyPolicyUrl: function () {
            window.location.assign(window.Config.privacyUrl);
        }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    if (document.getElementById("firebaseui-auth-container") != undefined) {
        ui.start('#firebaseui-auth-container', uiConfig);
    }
}

function getRedirectUrl() {
    var url = new Url();
    if (url.query['continue'] != undefined) {
        return url.query['continue'];
    } else {
        return "/";
    }
}

export {
    initApp,
    configureLoginStateCallbacks,
    configureLoginUI
}
