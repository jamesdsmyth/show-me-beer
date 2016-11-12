import { createStore, combineReducers } from 'redux';

import BeerReducer from './BeerReducer';
import BeerTypesReducer from './BeerTypesReducer';
import BeerStylesReducer from './BeerStylesReducer';
import LocationsReducer from './LocationsReducer';
import BoroughsReducer from './BoroughsReducer';
import CountriesReducer from './CountriesReducer';
import UserReducer from './UserReducer';
import NotificationReducer from './NotificationReducer';
import CreateBeerReducer from './CreateBeerReducer';
import CreateLocationsReducer from './CreateLocationReducer';

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

export default Store;
