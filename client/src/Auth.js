import Url from 'domurl';
var firebase = require('firebase');
var firebaseui = require('firebaseui');

/**omitted**/

const configureLoginStateCallbacks = async function() {
  firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {

      var authToken = await user.getIdToken();

      window.user = new window.User(user.uid, authToken);
      await window.user.init();

      // User is signed in.
      window.user.displayName = (user.displayName != null) ? user.displayName : "Hello friend!";
      window.user.email = user.email;
      window.user.emailVerified = user.emailVerified;
      window.user.photoURL = (user.photoURL != null) ? user.photoURL : window.location.protocol + "//" + window.location.host + '/img/ProfileIcon.png';
      window.user.id = user.uid;
      window.user.providerData = user.providerData;
      window.user.authToken = authToken;


      console.log(JSON.stringify(user));
      console.log(user.stsTokenManager);

      

      user.getIdToken().then(function(accessToken) {
        
        document.getElementById('profile-header-icon-sign-in').style.display = 'none';
        document.getElementById('profile-header-text').innerHTML = window.user.displayName;
        document.getElementById("profile-header-image").src = window.user.photoURL;
        document.getElementById("profile-header-image").style.display = '';
      });


      setInterval(1000 * 60 * 35, function() {

      });




    } else {

      // User is signed out.
      window.user = null;
      document.getElementById("profile-header-image").style.display = 'none';
      document.getElementById('profile-header-icon-sign-in').style.display = '';
      document.getElementById('profile-header-text').innerHTML = "Login";

    }
  }, function(error) {
    console.log(error);
  });
};

const refreshToken = async function() {
  var newAuthToken = await firebase.auth().currentUser.getIdToken(firebase.auth().currentUser.refreshToken);
}

const configureLoginUI = async function() {

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
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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
    privacyPolicyUrl: function() {
      window.location.assign(window.Config.privacyUrl);
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  if(document.getElementById("firebaseui-auth-container") != undefined) {
      ui.start('#firebaseui-auth-container', uiConfig);
  }
}

function getRedirectUrl() {
  var url = new Url();
  if(url.query['continue'] != undefined) {
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
