import data from '../data/data';

const UserReducer = (state = data.user, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {

    case 'SIGN_IN_USER':

        newState = Object.assign({}, state, {
            userName: action.userName,
            uid: action.uid,
            photo: action.photo,
            email: action.email,
            beers: action.beers,
            locations: action.locations
        });

        return newState;

    case 'SIGN_OUT_USER':

        newState = Object.assign({}, state, {
            userName: null,
            email: null,
            uid: null,
            photo: null,
            beers: null,
            locations: null
        });

        return newState;

    case 'SAVE_BEER':

        newState = Object.assign({}, state, {
            beers: {
                data: action.beers.data
            }
        });

        return newState;

    default:
        return state;
    }
};

export default UserReducer;
