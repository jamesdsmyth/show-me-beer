import Data from '../data/data.js'

const CreateLocationReducer = (state = Data.createLocation, action) => {

    let newState = null;

    switch (action.type) {

        case 'ADD_BEER_TO_LOCATION':
            newState = Object.assign({}, state, {
                beers: [
                    ...state.beers,
                        {
                            uid: action.uid
                        }
                    ]
            });

            return newState;
            break;

        case 'REMOVE_BEER_FROM_LOCATION':

            // filtering the location we need to remove. Then below setting it
            let beersArray = state.beers.filter((beer, i) => {
                if(beer.uid !== action.uid) {
                    return beer;
                }
            });

            newState = Object.assign({}, state, {
                beers: beersArray
            });

            return newState;
            break;

        default:
            return state;
    }
}

export default CreateLocationReducer
