import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapComponent from '../components/MapComponent.jsx'

class LocationContainerView extends React.Component {

    render () {

        let locations = this.props.locations,
            userSavedBeers = this.props.user.beers.data,
            currentLocation = {};

        for(var location in locations) {
            if(locations[location].url === this.props.params.location) {
                currentLocation = locations[location];
            }
        }

        var beerslist = Object.keys(currentLocation.beers || {}).map((beer, i) => {

            let beerSaved = null;

            if((userSavedBeers !== undefined) && (userSavedBeers !==  null)) {
                for (var savedBeer in userSavedBeers) {
                    if(userSavedBeers[savedBeer].beer === currentLocation.beers[beer].name) {
                        beerSaved = 'saved';
                    }
                }
            }

            return <li key={i} className={beerSaved}>
                        <Link to={"/beers/" + beer}>
                            <img className="beer-image" src={currentLocation.beers[beer].photo} alt={beer} />
                        </Link>
                        <div className="beer-details">
                            <h3>
                                <Link to={"/beers/" + beer}
                                      className="beer-title">
                                    {currentLocation.beers[beer].name}
                                </Link>
                            </h3>
                            <span className="italic">{currentLocation.beers[beer].type}, {currentLocation.beers[beer].style} and brewed in {currentLocation.beers[beer].country}</span>
                        </div>
                    </li>
        });

        return (
            <div>
                <section className="location-header area">
                    <h1 className="location-title">{currentLocation.name}</h1>
                    <picture>
                        <source srcSet={currentLocation.photo} media="(min-width: 800px)" />
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Seattle_Skyline_from_Rizal_Park.jpg/800px-Seattle_Skyline_from_Rizal_Park.jpg" alt="default fallback image" />
                    </picture>
                </section>
                <section className="area buffer beer">
                    <h2>Beers</h2>
                    <ul className="beers-list">
                        {beerslist}
                    </ul>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.locations,
        user: state.user
    }
}

const LocationContainer = connect(mapStateToProps)(LocationContainerView)

export default LocationContainer
