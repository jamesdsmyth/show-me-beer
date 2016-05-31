import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BeersContainerView extends React.Component {
    render () {
        var beers = this.props.beers;

        var beerList = Object.keys(beers).map(function (beer, i) {
            return <li key={i}>
                        <h3>
                            <Link to={"/beers/" + beer}>
                                {beer}
                            </Link>
                        </h3>
                        <img src={beers[beer].photo} alt={beers[beer].name} className="beer-image" />
                    </li>
        });

        return (
            <div>
                {!this.props.children ?
                    <section className="split">
                        <h1>Beers</h1>
                        <ul className="beers-list">{beerList}</ul>
                    </section>
                : null}
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        beers: state.beers
    }
}

const BeersContainer = connect(mapStateToProps)(BeersContainerView);

export default BeersContainer
