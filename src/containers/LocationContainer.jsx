import React, { propTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapComponent from '../components/MapComponent.jsx'

class LocationContainerView extends React.Component {

    render () {

        let locations = this.props.locations,
            userSavedBeers = this.props.user.beers.data,
            beers = this.props.beers,
            currentLocation = {};

        for(var location in locations) {
            if(locations[location].url === this.props.params.location) {
                currentLocation = locations[location];
            }
        }

        // creating the list of beers that are sold at this location
        var beerslist = Object.keys(currentLocation.beers || {}).map((beer, i) => {

            let beerSaved = null;
            let singleBeer = beers[currentLocation.beers[beer].uid];

            // seeing whether the current beer has been previously saved by the user. If it has then we need to give it a class of 'saved'
            if((userSavedBeers !== undefined) && (userSavedBeers !==  null)) {
                for (var savedBeer in userSavedBeers) {
                    if(userSavedBeers[savedBeer].beer === singleBeer.name) {
                        beerSaved = 'saved';
                    }
                }
            }

            return <li key={i} className={beerSaved}>
                        <Link to={"/beers/" + singleBeer.url}>
                            <img className="beer-image" src={singleBeer.photo} alt={singleBeer.name} />
                        </Link>
                        <div className="beer-details">
                            <h3>
                                <Link to={"/beers/" + singleBeer.url}
                                      className="beer-title">
                                    {singleBeer.name}
                                </Link>
                            </h3>
                            <span className="italic">{singleBeer.type}, {singleBeer.style} and brewed in {singleBeer.country}</span>
                        </div>
                    </li>
        });

        return (
            <div>
                <section className="location-header area">
                    <h1 className="location-title">{currentLocation.name}</h1>
                    <picture>
                        {/*<source srcSet={currentLocation.photo} media="(min-width: 800px)" />*/}
                        <img src={currentLocation.photo} alt={currentLocation.name} />
                    </picture>
                </section>
                <section className="area buffer">
                    <h2>Details</h2>
                    <p>{currentLocation.description}</p>
                </section>
                <section className="area buffer">
                    <div className="locations-list">
                        <h2>Where to find {currentLocation.name}</h2>
                        <p>{currentLocation.street}</p>
                        <p>{currentLocation.city}</p>
                        <p>{currentLocation.postCode}</p>
                    </div>
                    {currentLocation.coords !== undefined ? <MapComponent locations={currentLocation.coords} /> : null}
                </section>
                <section className="area buffer beer">
                    <h2>Beers</h2>
                    <ul className="beers-list">
                        {beerslist}
                    </ul>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        locations: state.locations,
        beers: state.beers,
        user: state.user
    }
}

const LocationContainer = connect(mapStateToProps)(LocationContainerView)

export default LocationContainer
