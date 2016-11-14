import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Store from '../reducers/CombinedReducers';
import { addLocationToBeer, removeLocationFromBeer } from '../actions/actions';

import MapComponent from './MapComponent';

class FilterLocationsComponentView extends React.Component {

    // adds the location to the beer when creating a beer
    // function only exposed on the create beer page
    static addLocationToBeer(locationKey) {
        Store.dispatch(addLocationToBeer(locationKey));
    }

    static removeLocationFromBeer(locationKey) {
        Store.dispatch(removeLocationFromBeer(locationKey));
    }

    constructor(props) {
        super(props);

        this.state = {
            borough: 'all',
            showFilter: 'hide',
            boroughs: this.props.boroughs,
            firebaseLocations: this.props.firebaseLocations,
            isCreationPage: this.props.creationPage || false,
            createBeers: this.props.createBeers
        };
    }

    // when the beers fibally are loaded from firebase, we use this to set the state
    componentWillReceiveProps(props) {
        this.setState({
            firebaseLocations: props.firebaseLocations,
            createBeers: props.createBeers
        });
    }

    // setting borough through the postcode input box
    setBorough(borough) {
        this.setState({ borough });
    }

    searchPostcode(e) {
        e.preventDefault();

        const postcode = document.getElementById('postcode').value;

        $.ajax({
            type: 'POST',
            url: 'https://api.postcodes.io/postcodes',
            data: {
                postcodes: [postcode]
            },
            success: (response) => {
                if (response.result[0].result != null) {
                    this.setBorough(response.result[0].result.admin_district);
                } else {
                    this.setBorough('all');
                }
            },
            error: (response) => {
                console.log('error', response);
            }
        });
    }

    // hack here... because updating the state occurs asyncronously, the re-render is fired before the state is updated, therefore
    // the render still things the borough is the old value
    boroughHandleSelect(borough) {
        let name = borough.borough;
        if (this.state.borough === name) {
            name = 'all';
        }

        this.setState({ borough: name }, () => {
            this.setState({ borough: name });
        });
    }

    toggleFilter() {
        this.setState({ showFilter: this.state.showFilter === 'show' ? 'hide' : 'show' });
    }

    render() {
        const locations = this.state.firebaseLocations;
        const stateBoroughs = this.state.boroughs;
        const stateBorough = this.state.borough;
        const createBeers = this.state.createBeers.locations;

        let locationsList = [];
        const locationsMaplist = {};
        const filterClasses = `${this.state.showFilter} filter`;
        let locationCount = -1;
        let toReturn = null;

        // creating the toggle tabs for the boroughs
        const boroughOptions = stateBoroughs.map((borough, i) => {
            const newClass = borough === stateBorough ? 'selected' : null;
            return <li key={i} className={newClass} onClick={() => this.boroughHandleSelect({ borough })}>{borough}</li>;
        });

        for (const i in locations) {
            if ((locations[i].borough === stateBorough) || stateBorough === 'all') {
                locationsMaplist[i] = locations[i];
            }
        }

        // filtering all locations to see whether they match the borough selected
        locationsList = Object.keys(locations).map((location, i) => {
            if ((locations[location].borough === stateBorough) || stateBorough === 'all') {
                locationCount++;

                // if we are on a creation page then we need to display the add/remove location buttons
                if (this.state.isCreationPage === true) {
                    let present = false;

                    for (const addedLocation in createBeers) {
                        if (createBeers[addedLocation].uid === location) {
                            present = true;
                        }
                    }

                    toReturn =
                        <li key={i} className="location">
                            <Link to={`/locations/${locations[location].url}`}>
                                {locations[location].name}
                            </Link>
                            {present === true ?
                                <span className="button" onClick={() => this.removeLocationFromBeer(location)}>Remove</span>
                                :
                                <span className="button" onClick={() => this.addLocationToBeer(location)}>Add</span>
                            }
                        </li>;
                } else {
                    toReturn =
                        <li key={i} className="basic-location">
                            <Link to={`/locations/${locations[location].url}`}>
                                {locations[location].name}
                            </Link>
                        </li>;
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
                            <div className="postcode-form">
                                <input id="postcode" className="input" placeholder="E8 4DA" type="text" />
                                <button type="button" className="button" onClick={this.postcodeClick}>Search postcode</button>
                            </div>
                            <ul className="tabs-list">
                                {boroughOptions}
                            </ul>
                        </div>
                    </section>
                    {stateBorough === -1 ? <h2>Incorrect postcode!</h2> : null}
                </section>
                <section className="area buffer locations">
                    <div className="locations-list">
                        {locationCount === -1 ? <span>There are currently no locations in {stateBorough}</span> : null}
                        <ul className="locations">
                            {locationsList}
                        </ul>
                    </div>
                    {Object.keys(locationsMaplist).length !== 0 ? <MapComponent locations={locationsMaplist} /> : null}
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        boroughs: state.boroughs,
        firebaseLocations: state.locations,
        createBeers: state.createBeers
    };
};

FilterLocationsComponentView.propTypes = {
    boroughs: PropTypes.arrayOf,
    firebaseLocations: PropTypes.arrayOf,
    creationPage: PropTypes.bool,
    createBeers: PropTypes.bool
};

const FilterLocationsComponent = connect(mapStateToProps)(FilterLocationsComponentView);

export default FilterLocationsComponent;
