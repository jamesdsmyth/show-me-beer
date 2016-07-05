import React, { propsTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class LocationsContainerView extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            borough: 'all',
            boroughs: this.props.boroughs,
            showFilter: 'hide',
            locations: this.props.locations,
            blah: this.props.saasa
        }

        console.log(this.state);
    }

    searchPostcode (e) {
        e.preventDefault();

        var postcode = document.getElementById('postcode').value;
        var data = { "postcodes" : [postcode] }

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

    render () {
        var locations = this.state.locations,
            stateBoroughs = this.state.boroughs,
            stateBorough = this.state.borough,
            postcodeClick = this.searchPostcode.bind(this),
            handleBoroughChange = this.boroughHandleSelect.bind(this),
            locationsList = [],
            locationsMaplist = {},
            handleFilterToggle = this.toggleFilter.bind(this),
            filterClasses = this.state.showFilter + ' filter',
            locationCount = -1;


        // creating the toggle tabs for the boroughs
        var boroughOptions = stateBoroughs.map(function (borough, i) {
            var newClass = borough === stateBorough ? 'selected' : null
            return <li key={i} className={newClass} onClick={() => handleBoroughChange({borough})}>{borough}</li>
        });

        for(var i in locations) {
            if((locations[i].borough === stateBorough) || stateBorough === 'all') {
                locationsMaplist[i] = locations[i];
            }
        }

        // filtering all locations to see whether they match the borough selected
        locationsList = Object.keys(locations).map(function (location, i) {
            if((locations[location].borough === stateBorough) || stateBorough === 'all') {
                locationCount = i++;
                return <li key={i}>
                            <Link to={"/locations/" + location}>
                                {locations[location].name}
                            </Link>
                        </li>
            }
        });

        console.log(locationsMaplist);

        return (
            <div>
                {!this.props.children ?
                    <div>
                        <section className="area buffer page-title">
                            <h1>Locations {stateBorough !== 'all' && stateBorough !== -1 ? <span>in {stateBorough}</span> : null}</h1>
                        </section>
                        <section className="area filters">
                            <section className={filterClasses}>
                                <h3 className="filter-button" onClick={() => handleFilterToggle()}>
                                    Filters
                                    {this.state.showFilter === 'hide' ? <span> +</span> : <span> -</span>}
                                </h3>
                                <div className="tabs">
                                    <form className="postcode-form">
                                        <input id="postcode" placeholder="E8 4DA" type="text" />
                                        <button type="submit" className="button" onClick={postcodeClick}>Search postcode</button>
                                    </form>
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
                                <ul>
                                    {locationsList}
                                </ul>
                            </div>
                            <MapContainer locations={locationsMaplist} />
                        </section>
                    </div>
                : null}
                {this.props.children}
            </div>
        )
    }
}

// this is not being updated.
// something like this.setState({ timer: this.state.timer + 1000 }); could work p

const mapStateToProps = (state) => {
    console.log(state.locations);
    return {
        locations: state.shortLocations,
        boroughs: state.boroughs,
        saasa: state.locations
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
