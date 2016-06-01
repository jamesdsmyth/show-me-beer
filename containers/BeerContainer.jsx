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
                        <Link to={"/locations/" + location}>
                            {currentBeer.locations[location].name}
                        </Link>
                    </li>
        });

        return (
            <div>
                <section className="split">
                    <section className="split half">
                        <h1 className="beer-heading">{currentBeer.name}</h1>
                        <p>Type: {currentBeer.type}</p>
                        <p>Style: {currentBeer.style}</p>
                        <p>Alcohol content: {currentBeer.alcoholContent}%</p>
                        <p>Country: {currentBeer.countryOrigin}</p>
                        <p>City: {currentBeer.cityOrigin}</p>
                        <p>Description: {currentBeer.description}</p>
                        <h2>Locations who sell this beer</h2>
                        <ul>
                            {locationsList}
                        </ul>
                    </section>
                    <section className="split half">
                        <img src={currentBeer.photo} alt={currentBeer.name} />
                    </section>
                </section>
                <section className="split">
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
