import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'

var PopulateStore = () => {
    // https://github.com/yelouafi/redux-saga will replace the setTimeouts
    firebase.database().ref('/').once('value').then((snapshot) => {

        Store.dispatch(actions.populateLocations(snapshot.val()));

        setTimeout(() => {
            Store.dispatch(actions.populateShortLocations(snapshot.val()));
        }, 200);

        setTimeout(() => {
            Store.dispatch(actions.populateBeers(snapshot.val()));
        }, 400);
    });
}

// creating the user and adding it to Firebase
var CreateUser = (uid) => {
    firebase.database().ref('users/' + uid).set({
        beers: 'currently no beers',
        locations: 'currently no locations'
    });
}

// getting the user data from Firebase
var GetUserData = (user) => {

    let userRef = firebase.database().ref('/users/' + user.uid);

    userRef.once('value').then((snapshot) => {

        var data = snapshot.val();

        console.log(data);

        if(data !== null) {
            Store.dispatch(actions.populateUser(user, data));
        } else {
            CreateUser(user.uid);
        }
    });

    userRef.on('child_changed', function(data) {
        let val = data.val();

        if(data.key === 'beers') {
            Store.dispatch(actions.saveBeer(val));
        }
    });

    userRef.on('child_removed', function(data) {
        alert('removed');
    });

}

var GetCurrentUser = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        GetUserData(user);
      } else {
          console.log('no one is currently signed in');
      }
    });
}

export function SaveBeer (beer) {
    let uid = Store.getState().user.uid;

    firebase.database().ref('users/' + uid + '/beers').push({
        beer
    });
}

export function SaveLocation (location) {

}

export function SignUserIn () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
}

export function SignUserOut () {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      Store.dispatch(actions.signOutUser());
    }, function(error) {
      alert('an error occurred when signing out');
    });
}

export function FirebaseRef () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA7JwFHnI-I84gPBWPqklQrgPLtT1ijD58",
        authDomain: "show-me-beer.firebaseapp.com",
        databaseURL: "https://show-me-beer.firebaseio.com",
        storageBucket: "show-me-beer.appspot.com",
    };
    firebase.initializeApp(config);

    PopulateStore();
    GetCurrentUser();
}
