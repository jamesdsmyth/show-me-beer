import Data from '../data/data.js'

var LocationsReducer = (state = Data.locations, action) => {

    var newState = Object.assign({}, state);

    switch (action.type) {
        case 'ALL_LOCATIONS':
            console.log(action.data.locations);
            console.log(state);

            newState = action.data.locations

            console.log(newState);
            return newState;
            break;

        default:
            return state;
    }
}

export default LocationsReducer
