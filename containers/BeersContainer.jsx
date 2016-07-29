import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class BeersContainerView extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            types: this.props.types,
            styles: this.props.styles,
            countries: this.props.countries,
            type: [],
            style: [],
            country: [],
            showFilter: 'hide'
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

    handleCountryClick (country) {
        var countries = this.state.country;
        var isPresent = 0;

        // looping through the currently selected styles array and if the passed 'style' is in the list it is removed. Else added.
        for(var i in countries) {
            if(country.country === countries[i]) {
                isPresent++;
                countries.splice(i, 1);
            }
        }

        if(isPresent === 0) {
            countries.push(country.country);
        }

        this.setState({"country": countries });
    }

    toggleFilter () {
        var toggleBoolean;
        this.setState({'showFilter': toggleBoolean = this.state.showFilter === 'show' ? 'hide' : 'show'})
    }

    render () {

        var beers = this.props.beers,
            types = this.state.types,
            styles = this.state.styles,
            countries = this.state.countries,
            selectedType = this.state.type,
            selectedStyle = this.state.style,
            selectedCountry = this.state.country,
            handleTypeSelect = this.handleTypeClick.bind(this),
            handleStyleSelect = this.handleStyleClick.bind(this),
            handleCountrySelect = this.handleCountryClick.bind(this),
            handleFilterToggle = this.toggleFilter.bind(this),
            filterClasses = this.state.showFilter + ' filter beers',
            userSavedBeers = this.props.user.beers.data;

        // creating the toggle tabs for the beer types
        var typeOptions = types.map((type, i) => {
            var typeClass = selectedType.indexOf(type) > -1 ? 'selected' : null;
            return <li key={i} className={typeClass} onClick={() => handleTypeSelect({type})}>{type}</li>
        });

        // creating the toggle tabs for the beer styles
        var styleOptions = styles.map((style, i) => {
            var styleClass = selectedStyle.indexOf(style) > -1 ? 'selected' : null;
            return <li key={i} className={styleClass} onClick={() => handleStyleSelect({style})}>{style}</li>
        });

        // creating the toggle tabs for the beer countries
        var countryOptions = countries.map((country, i) => {
            var styleClass = selectedCountry.indexOf(country) > -1 ? 'selected' : null;
            return <li key={i} className={styleClass} onClick={() => handleCountrySelect({country})}>{country}</li>
        });

        // filtering out the beers by checking if the selected tabs are indexed in each of the beers properties
        var beerList = Object.keys(beers).map((beer, i) => {

            let beerItem = beers[beer];
            let beerSaved = null;

            if((selectedType.indexOf(beerItem.type) > -1) || (selectedType.length === 0)) {
                if((selectedStyle.indexOf(beerItem.style) > -1) || (selectedStyle.length === 0)) {
                    if((selectedCountry.indexOf(beerItem.country) > -1) || (selectedCountry.length === 0)) {

                        if((userSavedBeers !== undefined) && (userSavedBeers !==  null)) {
                            for (var savedBeer in userSavedBeers) {
                                if(userSavedBeers[savedBeer].beer === beerItem.name) {
                                    beerSaved = 'saved';
                                }
                            }
                        }

                        return <li className={beerSaved} key={i}>
                                    <Link to={"/beers/" + beer}>
                                        <img src={beerItem.photo} alt={beerItem.name} className="beer-image" />
                                    </Link>
                                    <div className="beer-details">
                                        <h3>
                                            <Link to={"/beers/" + beer}
                                                  className="beer-title">
                                                {beerItem.name}
                                            </Link>
                                        </h3>
                                        <span className="italic">{beerItem.type}, {beerItem.style} and brewed in {beerItem.country}</span>
                                    </div>
                                </li>
                    }
                }
            }
        });

        return (
            <div>
                {!this.props.children ?
                    <div>
                        <section className="area buffer page-title">
                            <h1>Beers</h1>
                        </section>
                        <section className="area filters">
                            <section className={filterClasses}>
                                <h3 className="filter-button" onClick={() => handleFilterToggle()}>
                                    Filters
                                    {this.state.showFilter === 'hide' ? <span> +</span> : <span> -</span>}
                                </h3>
                                <div className="tabs">
                                    <ul className="tabs-list type">
                                        {typeOptions}
                                    </ul>
                                    <ul className="tabs-list">
                                        {styleOptions}
                                    </ul>
                                    <ul className="tabs-list">
                                        {countryOptions}
                                    </ul>
                                </div>
                            </section>
                        </section>
                        <section className="area buffer beer">
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
        styles: state.beerStyles,
        countries: state.countries,
        user: state.user
    }
}

const BeersContainer = connect(mapStateToProps)(BeersContainerView);

export default BeersContainer
