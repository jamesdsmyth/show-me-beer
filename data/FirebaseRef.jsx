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

    firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {

        var data = snapshot.val();

        console.log(data);

        if(data !== null) {
            console.log(data);
            Store.dispatch(actions.populateUser(user, data));
        } else {
            // need to create the user
            CreateUser(uid);
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

var FirebaseRef = () => {

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
export default FirebaseRef;
