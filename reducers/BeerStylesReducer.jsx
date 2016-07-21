import Data from '../data/data.js'

const BeerStylesReducer = (state = Data.beerStyles, action) => {

    var newState = Object.assign({}, state);

    switch (action.type) {

        case 'ALL_BEER_STYLES':
            newState = action.data.beerStyles;
            return newState;
            break;

        default:
            return state;
    }
}

export default BeerStylesReducer
