import { createStore, combineReducers } from 'redux'

import BeerReducer from './BeerReducer.jsx'
import LocationsReducer from './LocationsReducer.jsx'
import ShortLocationsReducer from './ShortLocationsReducer.jsx'
import BoroughsReducer from './BoroughsReducer.jsx'

var Reducer = combineReducers({
    beers: BeerReducer,
    locations: LocationsReducer,
    shortLocations: ShortLocationsReducer,
    boroughs: BoroughsReducer
});

var Store = createStore(Reducer);

export default Store
