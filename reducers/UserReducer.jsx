import data from '../data/data.js'

const UserReducer = (state = data.user, action) => {

    var newState = Object.assign({}, state);

    var user = 'user'

    switch (action.type) {

        case 'SIGN_IN_USER':

            newState = Object.assign({}, state, {
                userName: action.userName,
                uid: action.uid,
                email: action.email,
                beers: action.beers,
                locations: action.locations
            });

            return newState;
            break;

        case 'SIGN_OUT_USER':

            newState = Object.assign({}, state, {
                userName: null,
                email: null,
                uid: null,
                beers: null,
                locations: null
            });

            console.log(newState);

            return newState;
            break;

        case 'SAVE_BEER':

            newState = Object.assign({}, state, {
                beers: action.beers
            });

            return newState;
            break;

        default:
            return state;
    }
}

export default UserReducer
