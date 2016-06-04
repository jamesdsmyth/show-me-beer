import Data from '../data/data.js'

var BeerTypesReducer = (state = Data.beerTypes, action) => {

    var newState = Object.assign({}, state);

    return state;
}

export default BeerTypesReducer
