import React, { propTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class BeerContainerView extends React.Component {

    addBeer () {
        alert('beer added');
        // here I need to fire off an action that creates the
    }

    render () {
        var beers = this.props.beers,
            currentBeer = beers[this.props.params.beer] || {},
            locationCount = -1;


        console.log(currentBeer)

        var locationsList = Object.keys(currentBeer.locations || {}).map(function (location, i) {
            locationCount = i++;
            return <li key={i}>
                        <Link to={"/locations/" + location}>
                            {currentBeer.locations[location].name}
                        </Link>
                    </li>
        });

        return (
            <div>
                <section className="area buffer page-title">
                    <h1 className="beer-heading">{currentBeer.name}</h1>
                    {/*<span className="add-beer"
                        onClick={() => this.addBeer()}>
                        Save beer
                    </span>*/}
                </section>
                <section className="area half buffer">
                    <p>Type: {currentBeer.type}</p>
                    <p>Style: {currentBeer.style}</p>
                    <p>Alcohol content: {currentBeer.alcoholContent}%</p>
                    <p>Brewed in: {currentBeer.city}, {currentBeer.country}</p>
                    <p>Description: {currentBeer.description}</p>
                </section>
                <section className="area half buffer end">
                    <img className="beer-image" src={currentBeer.photo} alt={currentBeer.name} />
                </section>
                <section className="area buffer locations">
                    <div className="locations-list">
                        <h2>Locations that sell this beer</h2>
                        {locationCount === -1 ? <span>There are currently no locations that sell {currentBeer.name}</span> : null}
                        <ul>
                            {locationsList}
                        </ul>
                    </div>
                    {currentBeer.locations !== undefined ? <MapContainer locations={currentBeer.locations} /> : null}
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
