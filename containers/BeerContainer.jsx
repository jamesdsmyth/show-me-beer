import React, { propTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class BeerContainerView extends React.Component {
    render () {
        var beers = this.props.beers;
        var currentBeer = beers[this.props.params.beer];

        var locationsList = Object.keys(currentBeer.locations).map(function (location, i) {
            return <li key={i}>
                        {location}
                        <Link to={"/locations/" + location}>
                            View location
                        </Link>
                    </li>
        });

        return (
            <div>
                <section className="split half">
                    <h1>{currentBeer.name}</h1>
                    <p>Type: {currentBeer.type}</p>
                    <p>Alcohol content: {currentBeer.alcoholContent}%</p>
                    <p>Country: {currentBeer.countryOrigin}</p>
                    <p>City: {currentBeer.cityOrigin}</p>
                    <p>Description: {currentBeer.description}</p>
                    <img src={currentBeer.photo} alt={currentBeer.name} />
                    <h2>Locations who sell this beer</h2>
                    <ul>
                        {locationsList}
                    </ul>
                </section>
                <section className="split half">
                    <MapContainer locations={currentBeer.locations} />
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        beers: state.beers
    }
}

const BeerContainer = connect(mapStateToProps)(BeerContainerView)

export default BeerContainer
