import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'

// using ES6 promises here
var PopulateStore = () => {

    let firebaseDB = firebase.database().ref('/').once('value');
    let snapshotRef = null;

    firebaseDB.then((snapshot) => {
        snapshotRef = snapshot;
        Store.dispatch(actions.populateLocations(snapshotRef.val()));
    }).then(() => {
        Store.dispatch(actions.populateShortLocations(snapshotRef.val()));
    }).then(() => {
        Store.dispatch(actions.populateBeers(snapshotRef.val()));
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

        if(data !== null) {
            Store.dispatch(actions.populateUser(user, data));
        } else {
            CreateUser(user.uid);
        }
    });

    // when the child of users changes (so when a beer is saved etc), then we will dispatch an action that updates the users data
    userRef.on('child_changed', function(data) {
        let val = data.val();

        if(data.key === 'beers') {

            console.log(data.key);
            Store.dispatch(actions.saveBeerToUser(val));
        }
    });

    userRef.on('child_removed', function(data) {
        let val = data.val();

        if(data.key === 'beers') {
            Store.dispatch(actions.saveBeerToUser(val));
        }
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

    firebase.database().ref('users/' + uid + '/beers').push({ beer }).then(() => {
        Store.dispatch(actions.showAddNotification(beer, 'beer'));
    }).catch(() => {
        alert('error saving the beer');
    });
}

export function RemoveBeer (beerKey, beerName) {
    let uid = Store.getState().user.uid;

    firebase.database().ref('users/' + uid + '/beers/' + beerKey).remove().then(() => {
        Store.dispatch(actions.showRemoveNotification(beerName, 'beer'));
    });
}

export function CreateBeer (beerObject) {
    firebase.database().ref('beers/').push(beerObject).then(() => {
        // Store.dispatch(actions.showAddNotification(beer, 'beer'));
        alert('beer created');
    }).catch((error) => {
        alert('error saving the beer');
        console.log(error)
    });
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

// initial call to Firebase to set up the DB link. When this is initialised we
// populate the store and then get the current google users data
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
