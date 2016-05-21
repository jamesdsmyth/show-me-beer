import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class BeersContainerView extends React.Component {
    render () {
        var beers = this.props.beers

        console.log(beers);
        return (
            <h1>
                Beers
            </h1>
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
