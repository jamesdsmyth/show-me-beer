import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'

// using ES6 promises here
const PopulateStore = () => {

    let firebaseDB = firebase.database().ref('/').once('value');
    let snapshotRef = null;

    firebaseDB.then((snapshot) => {
        snapshotRef = snapshot;
        Store.dispatch(actions.populateBeers(snapshotRef.val()));
    }).then(() => {
        Store.dispatch(actions.populateLocations(snapshotRef.val()));
    });
}

// creating the user and adding it to Firebase
const CreateUser = (uid) => {
    firebase.database().ref('users/' + uid).set({
        beers: 'currently no beers',
        locations: 'currently no locations'
    });
}

// getting the user data from Firebase
const GetUserData = (user) => {

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
            console.log(val);
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

const GetCurrentUser = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        GetUserData(user);
      } else {
          console.log('no one is currently signed in');
      }
    });
}

export function SaveBeer (beerUID, beerName) {

    let uid = Store.getState().user.uid;
    let newBeerKey = firebase.database().ref().child('beers').push().key;
    let beerObject = {"uid": beerUID};

    var updates = {};
    updates['/users/' + uid + '/beers/' + newBeerKey] = beerObject;

    return firebase.database().ref().update(updates).then(value => {
        Store.dispatch(actions.showAddNotification(beerName, 'beer'));
    }).catch(error => {
        alert('error saving the beer');
    });
}

// passing the key of the saved beer within the user so we can remove it
export function RemoveBeer (beerSavedKey, beerName) {
    let uid = Store.getState().user.uid;

    firebase.database().ref('users/' + uid + '/beers/' + beerSavedKey).remove().then(() => {
        Store.dispatch(actions.showRemoveNotification(beerName, 'beer'));
    });
}

// function that gets the beerObject and uploads the image associated with it.
export function CreateBeer (beerObject) {

    let storage = firebase.storage();
    let storageRef = storage.ref();

    var file = document.getElementById('photo').files[0];

    var metadata = {
        contentType: file.type
    };

    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;

            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

            case 'storage/canceled':
            // User canceled the upload
            break;

            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
    }, function() {
        // Upload completed successfully, now we can write the beer to the db and add the beer relationship to the locations

        beerObject.photo = uploadTask.snapshot.downloadURL;

        var newBeerKey = firebase.database().ref().child('beers').push().key;

        var updates = {};
        updates['/beers/' + newBeerKey] = beerObject;


        // adding the beer reference to the location object
        for(var i = 0; i < beerObject.locations.length; i++) {

            let beerUidObject = {
                uid: newBeerKey
            }

            let newlocationBeerKey = firebase.database().ref().child('locations/beers').push().key;

            updates['/locations/' + beerObject.locations[i].uid + '/beers/' + newlocationBeerKey] = beerUidObject;
        }

        return firebase.database().ref().update(updates).then(value => {
            alert('beer has been saved');
        }).catch(error => {
            alert('beer has not been saved');
        });
    });
}

export function CreateLocation (locationObject) {

    let storage = firebase.storage();
    let storageRef = storage.ref();

    var file = document.getElementById('photo').files[0];

    var metadata = {
        contentType: file.type
    };

    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;

            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

            case 'storage/canceled':
            // User canceled the upload
            break;

            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
    }, function() {
        // Upload completed successfully, now we can write the beer to the db and add the beer relationship to the locations

        locationObject.photo = uploadTask.snapshot.downloadURL;

        var newLocationKey = firebase.database().ref().child('locations').push().key;

        var updates = {};
        updates['/locations/' + newLocationKey] = locationObject;


        // adding the beer reference to the location object
        // for(var i = 0; i < locationObject.beers.length; i++) {
        //
        //     let locationUidObject = {
        //         uid: newLocationKey
        //     }
        //
        //     let newlocationBeerKey = firebase.database().ref().child('beers/locations').push().key;
        //
        //     updates['/beers/' + locationObject.beers[i].uid + '/beers/' + newlocationBeerKey] = beerUidObject;
        // }

        return firebase.database().ref().update(updates).then(value => {
            alert('location has been saved');
        }).catch(error => {
            alert('location has not been saved');
        });
    });
}

export function SignUserIn () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
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
    let config = {
        apiKey: "AIzaSyA7JwFHnI-I84gPBWPqklQrgPLtT1ijD58",
        authDomain: "show-me-beer.firebaseapp.com",
        databaseURL: "https://show-me-beer.firebaseio.com",
        storageBucket: "show-me-beer.appspot.com",
    };
    firebase.initializeApp(config);

    PopulateStore();
    GetCurrentUser();
}
