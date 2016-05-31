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

                console.log(response.result[0].result);
                if(response.result[0].result != null) {
                    this.setBorough(response.result[0].result.admin_district);
                } else {
                    this.setBorough(-1);
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

    render () {
        var locations = this.props.locations;
        var borough = this.state.borough;
        var locationsList = [];

        console.log('1', locations);

        if(borough == null) {
            locationsList = Object.keys(locations).map(function (location, i) {

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
                    // delete locations[location];
                }
            });

            var bbb = Object.keys(locations).filter(function (location, i) {
                if(locations[location].locationBorough === borough) {
                    return locations[location];
                }
                // return locations[location].locationBorough === borough//) //{
                //     return <li key={i}>
                //                 <Link to={"/locations/" + location}>
                //                     {location}
                //                 </Link>
                //             </li>
                // } else {
                //     delete locations[location];
                // }

            });

            console.log(bbb);


        }

        var postcodeClick = this.searchPostcode.bind(this);

        return (
            <div>
                {!this.props.children ?
                    <div>
                        <section className="split">
                            <h1>Locations</h1>
                            {borough !== null && borough !== -1  ? <h2>Locations in {borough}</h2> : null}
                            {borough === -1 ? <h2>Incorrect postcode!</h2> : null}
                            <form>
                                <input id="postcode" type="text" />
                                <button type="submit" onClick={postcodeClick}>Search postcode</button>
                            </form>
                            <ul>
                                {locationsList}
                            </ul>
                        </section>
                        <section className="split">
                            <MapContainer locations={locations} />
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
        locations: state.shortLocations
    }
}

const LocationsContainer = connect(mapStateToProps)(LocationsContainerView)

export default LocationsContainer
