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

// - DONE - fix bug with removing location. This needs to be re-added
// - DONE - filter beers type - http://www.thebeerstore.ca/beer-101/beer-types. Also add these fields to the beers and locations in the data.js
// - DONE - get beer types and styles into data.js reducers
// - DONE - filter location on London boroughs - need to get a list of boroughs and cities added from here https://en.wikipedia.org/wiki/List_of_London_boroughs
// - get initial styling in
// - DONE - send email out asking what beers people enjoy. Do this on Friday
// - DONE - make urls friendly
// - filter beers by country - best way of doing this will be to loop through each beer and create an array from the {beer.country}
// get all data together and create the real data for the beers and locations
