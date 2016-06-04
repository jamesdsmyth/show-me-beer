import { createStore, combineReducers } from 'redux'

import BeerReducer from './BeerReducer.jsx'
import BeerTypesReducer from './BeerTypesReducer.jsx'
import BeerStylesReducer from './BeerStylesReducer.jsx'
import LocationsReducer from './LocationsReducer.jsx'
import ShortLocationsReducer from './ShortLocationsReducer.jsx'
import BoroughsReducer from './BoroughsReducer.jsx'

var Reducer = combineReducers({
    beers: BeerReducer,
    beerTypes: BeerTypesReducer,
    beerStyles: BeerStylesReducer,
    locations: LocationsReducer,
    shortLocations: ShortLocationsReducer,
    boroughs: BoroughsReducer
});

var Store = createStore(Reducer);

export default Store
