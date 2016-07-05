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

// import TestReducer from './reducers/TestReducer.js'

import Store from './reducers/CombinedReducers.jsx'

render((
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/" component={HeaderContainer}>
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
// - DONE - send email out asking what beers people enjoy. Do this on Friday
// - DONE - make urls friendly
// - DONE - filter beers by country - best way of doing this will be to loop through each beer and create an array from the {beer.country}
// - DONE - get all data together and create the real data for the beers and locations
// - DONE - add option for 1 photo to be added to the locations
// - DONE - add the intiial structure before styles
// - DONE - get initial styling in
// - on the beers page, there needs to be more photos of the beer, eg in the glass, being poured. I could ask the brewery for this? It needs to be in a slide show
// - DONE - send out email to 20 pubs and request description of the beers they are selling, use this wiki page https://en.wikipedia.org/wiki/List_of_breweries_in_England
// - hook up firebase to the redux store
// - add search input to filter the locations and beers using the input
