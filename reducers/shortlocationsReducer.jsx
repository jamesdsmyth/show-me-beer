import Data from '../data/data.js'

const ShortLocationsReducer = (state = Data.shortLocations, action) => {

    var newState = Object.assign({}, state);

    switch (action.type) {
        case 'ALL_SHORT_LOCATIONS':

            newState = action.data.shortLocations;
            return newState;
            break;

        default:
            return state;
    }
}

export default ShortLocationsReducer
