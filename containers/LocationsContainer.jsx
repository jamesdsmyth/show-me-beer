import React, { propsTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class LocationsContainerView extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            borough: 'all'
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

    setBorough (borough) {
        this.setState({ borough: borough });
    }

    // hack here... because updating the state occurs asyncronously, the re-render is fired before the state is updated, therefore
    // the render still things the borough is the old value
    boroughHandleSelect (borough) {
        this.setState({ borough: borough.borough }, () => {
            this.setState({ borough: borough.borough });
        });
    }

    render () {
        var locations = this.props.locations;
        var boroughs = this.props.boroughs;
        var borough = this.state.borough;
        var postcodeClick = this.searchPostcode.bind(this);
        var handleBoroughChange = this.boroughHandleSelect.bind(this);
        var locationsList = [];
        var locationsMaplist = {};

        // creating the select dropdown options for the boroughs
        var boroughOptions = boroughs.map(function (borough, i) {
            return <li key={i} onClick={() => handleBoroughChange({borough})}>{borough}</li>
        });

        for(var i in locations) {
            if((locations[i].borough === borough) || borough === 'all') {
                locationsMaplist[i] = locations[i];
            }
        }

        // filtering all locations to see whether they match the borough selected
        locationsList = Object.keys(locations).map(function (location, i) {
            if((locations[location].borough === borough) || borough === 'all') {
                return <li key={i}>
                            <Link to={"/locations/" + location}>
                                {locations[location].name}
                            </Link>
                        </li>
            }
        });

        return (
            <div>
                {!this.props.children ?
                    <div>
                        <section className="split">
                            <h1>Locations</h1>
                            {borough !== 'all' && borough !== -1 ? <h2>Locations in {borough}</h2> : null}
                            {borough === -1 ? <h2>Incorrect postcode!</h2> : null}
                            <form>
                                <input id="postcode" type="text" />
                                <button type="submit" onClick={postcodeClick}>Search postcode</button>
                            </form>
                            <ul>
                                {locationsList}
                            </ul>
                            <ul className="tabs-list">
                                {boroughOptions}
                            </ul>
                        </section>
                        <section className="split">
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
