import Data from '../data/data';

const CreateBeerReducer = (state = Data.createBeer, action) => {
    let newState = null;

    switch (action.type) {
    case 'ADD_LOCATION_TO_BEER':
        newState = Object.assign({}, state, {
            locations: [
                ...state.locations,
                {
                    uid: action.uid
                }
            ]
        });

        return newState;

    case 'REMOVE_LOCATION_FROM_BEER':

        // filtering the location we need to remove. Then below setting it
        const locationsArray = state.locations.filter((location) => {
            let toReturn = null;
            if (location.uid !== action.uid) {
                toReturn = location;
            }

            return toReturn;
        });

        newState = Object.assign({}, state, {
            locations: locationsArray
        });

        return newState;

    case 'CLEAR_LOCATIONS_FROM_BEER':

        newState = Object.assign({}, state, {
            locations: [],
            visibleSection: 'form'
        });

        return newState;

    // when we initialise the beer creation page or want to create a new beer, we want the form
    // to be shown instead of a success/error message relating to the last beer created
    case 'INITIALISE_BEER_CREATION':

        newState = Object.assign({}, state, {
            visibleSection: 'form'
        });

        return newState;

    case 'BEER_SUBMITTED':

        newState = Object.assign({}, state, {
            visibleSection: 'submitted'
        });

        return newState;

    // so when the beer is created we want the beer creation page to show a success message
    case 'BEER_CREATED_SUCCESS':

        newState = Object.assign({}, state, {
            visibleSection: 'success'
        });

        return newState;

    // so when the beer fails to be created we want the beer creation page to show a failure message
    case 'BEER_CREATED_FAILURE':

        newState = Object.assign({}, state, {
            visibleSection: 'failure'
        });

        return newState;

    default:
        return state;
    }
};

export default CreateBeerReducer;
