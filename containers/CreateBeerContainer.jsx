import React from 'react'
import { connect } from 'react-redux'
import { CreateBeer } from '../data/FirebaseRef.jsx'
import MapComponent from '../components/MapComponent.jsx'
import FilterLocationsComponent from '../components/FilterLocationsComponent.jsx'

class CreateBeerContainerView extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};

        // binding this to createBeer() function
        this.createBeerObject = this.createBeerObject.bind(this);
    }

    // when the beers fibally are loaded from firebase, we use this to set the state
    componentWillReceiveProps (props) {
        this.setState({
            beers: props.beers,
            createBeers: props.createBeers
        });
    }

    // creating the object to pass to firebase to add the beer to the list
    createBeerObject (event) {

        event.preventDefault();
        let error = false;
        let matched = false;
        let beerObject = {
            name: document.getElementById('name').value,
            alcoholContent: document.getElementById('alcoholContent').value,
            description: document.getElementById('description').value,
            city: document.getElementById('city').value,
            country: $('#country').val(),
            manufacturer: document.getElementById('brewer').value,
            photo: document.getElementById('photo').value,
            type: $('#type').val(),
            style: $('#style').val(),
            locations: this.state.createBeers.locations
        }

        // do a quick check of the select fields and if these pass we can check the name of the beer
        // if there is an error with any of them, then we will not proceed
        if(beerObject.country === 'Country') {
            alert('Beer country is required');
            error = true;
        }

        if(beerObject.type === 'Type') {
            alert('Beer type is required');
            error = true;
        }

        if(beerObject.style === 'Style') {
            alert('Beer style is required');
            error = true;
        }

        // if there are no errors with the input fields then we can cross reference the beer name
        if(error === false) {
            // now checking to see if the beer already exists
            for(var beer in this.state.beers) {
                if(this.state.beers[beer].name.toLowerCase() === beerObject.name.toLowerCase()) {
                    matched = true;
                }
            }

            if(matched === false) {
                // add to beers list
                CreateBeer(beerObject);
                console.log(beerObject);
            } else {
                alert('Beer already exists');
            }
        }
    }





    addLocationToBeer (location) {
        console.log(location)
    }





    render () {

        var types = this.props.types,
            styles = this.props.styles,
            locations = this.props.locations,
            countries = this.props.countries,
            beers = this.state.beers || {};

        var typeSelectOptions = types.map((type, i) => {
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
                    <h1>Add a beer</h1>
                </section>
                <section className="area half buffer">
                    <h2>About the beer</h2>
                    <form className="add-beer-form" onSubmit={this.createBeerObject}>
                        <input id="name" className="input" placeholder="Name of beer" type="text" />
                        <input id="alcoholContent" className="input" placeholder="Alcohol content" type="number" />
                        <textarea id="description" className="input" placeholder="Tell us about the beer" type="text" />
                        <input id="city" className="input" placeholder="City of origin" type="text" />
                        <select id="country" className="select">
                            <option>Country</option>
                            {countrySelectOptions}
                        </select>
                        <input id="brewer" className="input" placeholder="Brewer" type="text" />
                        <input id="photo" className="input" placeholder="image url" type="text" />
                        <select id="type" className="select">
                            <option>Type</option>
                            {typeSelectOptions}
                        </select>
                        <select id="style" className="select">
                            <option>Style</option>
                            {styleSelectOptions}
                        </select>
                        { Object.keys(beers).length > 0 ?
                            <button type="submit" className="button">Add!</button>
                            : null
                        }
                    </form>
                </section>
                <section className="area half buffer">
                    <h2>Who sells this beer?</h2>
                </section>
                {/* passing a prop flag so certain click events are displayed on the FilterLocationsComponent page */}
                <FilterLocationsComponent creationPage={true}/>
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        beers: state.beers,
        types: state.beerTypes,
        styles: state.beerStyles,
        locations: state.shortLocations,
        countries: state.countries,
        createBeers: state.createBeers
    }
}

const CreateBeerContainer = connect(MapStateToProps)(CreateBeerContainerView);

export default CreateBeerContainer
