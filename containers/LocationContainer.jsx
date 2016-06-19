import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class LocationContainerView extends React.Component {
    render () {
        var locations = this.props.locations;
        var currentLocation = locations[this.props.params.location];

        var beerslist = Object.keys(currentLocation.beers).map(function (beer, i) {
            return <li key={i}>
                        <Link to={"/beers/" + beer}>
                            <img className="beer-image" src={currentLocation.beers[beer].photo} alt={beer} />
                        </Link>
                        <div className="beer-details">
                            <h3>
                                <Link to={"/beers/" + beer}>
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
                    <img src={currentLocation.photo} alt={currentLocation.name} />
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
                    <MapContainer locations={currentLocation.coords} />
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.locations
    }
}

const LocationContainer = connect(mapStateToProps)(LocationContainerView)

export default LocationContainer
