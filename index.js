require('./styles/styles.scss');

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

import Store from './reducers/CombinedReducers.jsx'

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
            </Route>
        </Router>
    </Provider>
), document.getElementById('show-me-beer'));

// - fix bug with removing location. This needs to be re-added
// - filter beers type - http://www.thebeerstore.ca/beer-101/beer-types. Also add these fields to the beers and locations in the data.js
// - filter location on city/borough
// - get initial styling in
// - send email out asking what beers people enjoy. Do this on Friday
// - DONE - make urls friendly, ask Richard about what would he do
