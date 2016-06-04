import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BeersContainerView extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            types: this.props.types,
            styles: this.props.styles,
            type: ['all'],
            style: ['all']
        }
    }

    handleTypeClick (type) {
        console.log(type.type)
        console.log(this.state.type)
        var types = this.state.type;
        types.push(type.type);

        console.log(types);
        this.setState({"type": types });
    }

    handleStyleClick (style) {
        this.setState({ "style": event.target.value });
    }

    render () {
        var beers = this.props.beers;
        var types = this.state.types;
        var styles = this.state.styles;
        var type = this.state.type;
        var style = this.state.style;
        var handleTypeSelect = this.handleTypeClick.bind(this);
        var handleStyleSelect = this.handleStyleClick.bind(this);

        // console.log(this.state.styles);
        // console.log(this.state.types);

        // creating the toggle tabs for the beer types
        var typeOptions = types.map(function (type, i) {
            // var newClass = borough === stateBorough ? 'selected' : null
            return <li key={i} onClick={() => handleTypeSelect({type})}>{type}</li>
        });

        // creating the toggle tabs for the beer styles
        var styleOptions = styles.map(function (style, i) {
            // var newClass = borough === stateBorough ? 'selected' : null
            return <li key={i} onClick={() => handleStyleSelect({style})}>{style}</li>
        });

        var beerList = Object.keys(beers).map(function (beer, i) {

            // if((beers[beer].type == type) || (type == 'all')) {

                // if((beers[beer].style == style) || (style == 'all')) {

                    return <li key={i}>
                                <h3>
                                    <Link to={"/beers/" + beer}>
                                        {beers[beer].name}
                                    </Link>
                                </h3>
                                <Link to={"/beers/" + beer}>
                                    <img src={beers[beer].photo} alt={beers[beer].name} className="beer-image" />
                                </Link>
                            </li>
                // }
            // }
        });

        return (
            <div>
                {!this.props.children ?
                    <section className="split">
                        <h1>Beers</h1>
                        <ul className="tabs-list">
                            {typeOptions}
                        </ul>
                        <ul className="tabs-list">
                            {styleOptions}
                        </ul>
                        <ul className="beers-list">
                            {beerList}
                        </ul>
                    </section>
                : null}
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        beers: state.beers,
        types: state.beerTypes,
        styles: state.beerStyles
    }
}

const BeersContainer = connect(mapStateToProps)(BeersContainerView);

export default BeersContainer
