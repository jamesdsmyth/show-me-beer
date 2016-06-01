import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BeersContainerView extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            type: 'all',
            style: 'all'
        }
    }

    handleTypeChange (event) {
        this.setState({ "type": event.target.value });
    }

    handleStyleChange (event) {
        this.setState({ "style": event.target.value });
    }

    render () {
        var beers = this.props.beers;
        var type = this.state.type;
        var style = this.state.style;

        console.log(type)

        var beerList = Object.keys(beers).map(function (beer, i) {

            if((beers[beer].type == type) || (type == 'all')) {

                if((beers[beer].style == style) || (style == 'all')) {

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

        var handleTypeChange = this.handleTypeChange.bind(this);
        var handleStyleChange = this.handleStyleChange.bind(this);

        return (
            <div>
                {!this.props.children ?
                    <section className="split">
                        <h1>Beers</h1>
                        <section className="filter-section">
                            <div>
                                <label htmlFor="beer-type">
                                    Beer type:
                                </label>
                                <select id="beer-type"
                                    onChange={handleTypeChange}>
                                    <option value="all">
                                        Select a type of beer
                                    </option>
                                    <option value="ale">
                                        ale
                                    </option>
                                    <option value="lager">
                                        lager
                                    </option>
                                    <option value="stout">
                                        stout
                                    </option>
                                    <option value="malt">
                                        malt
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="beer-style">
                                    Beer style:
                                </label>
                                <select id="beer-style"
                                    onChange={handleStyleChange}>
                                    <option value="all">
                                        Select a style of beer
                                    </option>
                                    <option value="ale">
                                        ale
                                    </option>
                                    <option value="amber">
                                        amber
                                    </option>
                                    <option value="blond">
                                        blond
                                    </option>
                                    <option value="brown">
                                        brown
                                    </option>
                                    <option value="cream">
                                        cream
                                    </option>
                                    <option value="dark">
                                        dark
                                    </option>
                                    <option value="golden">
                                        golden
                                    </option>
                                    <option value="honey">
                                        honey
                                    </option>
                                    <option value="pale ale">
                                        pale ale
                                    </option>
                                    <option value="light">
                                        light
                                    </option>
                                    <option value="pilsner">
                                        pilsner
                                    </option>
                                    <option value="red">
                                        red
                                    </option>
                                    <option value="strong">
                                        strong
                                    </option>
                                </select>
                            </div>
                        </section>
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
