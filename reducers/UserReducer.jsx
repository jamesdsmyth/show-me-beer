// setting state up initially as an object because it is empty until populated.
const UserReducer = (state = {}, action) => {

    var newState = Object.assign({}, state);

    var user = 'user'

    switch (action.type) {

        case 'SIGN_IN_USER':
            newState = Object.assign({}, state, {
                userName: action.userName,
                email: action.email,
                beers: action.beers,
                locations: action.locations
            });

            console.log(newState);

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

            return newState;
            break;

        default:
            return state;
    }
}

export default UserReducer
