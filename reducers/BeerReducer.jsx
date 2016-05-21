import Data from '../data/data.js'

var BeerReducer = (state = Data.beers, action) => {

    var newState = Object.assign({}, state);

    return state;
}

export default BeerReducer
