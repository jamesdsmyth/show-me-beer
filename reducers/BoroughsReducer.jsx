import Data from '../data/data.js'

var BoroughsReducer = (state = Data.boroughs, actions) => {

    var newState = Object.assign({}, state);

    return state;
}

export default BoroughsReducer
