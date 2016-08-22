import Data from '../data/data.js'

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
            break;

        case 'REMOVE_LOCATION_FROM_BEER':

            // filtering the location we need to remove. Then below setting it
            let locationsArray = state.locations.filter((location, i) => {
                if(location.uid !== action.uid) {
                    return location;
                }
            });

            newState = Object.assign({}, state, {
                locations: locationsArray
            });

            return newState;
            break;

        case 'CLEAR_LOCATIONS_FROM_BEER':

            newState = Object.assign({}, state, {
                locations: [],
                VisibleSection: 'form'
            });

            return newState;
            break;

        // when we initialise the beer creation page or want to create a new beer, we want the form
        // to be shown instead of a success/error message relating to the last beer created
        case 'INITIALISE_BEER_CREATION':

            newState = Object.assign({}, state, {
                VisibleSection: 'form'
            });

            return newState;
            break;

        case 'BEER_SUBMITTED':

            newState = Object.assign({}, state, {
                VisibleSection: 'submitted'
            });

            return newState;
            break;

        // so when the beer is created we want the beer creation page to show a success message
        case 'BEER_CREATED_SUCCESS':

            newState = Object.assign({}, state, {
                VisibleSection: 'success'
            });

            return newState;
            break;

        // so when the beer fails to be created we want the beer creation page to show a failure message
        case 'BEER_CREATED_FAILURE':

            newState = Object.assign({}, state, {
                VisibleSection: 'failure'
            });

            return newState;
            break;

        default:
            return state;
    }
}

export default CreateBeerReducer
