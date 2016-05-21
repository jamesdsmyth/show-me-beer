import Data from '../data/data.js'

var LocationsReducer = (state = Data.locations, actions) => {

    var newState = Object.assign({}, state);

    return state;
}

export default LocationsReducer
