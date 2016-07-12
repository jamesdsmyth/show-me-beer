import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'


// https://github.com/yelouafi/redux-saga will replace the setTimeouts

var FirebaseRef = () => {
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

export default FirebaseRef;
