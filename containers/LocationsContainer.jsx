import React, { propsTypes} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MapContainer from '../containers/MapContainer.jsx'

class LocationsContainerView extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            borough: null
        }
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
                // var borough = response.result[0].result.admin_district;
                this.setBorough(response.result[0].result.admin_district);
            },
            error: (response) => {
                console.log('error', response);
            }
        });
    }

    setBorough (borough) {
        // alert('setting borough')
        if(borough != null) {
            console.log(this.state.borough);
            this.setState({ borough: borough });
        }
    }

    render () {
        var locations = this.props.locations;
        var borough = this.state.borough;
        var locationsList = [];
        var sss = {};

        console.log('1', locations);

        if(borough == null) {
            locationsList = Object.keys(locations).map(function (location, i) {

                // console.log(location)

                return <li key={i}>
                            <Link to={"/locations/" + location}>
                                {location}
                            </Link>
                        </li>
            });
        } else {
            locationsList = Object.keys(locations).map(function (location, i) {
                if(locations[location].locationBorough === borough) {
                    return <li key={i}>
                                <Link to={"/locations/" + location}>
                                    {location}
                                </Link>
                            </li>
                } else {
                    delete locations[location];
                }
            });



        }

        console.log('locations list ', locationsList);
        console.log('2', locations)

        var postcodeClick = this.searchPostcode.bind(this);

        return (
            <div>
                {!this.props.children ?
                    <section>
                        <h1>Locations</h1>
                        {borough != null ? <h2>Locations in {borough}</h2> : null}
                        <form>
                            <input id="postcode" type="text" />
                            <button type="submit" onClick={postcodeClick}>Search postcode</button>
                        </form>
                        <ul>
                            {locationsList}
                        </ul>
                        <MapContainer locations={locations} />
                    </section>
                : null}
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        locations: state.shortLocations
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
