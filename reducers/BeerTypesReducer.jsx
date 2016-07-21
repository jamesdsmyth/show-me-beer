import Data from '../data/data.js'

const BeerTypesReducer = (state = Data.beerTypes, action) => {

    var newState = Object.assign({}, state);

    switch (action.type) {
        case 'ALL_BEER_TYPES':

            newState = action.data.beerTypes;
            return newState;
            break;

        default:
            return state;
    }
}

export default BeerTypesReducer
