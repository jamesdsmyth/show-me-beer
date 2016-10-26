require('./styles/styles.scss');

require('./offline-fallback.js');
// importing firebase dependancy
import firebase from 'firebase';


// dependancies
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

// file dependancies
import HeaderContainer from './containers/HeaderContainer.jsx'
import HomeContainer from './containers/HomeContainer.jsx'
import BeersContainer from './containers/BeersContainer.jsx'
import BeerContainer from './containers/BeerContainer.jsx'
import LocationsContainer from './containers/LocationsContainer.jsx'
import LocationContainer from './containers/LocationContainer.jsx'
import SavedBeersContainer from './containers/SavedBeersContainer.jsx'
import CreateBeerContainer from './containers/CreateBeerContainer.jsx'
import CreateLocationContainer from './containers/CreateLocationContainer.jsx'

import Store from './reducers/CombinedReducers.jsx'
import { FirebaseRef } from './data/FirebaseRef.jsx'

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
