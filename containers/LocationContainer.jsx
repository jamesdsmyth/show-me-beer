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
                        <Link to={"/beers/" + beer} className="beer-title">
                            {currentLocation.beers[beer].name}
                        </Link>
                    </li>
        });

        return (
            <div>
                <section className="split">
                    <h1>{currentLocation.name}</h1>
                    <p>{currentLocation.street}</p>
                    <p>{currentLocation.city}</p>
                    <p>{currentLocation.postCode}</p>
                    <p>Description: {currentLocation.description}</p>
                    <h2>Beers sold here</h2>
                    <ul className="beers-list">
                        {beerslist}
                    </ul>
                </section>
                <section className="split">
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
