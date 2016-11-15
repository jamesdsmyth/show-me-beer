import Data from '../data/data';

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

    case 'REMOVE_BEER_FROM_LOCATION':
        // filtering the beer we need to remove. Then below setting it
        const beersArray = state.beers.filter((beer) => {
            let toReturn = null;
            if (beer.uid !== action.uid) {
                toReturn = beer;
            }

            return toReturn;
        });

        newState = Object.assign({}, state, {
            beers: beersArray
        });

        return newState;

    case 'CLEAR_BEERS_FROM_LOCATIONS':

        newState = Object.assign({}, state, {
            beers: [],
            visibleSection: 'form'
        });

        return newState;

    // when we initialise the location creation page or want to create a new location, we want the form
    // to be shown instead of a success/error message relating to the last location created
    case 'INITIALISE_LOCATION_CREATION':

        newState = Object.assign({}, state, {
            visibleSection: 'form'
        });

        return newState;

    case 'LOCATION_SUBMITTED':

        newState = Object.assign({}, state, {
            visibleSection: 'submitted'
        });

        return newState;

    // so when the location is created we want the location creation page to show a success message
    case 'LOCATION_CREATED_SUCCESS':

        newState = Object.assign({}, state, {
            visibleSection: 'success'
        });

        return newState;

    // so when the location fails to be created we want the location creation page to show a failure message
    case 'LOCATION_CREATED_FAILURE':

        newState = Object.assign({}, state, {
            visibleSection: 'failure'
        });

        return newState;

    default:
        return state;
    }
};

export default CreateLocationReducer;
