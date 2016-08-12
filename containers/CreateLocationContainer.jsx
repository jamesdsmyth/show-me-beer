import React from 'react'
import { connect } from 'react-redux'
import FilterBeersComponent from '../components/FilterBeersComponent.jsx'
import { CreateLocation } from '../data/FirebaseRef.jsx'

class CreateBeerContainerView extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};

        // binding this to createBeer() function
        this.createLocationObject = this.createLocationObject.bind(this);
    }

    // when the beers finally are loaded from firebase, we use this to set the state
    componentWillReceiveProps (props) {

        this.setState({
            beers: props.beers,
            createBeers: props.createBeers,
            locations: props.locations,
            user: props.user
        });
    }

    // creating the object to pass to firebase to add the beer to the list
    createLocationObject (event) {

        event.preventDefault();

        let error = false,
            matched = false,
            name = document.getElementById('name').value,
            friendlyUrl = name.replace(/\s+/g, '-').toLowerCase(),
            borough = $('#borough').val(),
            country = $('#country').val();

        // do a quick check of the select fields and if these pass we can check the name of the location
        // if there is an error with any of them, then we will not proceed
        if(borough === 'Borough') {
            alert('Location borough is required');
            error = true;
        }

        if(country === 'Country') {
            alert('Location country is required');
            error = true;
        }

        // if there are no errors with the input fields then we can cross reference the beer name
        if(error === false) {
            // now checking to see if the beer already exists
            for(var location in this.state.locations) {
                matched = this.state.locations[location].url === friendlyUrl ? true : false;
            }

            if(matched === false) {

                let locationObject = {
                    name: name,
                    street: document.getElementById('street').value,
                    borough: borough,
                    postcode: document.getElementById('postcode').value,
                    city: document.getElementById('city').value,
                    country: country,
                    description: document.getElementById('description').value,
                    phone: document.getElementById('phone').value,
                    url: friendlyUrl,
                    coords: {
                        latitude: document.getElementById('latitude').value,
                        longitude: document.getElementById('longitude').value
                    },
                    lastEditedBy: this.state.user.uid
                }

                // add to beers list
                CreateLocation(locationObject);
            } else {
                alert('Location already exists');
            }
        }
    }

    render () {

        var boroughs = this.props.boroughs,
            styles = this.props.styles,
            locations = this.props.locations,
            countries = this.props.countries,
            beers = this.state.beers || {};

        var boroughSelectOptions = boroughs.map((type, i) => {
            return <option key={i} value={type}>{type}</option>
        });

        var styleSelectOptions = styles.map((style, i) => {
            return <option key={i} value={style}>{style}</option>
        });

        var countrySelectOptions = countries.map((country, i) => {
            return <option key={i} value={country}>{country}</option>
        });

        return (
            <div>
                <section className="area buffer page-title">
                    <h1>Add a location</h1>
                </section>
                <form className="add-item-form" onSubmit={this.createLocationObject}>
                    <section className="area half buffer">
                        <h2>About the beer</h2>
                        <input id="name" className="input" placeholder="Name of location" type="text" />
                        <input id="street" className="input" placeholder="Street name" type="text" />
                        <input id="postcode" className="input" placeholder="Postcode" type="text" />
                        <input id="city" className="input" placeholder="City of origin" type="text" />

                        <select id="borough" className="select">
                            <option>Borough</option>
                            {boroughSelectOptions}
                        </select>
                        <select id="country" className="select">
                            <option>Country</option>
                            {countrySelectOptions}
                        </select>
                        <textarea id="description" className="input" placeholder="Tell us about the location" type="text" />
                        <input id="phone" className="input" placeholder="Phone number" type="number" />
                        <input id="photo" className="input" placeholder="image url" type="file" />
                        <input id="latitude" className="input" placeholder="Latitude" type="text" />
                        <input id="longitude" className="input" placeholder="Longitude" type="text" />
                    </section>
                    <section className="area buffer">
                        <h2>What beers do they sell?</h2>
                        {/* passing a prop flag so certain click events are displayed on the FilterLocationsComponent page */}
                        <FilterBeersComponent creationPage={true} />

                        { Object.keys(locations).length > 0 ?
                            <button type="submit" className="button">Add!</button>
                            : null
                        }
                    </section>
                </form>
            </div>
        )
    }
}

const MapStateToProps = (state) => {

    return {
        beers: state.beers,
        types: state.beerTypes,
        styles: state.beerStyles,
        locations: state.locations,
        countries: state.countries,
        boroughs: state.boroughs,
        createBeers: state.createBeers,
        user: state.user
    }
}

const CreateBeerContainer = connect(MapStateToProps)(CreateBeerContainerView);

export default CreateBeerContainer
