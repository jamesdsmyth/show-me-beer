import Data from '../data/data.js'

const BeerReducer = (state = Data.beers, action) => {

    var newState = Object.assign({}, state);

    switch (action.type) {
        case 'ALL_BEERS':
            newState = action.data.beers;
            return newState;
            break;

        default:
            return state;
    }
}

export default BeerReducer
