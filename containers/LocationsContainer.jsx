import React, { propsTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class LocationsContainerView extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            borough: 'all',
            boroughs: this.props.boroughs
        }
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

    render () {
        var locations = this.props.locations;
        var stateBoroughs = this.state.boroughs;
        var stateBorough = this.state.borough;
        var postcodeClick = this.searchPostcode.bind(this);
        var handleBoroughChange = this.boroughHandleSelect.bind(this);
        var locationsList = [];
        var locationsMaplist = {};

        // creating the toggle tabs for the boroughs
        var boroughOptions = stateBoroughs.map(function (borough, i) {
            var newClass = borough === stateBorough ? 'selected' : null
            return <li key={i} className={newClass} onClick={() => handleBoroughChange({borough})}>{borough}</li>
        });

        for(var i in locations) {

                console.log(locations[i].borough);
                console.log(stateBorough);
            if((locations[i].borough === stateBorough) || stateBorough === 'all') {
                locationsMaplist[i] = locations[i];
            }
        }

        console.log(locationsMaplist);

        // filtering all locations to see whether they match the borough selected
        locationsList = Object.keys(locations).map(function (location, i) {
            if((locations[location].borough === stateBorough) || stateBorough === 'all') {
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
                        <section className="split">
                            <h1>Locations</h1>
                            {stateBorough !== 'all' && stateBorough !== -1 ? <h2>Locations in {stateBorough}</h2> : <h2>All locations</h2>}
                            {stateBorough === -1 ? <h2>Incorrect postcode!</h2> : null}
                            <form>
                                <input id="postcode" type="text" />
                                <button type="submit" onClick={postcodeClick}>Search postcode</button>
                            </form>
                            <ul className="tabs-list">
                                {boroughOptions}
                            </ul>
                        </section>
                        <section className="split">
                            <ul>
                                {locationsList}
                            </ul>
                            <MapContainer locations={locationsMaplist} />
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
        locations: state.shortLocations,
        boroughs: state.boroughs
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
