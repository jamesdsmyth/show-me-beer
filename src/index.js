// dependancies
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

// file dependancies
import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';
import BeersContainer from './containers/BeersContainer';
import BeerContainer from './containers/BeerContainer';
import LocationsContainer from './containers/LocationsContainer';
import LocationContainer from './containers/LocationContainer';
import SavedBeersContainer from './containers/SavedBeersContainer';
import CreateBeerContainer from './containers/CreateBeerContainer';
import CreateLocationContainer from './containers/CreateLocationContainer';

import Store from './reducers/CombinedReducers';
import { FirebaseRef } from './data/FirebaseRef';

require('./styles/styles.scss');
require('./offline-fallback.js');

// calling FirebaseRef() to initialise the call to the Firebase DB to get the data
FirebaseRef();

render((
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/" component={HeaderContainer}>
                <IndexRoute component={HomeContainer} />
                <Route path="/beers" component={BeersContainer}>
                    <Route path="/beers/:beer" component={BeerContainer} />
                </Route>
                <Route path="/locations" component={LocationsContainer}>
                    <Route path="/locations/:location" component={LocationContainer} />
                </Route>
                <Route path="/saved-beers" component={SavedBeersContainer} />
                <Route path="/add-beer" component={CreateBeerContainer} />
                <Route path="/add-location" component={CreateLocationContainer} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('show-me-beer'));
