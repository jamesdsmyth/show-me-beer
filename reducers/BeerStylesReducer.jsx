import Data from '../data/data.js'

var BeerStylesReducer = (state = Data.beerStyles, action) => {

    var newState = Object.assign({}, state);

    return state;
}

export default BeerStylesReducer
