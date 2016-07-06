import Data from '../data/data.js'

var LocationsReducer = (state = Data.locations, action) => {

    var newState = Object.assign({}, state);

    console.log(action.type)
    switch (action.type) {
        case 'ALL_LOCATIONS':

            newState = action.data.locations
            return newState;
            break;

        default:
            return state;
    }
}

export default LocationsReducer
