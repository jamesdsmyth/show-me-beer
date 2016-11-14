import Store from '../reducers/CombinedReducers';
import * as actions from '../actions/actions';

// populating both the beer and location states
const PopulateStore = () => {
    firebase.database().ref('/beers').on('value', (snapshot) => {
        Store.dispatch(actions.populateBeers(snapshot.val()));
    });

    firebase.database().ref('/locations').on('value', (snapshot) => {
        Store.dispatch(actions.populateLocations(snapshot.val()));
    });
};

// creating the user and adding it to Firebase
const CreateUser = (uid) => {
    firebase.database().ref(`users/  ${uid}`).set({
        beers: 'currently no beers',
        locations: 'currently no locations'
    });
};

// getting the user data from Firebase
const GetUserData = (user) => {
    const userRef = firebase.database().ref(`/users/ ${user.uid}`);

    userRef.once('value').then((snapshot) => {
        const data = snapshot.val();

        if (data !== null) {
            Store.dispatch(actions.populateUser(user, data));
        } else {
            CreateUser(user.uid);
        }
    });

    // when the child of users changes (so when a beer is saved etc), then we will dispatch an action that updates the users data
    userRef.on('child_changed', (data) => {
        const val = data.val();

        if (data.key === 'beers') {
            console.log(data.key);
            console.log(val);
            Store.dispatch(actions.saveBeerToUser(val));
        }
    });

    userRef.on('child_removed', (data) => {
        const val = data.val();

        if (data.key === 'beers') {
            Store.dispatch(actions.saveBeerToUser(val));
        }
    });
};

const GetCurrentUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            GetUserData(user);
        } else {
            console.log('no one is currently signed in');
        }
    });
};

// save beer to the user (gold star)
export function SaveBeer(beerUID, beerName) {
    const uid = Store.getState().user.uid;
    const newBeerKey = firebase.database().ref().child('beers').push().key;
    const beerObject = { uid: beerUID };

    const updates = {};
    updates[`/users/ ${uid} /beers/ ${newBeerKey}`] = beerObject;

    return firebase.database().ref().update(updates).then((value) => {
        console.log(value);
        Store.dispatch(actions.showAddNotification(beerName, 'beer'));
    })
    .catch((error) => {
        console.log(error);
        alert('error saving the beer');
    });
}

// passing the key of the saved beer within the user so we can remove it (grey star)
export function RemoveBeer(beerSavedKey, beerName) {
    const uid = Store.getState().user.uid;

    firebase.database().ref(`users/ ${uid} /beers/ ${beerSavedKey}`).remove().then(() => {
        Store.dispatch(actions.showRemoveNotification(beerName, 'beer'));
    });
}

// function that gets the beerObject and uploads the image associated with it.
export function CreateBeer(beerObject) {
    const storage = firebase.storage();
    const storageRef = storage.ref();

    const metadata = {
        contentType: beerObject.photo.type
    };

    const uploadTask = storageRef.child(`images/ ${beerObject.photo.name}`).put(beerObject.photo, metadata);

    Store.dispatch(actions.beerSubmitted());

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(`Upload is ${progress} % done`);

        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;

        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;

        default:
            console.log('Upload is running');
            break;
        }
    }, (error) => {
        console.log(error.code);

        Store.dispatch(actions.creationOfBeerFailure());
    }, () => {
        // Upload completed successfully, now we can write the beer to the db and add the beer relationship to the locations

        const obj = beerObject;

        obj.photo = uploadTask.snapshot.downloadURL;

        const newBeerKey = firebase.database().ref().child('beers').push().key;

        const updates = {};
        updates[`/beers/ ${newBeerKey}`] = obj;


        // adding the beer reference to the location object
        for (let i = 0; i < obj.locations.length; i++) {
            const beerUidObject = {
                uid: newBeerKey
            };

            const newlocationBeerKey = firebase.database().ref().child('locations/beers').push().key;

            updates[`/locations/ ${obj.locations[i].uid} /beers/ ${newlocationBeerKey}`] = beerUidObject;
        }

        return firebase.database().ref().update(updates).then((value) => {
            console.log(value);
            Store.dispatch(actions.creationOfBeerSuccess());
        })
        .catch((error) => {
            console.log(error);
            Store.dispatch(actions.creationOfBeerFailure());
        });
    });
}

export function CreateLocation(locationObject) {
    const storage = firebase.storage();
    const storageRef = storage.ref();

    const metadata = {
        contentType: locationObject.photo.type
    };

    const uploadTask = storageRef.child(`images/ ${locationObject.photo.name}`).put(locationObject.photo, metadata);

    Store.dispatch(actions.locationSubmitted());

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(`Upload is ${progress} % done`);

        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;

        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;

        default:
            console.log('default case');
        }
    }, (error) => {
        console.log(error.code);

        Store.dispatch(actions.creationOfLocationFailure());
    }, () => {
        // Upload completed successfully, now we can write the location to the db and add the location relationship to the beers

        obj = locationObject;

        obj.photo = uploadTask.snapshot.downloadURL;

        const newLocationKey = firebase.database().ref().child('locations').push().key;

        const updates = {};
        updates[`/locations/ ${newLocationKey}`] = obj;

        // adding the beer reference to the location object
        for (let i = 0; i < obj.beers.length; i++) {
            const locationUidObject = {
                uid: newLocationKey
            };

            const newlocationBeerKey = firebase.database().ref().child('beers/locations').push().key;

            updates[`/beers/ ${obj.beers[i].uid} /locations/ ${newlocationBeerKey}`] = locationUidObject;
        }


        return firebase.database().ref().update(updates).then((value) => {
            console.log(value);
            Store.dispatch(actions.creationOfLocationSuccess());
        })
        .catch((error) => {
            console.log(error);
            Store.dispatch(actions.creationOfLocationFailure());
        });
    });
}

export function SignUserIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(result);
    }).catch((error) => {
        // Handle Errors here.
        console.log(error);
    });
}

export function SignUserOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        Store.dispatch(actions.signOutUser());
    }, (error) => {
        console.log(error);
    });
}

// initial call to Firebase to set up the DB link. When this is initialised we
// populate the store and then get the current google users data
export function FirebaseRef() {
    // Initialize Firebase
    const config = {
        apiKey: 'AIzaSyA7JwFHnI-I84gPBWPqklQrgPLtT1ijD58',
        authDomain: 'how-me-beer.firebaseapp.com',
        databaseURL: 'https://show-me-beer.firebaseio.com',
        storageBucket: 'show-me-beer.appspot.com'
    };
    firebase.initializeApp(config);

    PopulateStore();
    GetCurrentUser();
}
