import React from 'react'
import FilterLocationsComponent from '../components/FilterLocationsComponent.jsx'

class LocationsContainer extends React.Component {

    render () {

        return (
            <div>
                {!this.props.children ?
                    <div>
                        <section className="area buffer page-title">
                            <h1>Locations</h1>
                        </section>
                        <FilterLocationsComponent />
                    </div>
                : null}
                {this.props.children}
            </div>
        )
    }
}

export default LocationsContainer
