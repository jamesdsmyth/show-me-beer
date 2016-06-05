import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BeersContainerView extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            types: this.props.types,
            styles: this.props.styles,
            type: [],
            style: []
        }
    }

    handleTypeClick (type) {
        var types = this.state.type;
        var isPresent = 0;

        // looping through the currently selected types array and if the passed 'type' is in the list it is removed. Else added.
        for(var i in types) {
            if(type.type === types[i]) {
                isPresent++;
                types.splice(i, 1);
            }
        }

        if(isPresent === 0) {
            types.push(type.type);
        }

        this.setState({"type": types });
    }

    handleStyleClick (style) {
        var styles = this.state.style;
        var isPresent = 0;

        // looping through the currently selected styles array and if the passed 'style' is in the list it is removed. Else added.
        for(var i in styles) {
            if(style.style === styles[i]) {
                isPresent++;
                styles.splice(i, 1);
            }
        }

        if(isPresent === 0) {
            styles.push(style.style);
        }

        this.setState({"style": styles });
    }

    render () {
        var beers = this.props.beers;
        var types = this.state.types;
        var styles = this.state.styles;
        var selectedType = this.state.type;
        var selectedStyle = this.state.style;
        var handleTypeSelect = this.handleTypeClick.bind(this);
        var handleStyleSelect = this.handleStyleClick.bind(this);

        // creating the toggle tabs for the beer types
        var typeOptions = types.map(function (type, i) {
            var typeClass = selectedType.indexOf(type) > -1 ? 'selected' : null;
            return <li key={i} className={typeClass} onClick={() => handleTypeSelect({type})}>{type}</li>
        });

        // creating the toggle tabs for the beer styles
        var styleOptions = styles.map(function (style, i) {
            var styleClass = selectedStyle.indexOf(style) > -1 ? 'selected' : null;
            return <li key={i} className={styleClass} onClick={() => handleStyleSelect({style})}>{style}</li>
        });

        // filtering out the beers by checking if the selected tabs are indexed in each of the beers properties
        var beerList = Object.keys(beers).map(function (beer, i) {
            if((selectedType.indexOf(beers[beer].type) > -1) || (selectedType.length === 0)) {
                if((selectedStyle.indexOf(beers[beer].style) > -1) || (selectedStyle.length === 0)) {
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
                }

            }
        });

        return (
            <div>
                {!this.props.children ?
                    <div>
                        <section className="split">
                            <h1>Beers</h1>
                            <ul className="tabs-list">
                                {typeOptions}
                            </ul>
                            <ul className="tabs-list">
                                {styleOptions}
                            </ul>
                        </section>
                        <section className="split">
                            <ul className="beers-list">
                                {beerList}
                            </ul>
                        </section>
                    </div>
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
