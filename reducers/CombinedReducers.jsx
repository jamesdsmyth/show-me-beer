import { createStore, combineReducers } from 'redux'

import BeerReducer from './BeerReducer.jsx'
import LocationsReducer from './LocationsReducer.jsx'

var Reducer = combineReducers({
    beers: BeerReducer,
    locations: LocationsReducer
});

var Store = createStore(Reducer);

export default Store
