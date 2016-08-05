import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapComponent from './MapComponent.jsx'

class FilterLocationsComponentView extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            borough: 'all',
            showFilter: 'hide',
            boroughs: this.props.boroughs,
            firebaseLocations: this.props.firebaseLocations
        }
    }

    // this is called when the firebase data is received
    componentWillReceiveProps (props) {
        this.setState({
            firebaseLocations: props.firebaseLocations
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

    render () {
        var shortLocations = this.state.firebaseLocations,
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

        for(var i in shortLocations) {
            if((shortLocations[i].borough === stateBorough) || stateBorough === 'all') {
                locationsMaplist[i] = shortLocations[i];
            }
        }

        // filtering all locations to see whether they match the borough selected
        locationsList = Object.keys(shortLocations).map((location, i) => {
            if((shortLocations[location].borough === stateBorough) || stateBorough === 'all') {
                locationCount = i++;
                return <li key={i}>
                            <Link to={"/locations/" + location}>
                                {shortLocations[location].name}
                            </Link>
                        </li>
            }
        });

        return (
            <div>
                {!this.props.children ?
                    <div>
                        <section className="area filters">
                            <section className={filterClasses}>
                                <h3 className="filter-button" onClick={() => handleFilterToggle()}>
                                    Filters
                                    {this.state.showFilter === 'hide' ? <span> +</span> : <span> -</span>}
                                </h3>
                                <div className="tabs">
                                    <form className="postcode-form">
                                        <input id="postcode" className="input" placeholder="E8 4DA" type="text" />
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
                            {Object.keys(locationsMaplist).length !== 0 ? <MapComponent locations={locationsMaplist} /> : null}
                        </section>
                    </div>
                : null}
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        boroughs: state.boroughs,
        firebaseLocations: state.locations
    }
}

const FilterLocationsComponent = connect(mapStateToProps)(FilterLocationsComponentView)

export default FilterLocationsComponent