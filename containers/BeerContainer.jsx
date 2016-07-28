import React, { propTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { saveBeer } from '../actions/actions.js'
import Store from '../reducers/CombinedReducers.jsx'
import { SaveBeer } from '../data/FirebaseRef.jsx'

import MapContainer from '../containers/MapContainer.jsx'

class BeerContainerView extends React.Component {

    // save the beer to Firebase. If the user is not logged in, then an alert to log in is shown
    saveBeer (beer) {
        console.log(this.props.user)
        if(this.props.user.userName !== null) {
            SaveBeer(beer);
        } else {
            alert('please log in to save a beer')
        }
    }

    render () {
        var userData = this.props.user,
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

        if((userData.beers !== undefined) && (userData.beers !==  null)) {

            userLoggedIn = true;

            for (var i = 0; i < userData.beers.length; i++) {
                if (userData.beers[i] === currentBeer.name) {

                    beerSaved = true;
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
                            <span>
                                Beer added!
                            </span>
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
