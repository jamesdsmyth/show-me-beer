import React, { propTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames';
import { saveBeer } from '../actions/actions.js'
import Store from '../reducers/CombinedReducers.jsx'
import { SaveBeer, RemoveBeer } from '../data/FirebaseRef.jsx'

import MapComponent from '../components/MapComponent.jsx'

class BeerContainerView extends React.Component {

    // save the beer to Firebase. If the user is not logged in, then an alert to log in is shown
    // passing the beerName as well so we can easily set the notification to say you have added the beer
    saveBeer (beerUID, beerName) {
        if(this.props.user.userName !== null) {
            SaveBeer(beerUID, beerName);
        } else {
            alert('please log in to save a beer');
        }
    }

    // passing the beer UID from firebase to remove the beer.
    removeBeer (beerSavedKey, beerName) {
        RemoveBeer(beerSavedKey, beerName);
    }

    render () {

        let userData = this.props.user,
            userSavedBeers = userData.beers.data,
            userLoggedIn = false,
            beers = this.props.beers,
            locationCount = -1,
            locations = this.props.locations,
            mapLocations = [],
            currentBeer = {},
            beerSaved = false,
            beerUID = null,
            beerSavedKey = null //if this beer has been saved by the user we reference it if the user wants to remove it

        for(var beer in beers) {
            if(beers[beer].url === this.props.params.beer) {
                currentBeer = beers[beer];
                beerUID = beer;
            }
        }

        let locationsList = Object.keys(currentBeer.locations || {}).map((location, i) => {
            locationCount = i++;

            // locations = this.props.locations, is not being loaded

            // create locations to pass to map component
            let uid = currentBeer.locations[location].uid;

            if(locations[uid] !== undefined) {
                mapLocations.push(locations[uid]);
            }

            if(Object.keys(locations).length > 0) {
                return <li key={i} className="basic-location">
                            <Link to={"/locations/" + locations[currentBeer.locations[location].uid].url}>
                                {locations[currentBeer.locations[location].uid].name}
                            </Link>
                        </li>;
            }
        });

        // looping through all saved user Firebase beers with the UID and if it matches
        // the beer the user has already saved we will change the tick and cross around.
        if((userSavedBeers !== undefined) && (userSavedBeers !==  null)) {
            userLoggedIn = true;

            for (var userSavedBeer in userSavedBeers) {
                if (userSavedBeers[userSavedBeer].uid === beerUID) {
                    beerSaved = true;
                    beerSavedKey = userSavedBeer;
                }
            }
        }

        return (
            <div>
                <section className={classnames('area', 'buffer', 'page-title')}>
                    <h1 className="beer-heading">{currentBeer.name}</h1>

                    {
                        beerSaved === false ?

                            <img className="star"
                                 src="../images/star-grey.png"
                                 alt="click this beer to save it"
                                 onClick={() => this.saveBeer(beerUID, currentBeer.name)} />

                        :

                            <img className="star"
                                 src="../images/star-gold.png"
                                 alt="click this beer to remove it from your saved beers"
                                 onClick={() => this.removeBeer(beerSavedKey, currentBeer.name)} />
                    }

                </section>
                <section className={classnames('area', 'half', 'buffer', 'beer-description')}>
                    <h2>Details</h2>
                    <p>Type: {currentBeer.type}</p>
                    <p>Style: {currentBeer.style}</p>
                    <p>Alcohol content: {currentBeer.alcoholContent}%</p>
                    <p>Brewed in: {currentBeer.city}, {currentBeer.country}</p>
                    <p>Description: {currentBeer.description}</p>
                </section>
                <section className={classnames('area', 'half', 'buffer', 'beer-image', 'end')}>
                    <img className="beer-image" src={currentBeer.photo} alt={currentBeer.name} />
                </section>
                <section className="area buffer locations">
                    <div className="locations-list">
                        <h2>Locations that sell this beer</h2>
                        {locationCount === -1 ? <span>There are currently no locations that sell {currentBeer.name}</span> : null}
                        <ul className="locations">
                            {locationsList}
                        </ul>
                    </div>
                    {currentBeer.locations !== undefined ? <MapComponent locations={mapLocations} /> : null}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        beers: state.beers,
        locations: state.locations,
        user: state.user
    }
}

const BeerContainer = connect(mapStateToProps)(BeerContainerView)

export default BeerContainer
