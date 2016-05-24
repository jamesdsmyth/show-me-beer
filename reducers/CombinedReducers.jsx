import { createStore, combineReducers } from 'redux'

import BeerReducer from './BeerReducer.jsx'
import LocationsReducer from './LocationsReducer.jsx'
import ShortLocationsReducer from './ShortLocationsReducer.jsx'

var Reducer = combineReducers({
    beers: BeerReducer,
    locations: LocationsReducer,
    shortLocations: ShortLocationsReducer
});

var Store = createStore(Reducer);

export default Store
