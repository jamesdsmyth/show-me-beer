import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Store from '../reducers/CombinedReducers';
import { addBeerToLocation, removeBeerFromLocation } from '../actions/actions';

class FilterBeersComponentView extends React.Component {

    // adds the location to the beer when creating a beer
    // function only exposed on the create beer page
    static addBeerToLocation(locationKey) {
        Store.dispatch(addBeerToLocation(locationKey));
    }

    static removeBeerFromLocation(locationKey) {
        Store.dispatch(removeBeerFromLocation(locationKey));
    }

    constructor(props) {
        super(props);

        this.state = {
            types: this.props.types,
            styles: this.props.styles,
            countries: this.props.countries,
            type: [],
            style: [],
            country: [],
            showFilter: 'hide',
            isCreationPage: this.props.creationPage,
            createLocations: this.props.createLocations
        };
    }

    // when the beers fibally are loaded from firebase, we use this to set the state
    componentWillReceiveProps(props) {
        this.setState({
            createLocations: props.createLocations
        });
    }

    handleTypeClick(type) {
        const types = this.state.type;
        let isPresent = 0;

        // looping through the currently selected types array and if the passed 'type' is in the list it is removed. Else added.
        for (const i in types) {
            if (type.type === types[i]) {
                isPresent++;
                types.splice(i, 1);
            }
        }

        if (isPresent === 0) {
            types.push(type.type);
        }

        this.setState({ type: types });
    }

    handleStyleClick(style) {
        const styles = this.state.style;
        let isPresent = 0;

        // looping through the currently selected styles array and if the passed 'style' is in the list it is removed. Else added.
        for (const i in styles) {
            if (style.style === styles[i]) {
                isPresent++;
                styles.splice(i, 1);
            }
        }

        if (isPresent === 0) {
            styles.push(style.style);
        }

        this.setState({ style: styles });
    }

    handleCountryClick(country) {
        const countries = this.state.country;
        let isPresent = 0;

        // looping through the currently selected styles array and if the passed 'style' is in the list it is removed. Else added.
        for (const i in countries) {
            if (country.country === countries[i]) {
                isPresent++;
                countries.splice(i, 1);
            }
        }

        if (isPresent === 0) {
            countries.push(country.country);
        }

        this.setState({ country: countries });
    }

    toggleFilter() {
        this.setState({ showFilter: this.state.showFilter === 'show' ? 'hide' : 'show' });
    }

    render() {
        const beers = this.props.beers;
        const types = this.state.types;
        const styles = this.state.styles;
        const countries = this.state.countries;
        const selectedType = this.state.type;
        const selectedStyle = this.state.style;
        const selectedCountry = this.state.country;
        const filterClasses = `${this.state.showFilter} filter beers`;
        const user = this.props.user;
        const createLocations = this.state.createLocations.beers;

        // creating the toggle tabs for the beer types
        const typeOptions = types.map((type, i) => {
            const typeClass = selectedType.indexOf(type) > -1 ? 'selected' : null;
            return <li key={i} className={typeClass} onClick={() => handleTypeClick({ type })}>{type}</li>;
        });

        // creating the toggle tabs for the beer styles
        const styleOptions = styles.map((style, i) => {
            const styleClass = selectedStyle.indexOf(style) > -1 ? 'selected' : null;
            return <li key={i} className={styleClass} onClick={() => this.handleStyleClick({ style })}>{style}</li>;
        });

        // creating the toggle tabs for the beer countries
        const countryOptions = countries.map((country, i) => {
            const styleClass = selectedCountry.indexOf(country) > -1 ? 'selected' : null;
            return <li key={i} className={styleClass} onClick={() => handleCountryClick({ country })}>{country}</li>;
        });

        // filtering out the beers by checking if the selected tabs are indexed in each of the beers properties
        const beerList = Object.keys(beers).map((beer, i) => {
            const beerItem = beers[beer];
            let beerSaved = null;
            let toReturn = null;

            if ((selectedType.indexOf(beerItem.type) > -1) || (selectedType.length === 0)) {
                if ((selectedStyle.indexOf(beerItem.style) > -1) || (selectedStyle.length === 0)) {
                    if ((selectedCountry.indexOf(beerItem.country) > -1) || (selectedCountry.length === 0)) {
                        // if we are on a creation page then we need to display the add/remove location buttons
                        if (this.state.isCreationPage === true) {
                            let present = false;

                            for (const addedLocation in createLocations) {
                                if (createLocations[addedLocation].uid === beer) {
                                    present = true;
                                }
                            }

                            toReturn =
                                <li key={i}>
                                    <Link to={`/beers/${beerItem.url}`}>
                                        <img src={beerItem.photo} alt={beerItem.name} className="beer-image" />
                                    </Link>
                                    {present === true ?
                                        <span className="button" onClick={() => this.removeBeerFromLocation(beer)}>Remove</span>
                                        :
                                        <span className="button" onClick={() => this.addBeerToLocation(beer)}>Add</span>
                                    }
                                    <div className="beer-details">
                                        <h3>
                                            <Link
                                                to={`/beers/${beerItem.url}`}
                                                className="beer-title"
                                            >
                                                {beerItem.name}
                                            </Link>
                                        </h3>
                                        <span className="italic">{beerItem.type}, {beerItem.style} and brewed in {beerItem.country}</span>
                                    </div>
                                </li>;
                        } else {
                            const userBeers = user.beers.data;

                            if ((userBeers !== undefined) && (userBeers !== null)) {
                                for (const savedBeer in userBeers) {
                                    if (userBeers[savedBeer].uid === beer) {
                                        beerSaved = 'saved';
                                    }
                                }
                            }

                            toReturn =
                                <li className={beerSaved} key={i}>
                                    <Link to={`/beers/${beerItem.url}`}>
                                        <img src={beerItem.photo} alt={beerItem.name} className="beer-image" />
                                    </Link>
                                    <div className="beer-details">
                                        <h3>
                                            <Link
                                                to={`/beers/${beerItem.url}`}
                                                className="beer-title"
                                            >
                                                {beerItem.name}
                                            </Link>
                                        </h3>
                                        <span className="italic">{beerItem.type}, {beerItem.style} and brewed in {beerItem.country}</span>
                                    </div>
                                </li>;
                        }
                    }
                }
            }

            return toReturn;
        });

        return (
            <div>
                <section className="area filters">
                    <section className={filterClasses}>
                        <h3 className="filter-button" onClick={() => this.toggleFilter()}>
                            Filters
                            {this.state.showFilter === 'hide' ? <span> +</span> : <span> -</span>}
                        </h3>
                        <div className="tabs">
                            <ul className="tabs-list">
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        beers: state.beers,
        types: state.beerTypes,
        styles: state.beerStyles,
        countries: state.countries,
        user: state.user,
        createLocations: state.createLocations
    };
};

FilterBeersComponentView.propTypes = {
    user: PropTypes.shape,
    beers: PropTypes.arrayOf,
    types: PropTypes.arrayOf,
    styles: PropTypes.arrayOf,
    countries: PropTypes.arrayOf,
    creationPage: PropTypes.bool,
    createLocations: PropTypes.bool
};

const FilterBeersComponent = connect(mapStateToProps)(FilterBeersComponentView);

export default FilterBeersComponent;
