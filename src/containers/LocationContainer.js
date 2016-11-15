import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MapComponent from '../components/MapComponent';

const LocationContainerView = ({ locations, user, beers, params }) => {
    const userSavedBeers = user.beers.data;
    let currentLocation = {};

    for (const location in locations) {
        if (locations[location].url === params.location) {
            currentLocation = locations[location];
        }
    }

    // creating the list of beers that are sold at this location
    const beerslist = Object.keys(currentLocation.beers || {}).map((beer, i) => {
        let beerSaved = null;
        const singleBeer = beers[currentLocation.beers[beer].uid];

        // seeing whether the current beer has been previously saved by the user. If it has then we need to give it a class of 'saved'
        if ((userSavedBeers !== undefined) && (userSavedBeers !== null)) {
            for (const savedBeer in userSavedBeers) {
                if (userSavedBeers[savedBeer].beer === singleBeer.name) {
                    beerSaved = 'saved';
                }
            }
        }

        return <li key={i} className={beerSaved}>
            <Link to={`/beers/${singleBeer.url}`}>
                <img className="beer-image" src={singleBeer.photo} alt={singleBeer.name} />
            </Link>
            <div className="beer-details">
                <h3>
                    <Link
                        to={`/beers/${singleBeer.url}`}
                        className="beer-title"
                    >
                        {singleBeer.name}
                    </Link>
                </h3>
                <span className="italic">{singleBeer.type}, {singleBeer.style} and brewed in {singleBeer.country}</span>
            </div>
        </li>;
    });

    return (
        <div>
            <section className="location-header area">
                <h1 className="location-title">{currentLocation.name}</h1>
                <picture>
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
    );
};

const mapStateToProps = (state) => {
    return {
        locations: state.locations,
        beers: state.beers,
        user: state.user
    };
};

LocationContainerView.propTypes = {
    locations: PropTypes.arrayOf.isRequired,
    user: PropTypes.shape.isRequired,
    beers: PropTypes.arrayOf.isRequired,
    params: PropTypes.shape.isRequired
};

const LocationContainer = connect(mapStateToProps)(LocationContainerView);

export default LocationContainer;
