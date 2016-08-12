import data from '../data/data.js'

const UserReducer = (state = data.user, action) => {

    var newState = Object.assign({}, state);

    var user = 'user'

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

            console.log(newState);

            return newState;
            break;

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
            break;

        case 'SAVE_BEER':

        console.log(state);
        console.log(action.beers.data)

            newState = Object.assign({}, state, {
                beers: {
                    data: action.beers.data
                }
            });

            console.log(newState);



            return newState;
            break;

        default:
            return state;
    }
}

export default UserReducer
