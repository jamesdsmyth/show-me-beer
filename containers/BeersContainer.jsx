import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BeersContainerView extends React.Component {
    render () {
        var beers = this.props.beers;

        var beerList = Object.keys(beers).map(function (beer, i) {
            return <li key={i}>
                        <Link to={"/beers/" + beer}>
                            {beer}
                        </Link>
                    </li>
        });

        return (
            <div>
                {!this.props.children ?
                    <section>
                        <h1>Beers</h1>
                        <ul>{beerList}</ul>
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
