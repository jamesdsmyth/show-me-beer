import { createStore, combineReducers } from 'redux'

import BeerReducer from './BeerReducer.jsx'
import BeerTypesReducer from './BeerTypesReducer.jsx'
import BeerStylesReducer from './BeerStylesReducer.jsx'
import LocationsReducer from './LocationsReducer.jsx'
import ShortLocationsReducer from './ShortLocationsReducer.jsx'
import BoroughsReducer from './BoroughsReducer.jsx'
import CountriesReducer from './CountriesReducer.jsx'
import UserReducer from './UserReducer.jsx'

const Reducer = combineReducers({
    beers: BeerReducer,
    beerTypes: BeerTypesReducer,
    beerStyles: BeerStylesReducer,
    locations: LocationsReducer,
    shortLocations: ShortLocationsReducer,
    boroughs: BoroughsReducer,
    countries: CountriesReducer,
    user: UserReducer
});

var Store = createStore(Reducer);
console.log(Store.getState());

export default Store
