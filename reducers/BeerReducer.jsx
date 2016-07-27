import Data from '../data/data.js'

const BeerReducer = (state = Data.beers, action) => {

    var newState = null;

    console.log('state is', state);

    switch (action.type) {
        case 'ALL_BEERS':
            newState = Object.assign({}, state, action.data.beers);

            return newState;
            break;

        default:
            return state;
    }
}

export default BeerReducer
