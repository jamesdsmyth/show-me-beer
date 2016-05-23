import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class LocationContainerView extends React.Component {
    render () {
        var locations = this.props.locations;
        var currentLocation = locations[this.props.params.location];

        console.log(currentLocation);

        var beerslist = Object.keys(currentLocation.beers).map(function (beer, i) {
            console.log(currentLocation.beers[beer]);
            return <li key={i}>
                        {beer}
                        <p>Type: {currentLocation.beers[beer].type}</p>
                        <p>Price: {currentLocation.beers[beer].price}</p>
                        <p>Country origin: {currentLocation.beers[beer].countryOrigin}</p>
                        <img src={currentLocation.beers[beer].photo} alt={beer} />
                        <Link to={"/beers/" + beer}>
                            View this beer
                        </Link>
                    </li>
        });

        return (
            <div>
                <section className="split half">
                    <h1>{currentLocation.name}</h1>
                    <p>City: {currentLocation.locationCity}</p>
                    <p>Country: {currentLocation.locationCountry}</p>
                    <p>Description: {currentLocation.description}</p>
                    <h2>Beers sold here</h2>
                    {beerslist}
                </section>
                <section className="split half">
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
