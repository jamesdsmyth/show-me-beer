import React from 'react'
import { connect } from 'react-redux'
import { CreateBeer } from '../data/FirebaseRef.jsx'

class CreateBeerContainerView extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};

        // binding this to createBeer() function
        this.createBeer = this.createBeer.bind(this);
    }

    // when the beers fibally are loaded from firebase, we use this to set the state
    componentWillReceiveProps (props) {

        this.setState({
            beers: props.beers
        });
    }

    createBeer (event) {

        event.preventDefault();

        let matched = false;
        let beerObject = {
            name: document.getElementById('name').value,
            alcoholContent: document.getElementById('alcoholContent').value,
            description: document.getElementById('description').value,
            city: document.getElementById('city').value,
            country: $('#country').text(),
            manufacturer: document.getElementById('brewer').value,
            photo: document.getElementById('photo').value,
            type: $('#type').text(),
            style: $('#style').text()
        }

        // now checking to see if the beer already exists
        for(var beer in this.state.beers) {
            console.log(this.state.beers[beer]);
            if(this.state.beers[beer].name.toLowerCase() === beerObject.name.toLowerCase()) {
                matched = true;

            }
        }

        if(matched === false) {
            // add to beers list
            CreateBeer(beerObject);
        } else {
            alert('Beer already exists');
        }
        console.log(beerObject);
    }


    render () {

        var types = this.props.types,
            styles = this.props.styles,
            locations = this.props.locations,
            countries = this.props.countries,
            beers = this.state.beers || {}

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
                <section className="area">
                    <form className="add-beer-form" onSubmit={this.createBeer}>
                        <input id="name" className="input" placeholder="Name of beer" type="text" />
                        <input id="alcoholContent" className="input" placeholder="Alcohol content" type="number" />
                        <textarea id="description" className="input" placeholder="Tell us about the beer" type="text" />
                        <input id="city" className="input" placeholder="City of origin" type="text" />
                        <select>
                            <option>Country</option>
                            {countrySelectOptions}
                        </select>
                        <input id="brewer" className="input" placeholder="Brewer" type="text" />
                        <input id="photo" className="input" placeholder="image url" type="text" />
                        <select>
                            <option>Type</option>
                            {typeSelectOptions}
                        </select>
                        <select>
                            <option>Style</option>
                            {styleSelectOptions}
                        </select>
                        { Object.keys(beers).length > 0 ?
                            <button type="submit" className="button">Add!</button>
                            : null
                        }
                    </form>
                </section>
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
        user: state.user
    }
}

const CreateBeerContainer = connect(MapStateToProps)(CreateBeerContainerView);

export default CreateBeerContainer
