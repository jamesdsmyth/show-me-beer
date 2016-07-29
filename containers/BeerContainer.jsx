import React, { propTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { saveBeer } from '../actions/actions.js'
import Store from '../reducers/CombinedReducers.jsx'
import { SaveBeer, RemoveBeer } from '../data/FirebaseRef.jsx'

import MapContainer from '../containers/MapContainer.jsx'

class BeerContainerView extends React.Component {

    // save the beer to Firebase. If the user is not logged in, then an alert to log in is shown
    saveBeer (beer) {
        if(this.props.user.userName !== null) {
            SaveBeer(beer);
        } else {
            alert('please log in to save a beer');
        }
    }

    // passing the beer UID from firebase to remove the beer.
    removeBeer (beerUID) {
        RemoveBeer(beerUID);
    }

    render () {

        var userData = this.props.user,
            userSavedBeers = userData.beers.data,
            userLoggedIn = false,
            beers = this.props.beers,
            currentBeer = beers[this.props.params.beer] || {},
            locationCount = -1;

        var locationsList = Object.keys(currentBeer.locations || {}).map((location, i) => {
            locationCount = i++;
            return <li key={i}>
                        <Link to={"/locations/" + location}>
                            {currentBeer.locations[location].name}
                        </Link>
                    </li>
        });

        var beerSaved = false;
        var beerUID = null;

        // looping through all saved user Firebase beers with the UID and if it matches
        // the beer the user has already saved we will change the tick and cross around.
        if((userSavedBeers !== undefined) && (userSavedBeers !==  null)) {

            userLoggedIn = true;

            for (var beer in userSavedBeers) {
                if (userSavedBeers[beer].beer === currentBeer.name) {
                    beerSaved = true;
                    beerUID = beer;
                }
            }
        }

        return (
            <div>
                <section className="area buffer page-title">
                    <h1 className="beer-heading">{currentBeer.name}</h1>

                    {
                        beerSaved === false ?
                            <button type="button"
                                className="button add-beer"
                                onClick={() => this.saveBeer(currentBeer.name)}>
                                Save beer
                            </button>

                        :

                        <div>
                            <img className="green-tick"
                                 src="../images/tick.png" alt="this beer has been saved" />
                             <button type="button"
                                 className="button remove-beer"
                                 onClick={() => this.removeBeer(beerUID)}>
                                 Remove beer
                             </button>
                         </div>
                    }

                </section>
                <section className="area half buffer">
                    <p>Type: {currentBeer.type}</p>
                    <p>Style: {currentBeer.style}</p>
                    <p>Alcohol content: {currentBeer.alcoholContent}%</p>
                    <p>Brewed in: {currentBeer.city}, {currentBeer.country}</p>
                    <p>Description: {currentBeer.description}</p>
                </section>
                <section className="area half buffer end">
                    <img className="beer-image" src={currentBeer.photo} alt={currentBeer.name} />
                </section>
                <section className="area buffer locations">
                    <div className="locations-list">
                        <h2>Locations that sell this beer</h2>
                        {locationCount === -1 ? <span>There are currently no locations that sell {currentBeer.name}</span> : null}
                        <ul>
                            {locationsList}
                        </ul>
                    </div>
                    {currentBeer.locations !== undefined ? <MapContainer locations={currentBeer.locations} /> : null}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        beers: state.beers,
        user: state.user
    }
}

const BeerContainer = connect(mapStateToProps)(BeerContainerView)

export default BeerContainer
