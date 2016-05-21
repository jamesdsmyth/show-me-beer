import React, { propsTypes} from 'react'
import { connect } from 'react-redux'

class LocationsContainerView extends React.Component {
    render () {
        var locations = this.props.locations;
        console.log(locations);
        
        return (
            <h1>Locations</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.locations
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
