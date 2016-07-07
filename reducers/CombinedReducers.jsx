import { createStore, combineReducers } from 'redux'

import BeerReducer from './BeerReducer.jsx'
import BeerTypesReducer from './BeerTypesReducer.jsx'
import BeerStylesReducer from './BeerStylesReducer.jsx'
import LocationsReducer from './LocationsReducer.jsx'
import ShortLocationsReducer from './ShortLocationsReducer.jsx'
import BoroughsReducer from './BoroughsReducer.jsx'
import CountriesReducer from './CountriesReducer.jsx'

import * as actions from '../actions/actions.js'

// https://github.com/yelouafi/redux-saga will replace the setTimeouts
firebase.database().ref('/').once('value').then((snapshot) => {

    Store.dispatch(actions.populateLocations(snapshot.val()));

    setTimeout(() => {
        Store.dispatch(actions.populateShortLocations(snapshot.val()));
    }, 200);

    setTimeout(() => {
        Store.dispatch(actions.populateBeers(snapshot.val()));
    }, 400);
});

var Reducer = combineReducers({
    beers: BeerReducer,
    beerTypes: BeerTypesReducer,
    beerStyles: BeerStylesReducer,
    locations: LocationsReducer,
    shortLocations: ShortLocationsReducer,
    boroughs: BoroughsReducer,
    countries: CountriesReducer
});

var Store = createStore(Reducer);

export default Store
