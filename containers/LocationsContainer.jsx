import React, { propsTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class LocationsContainerView extends React.Component {
    render () {
        var locations = this.props.locations;
        console.log(locations);

        var locationsList = Object.keys(locations).map(function (location, i) {

            return <li key={i}>
                        <Link to={"/locations/" + location}>
                            {location}
                        </Link>
                    </li>
        });

        return (
            <div>
                {!this.props.children ?
                    <section>
                        <h1>Locations</h1>
                        <ul>
                            {locationsList}
                        </ul>
                        <MapContainer locations={locations} />
                    </section>
                : null}
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.shortLocations
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
