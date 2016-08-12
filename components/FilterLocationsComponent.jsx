import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Store from '../reducers/CombinedReducers.jsx'
import { addLocationToBeer, removeLocationFromBeer } from '../actions/actions.js'

import MapComponent from './MapComponent.jsx'

class FilterLocationsComponentView extends React.Component {

    constructor (props) {
        super (props);

        console.log(props)

        this.state = {
            borough: 'all',
            showFilter: 'hide',
            boroughs: this.props.boroughs,
            firebaseLocations: this.props.firebaseLocations,
            isCreationPage: this.props.creationPage || false,
            createBeers: this.props.createBeers
        }
    }

    // when the beers fibally are loaded from firebase, we use this to set the state
    componentWillReceiveProps (props) {

        this.setState({
            firebaseLocations: props.firebaseLocations,
            createBeers: props.createBeers
        });
    }

    searchPostcode (e) {
        e.preventDefault();

        var postcode = document.getElementById('postcode').value;
        var data = {
            "postcodes" : [postcode]
        }

        $.ajax({
            type: 'POST',
            url: 'https://api.postcodes.io/postcodes',
            data: data,
            success: (response) => {
                if(response.result[0].result != null) {
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

    // setting borough through the postcode input box
    setBorough (borough) {
        this.setState({ borough: borough });
    }

    // hack here... because updating the state occurs asyncronously, the re-render is fired before the state is updated, therefore
    // the render still things the borough is the old value
    boroughHandleSelect (borough) {

        var name = borough.borough
        if(this.state.borough === name) {
            name = 'all';
        }

        this.setState({ borough: name }, () => {
            this.setState({ borough: name });
        });
    }

    toggleFilter () {
        var toggleBoolean;
        this.setState({'showFilter': toggleBoolean = this.state.showFilter === 'show' ? 'hide' : 'show'});
    }

    // adds the location to the beer when creating a beer
    // function only exposed on the create beer page
    addLocationToBeer (locationKey) {
        Store.dispatch(addLocationToBeer(locationKey));
    }

    removeLocationFromBeer (locationKey) {
        Store.dispatch(removeLocationFromBeer(locationKey))
    }

    render () {
        var locations = this.state.firebaseLocations,
            stateBoroughs = this.state.boroughs,
            stateBorough = this.state.borough,
            createBeers = this.state.createBeers.locations,
            postcodeClick = this.searchPostcode.bind(this),
            locationsList = [],
            locationsMaplist = {},
            filterClasses = this.state.showFilter + ' filter',
            locationCount = -1;

        // creating the toggle tabs for the boroughs
        var boroughOptions = stateBoroughs.map(function (borough, i) {
            var newClass = borough === stateBorough ? 'selected' : null
            return <li key={i} className={newClass} onClick={() => this.boroughHandleSelect({borough})}>{borough}</li>
        }.bind(this));

        for(var i in locations) {
            if((locations[i].borough === stateBorough) || stateBorough === 'all') {
                locationsMaplist[i] = locations[i];
            }
        }

        // filtering all locations to see whether they match the borough selected
        locationsList = Object.keys(locations).map((location, i) => {
            if((locations[location].borough === stateBorough) || stateBorough === 'all') {
                locationCount = i++;

                // if we are on a creation page then we need to display the add/remove location buttons
                if(this.state.isCreationPage === true) {

                    let present = false;

                    for(var addedLocation in createBeers) {
                        if(createBeers[addedLocation].uid === location) {
                            present = true;
                        }
                    }

                    return <li key={i} className="location">
                                <Link to={"/locations/" + locations[location].url}>
                                    {locations[location].name}
                                </Link>
                                {present === true ?
                                    <span className="button" onClick={() => this.removeLocationFromBeer(location)}>Remove</span>
                                    :
                                    <span className="button" onClick={() => this.addLocationToBeer(location)}>Add</span>
                                }
                            </li>
                } else {
                    return <li key={i} className="basic-location">
                                <Link to={"/locations/" + locations[location].name}>
                                    {locations[location].name}
                                </Link>
                            </li>
                }
            }
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
                                <button type="button" className="button" onClick={postcodeClick}>Search postcode</button>
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
        )

    }
}

const mapStateToProps = (state) => {

    return {
        boroughs: state.boroughs,
        firebaseLocations: state.locations,
        createBeers: state.createBeers
    }
}

const FilterLocationsComponent = connect(mapStateToProps)(FilterLocationsComponentView)

export default FilterLocationsComponent
