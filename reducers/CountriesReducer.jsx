import Data from '../data/data.js'

var CountriesReducer = (state = Data.countries, actions) => {

    // console.log(state);
    var newState = Object.assign({}, state);

    return state;
}

export default CountriesReducer
