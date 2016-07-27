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

var GetCurrentUser = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        Store.dispatch(actions.populateUser(user));
      } else {
          console.log('no one is currently signed in')
        // No user is signed in.
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
