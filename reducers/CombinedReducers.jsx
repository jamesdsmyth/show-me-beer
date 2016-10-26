import { createStore, combineReducers, applyMiddleware } from 'redux'

import BeerReducer from './BeerReducer.jsx'
import BeerTypesReducer from './BeerTypesReducer.jsx'
import BeerStylesReducer from './BeerStylesReducer.jsx'
import LocationsReducer from './LocationsReducer.jsx'
import BoroughsReducer from './BoroughsReducer.jsx'
import CountriesReducer from './CountriesReducer.jsx'
import UserReducer from './UserReducer.jsx'
import NotificationReducer from './NotificationReducer.jsx'
import CreateBeerReducer from './CreateBeerReducer.jsx'
import CreateLocationsReducer from './CreateLocationReducer.jsx'

// combining all our reducers
const Reducer = combineReducers({
    beers: BeerReducer,
    beerTypes: BeerTypesReducer,
    beerStyles: BeerStylesReducer,
    locations: LocationsReducer,
    boroughs: BoroughsReducer,
    countries: CountriesReducer,
    user: UserReducer,
    notifications: NotificationReducer,
    createBeers: CreateBeerReducer,
    createLocations: CreateLocationsReducer
});

// creating the store with the combined reducers. Store is used throughout the app via dispatches
const Store = createStore(
  Reducer
);

export default Store
