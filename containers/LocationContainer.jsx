import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class LocationContainerView extends React.Component {
    render () {
        var locations = this.props.locations;
        var currentLocation = locations[this.props.params.location];

        console.log(currentLocation);

        var beerslist = Object.keys(currentLocation.beers).map(function (beer) {
            return <li>
                        {beer}
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
