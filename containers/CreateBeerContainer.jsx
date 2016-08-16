import React from 'react'
import { connect } from 'react-redux'
import { CreateBeer } from '../data/FirebaseRef.jsx'
import MapComponent from '../components/MapComponent.jsx'
import FilterLocationsComponent from '../components/FilterLocationsComponent.jsx'

class CreateBeerContainerView extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            formFillCount: 0,
            showNextButton: false
        };

        // binding this to createBeer() function
        this.createBeerObject = this.createBeerObject.bind(this);
    }

    // when the beers finally are loaded from firebase, we use this to set the state
    componentWillReceiveProps (props) {

        this.setState({
            beers: props.beers,
            createBeers: props.createBeers,
            user: props.user
        });
    }

    // checks the section to see whether it has been filled out correctly
    checkFormSection (sectionNumber) {
        let completed = 0;
        let inputCount = 0;
        let section = $('.form-row.' + sectionNumber);

        section.find('.input').each(function () {
            inputCount++;
            if($(this).val() !== '') {
                completed++;
            }
        });

        // if the number of completed fields === the number of inputs, then we can show the next button
        if(completed === inputCount) {
            this.setState({
                showNextButton: true
            });
        } else {
            this.setState({
                showNextButton: false
            });
        }
    }

    // we check whether the name of the beer exists here. If it does we break the loop and show a warning.
    // the user can not go forward without creating a new beer with an individual name
    checkBeerName () {

        let matched = false;
        for(var beer in this.state.beers) {
            matched = this.state.beers[beer].name.toLowerCase() === $('#name').val().toLowerCase() ? true : false;

            if(matched === true) {
                alert('This beer already exists');
                break;
            }
        }

        matched === false ? this.nextButtonClick() : null;
    }

    // clicking the next button will change the question section.
    // this is done by increasing the formFillCount which matches to the section that relates to that number
    nextButtonClick () {

        // setting the state with the values in the form fields. If a value is
        this.setState({
            name: this.state.name === undefined ? $('#name').val() : this.state.name,
            alcoholContent: this.state.alcoholContent === undefined ? $('#alcoholContent').val() : this.state.alcoholContent,
            description: this.state.description === undefined ? $('#description').val() : this.state.description,
            manufacturer: this.state.manufacturer === undefined ? $('#brewer').val() : this.state.manufacturer,
            city: this.state.city === undefined ? $('#city').val() : this.state.city,
            country: this.state.country === undefined ? $('#country').val() : this.state.country,
            type: this.state.type === undefined ? $('#type').val() : this.state.type,
            style: this.state.style === undefined ? $('#style').val() : this.state.style,
            formFillCount: this.state.formFillCount + 1,
            showNextButton: false
        });

        this.setFieldData();
    }

    previousButtonClick () {
        this.setState({
            formFillCount: this.state.formFillCount - 1,
            showNextButton: true
        });

        this.setFieldData();
    }

    // when we navigate through the steps, we want to populate data that the user has already filled out
    setFieldData () {

        console.log('updating')

        setTimeout(() => {
            $('#name').val(this.state.name);
            $('#alcoholContent').val(this.state.alcoholContent);
            $('#description').val(this.state.description);
            $('#brewer').val(this.state.brewer);
            $('#city').val(this.state.city);
            $('#country').val(this.state.country);
            $('#type').val(this.state.type);
            $('#style').val(this.state.style);
        }, 500);
    }

    // creating the object to pass to firebase to add the beer to the list
    createBeerObject (event) {

        event.preventDefault();

        let error = false,
            matched = false,
            name = document.getElementById('name').value,
            friendlyUrl = name.replace(/\s+/g, '-').toLowerCase(),
            country = $('#country').val(),
            type = $('#type').val(),
            style = $('#style').val();

        // do a quick check of the select fields and if these pass we can check the name of the beer
        // if there is an error with any of them, then we will not proceed
        // if(country === 'Country') {
        //     alert('Beer country is required');
        //     error = true;
        // }
        //
        // if(type === 'Type') {
        //     alert('Beer type is required');
        //     error = true;
        // }
        //
        // if(style === 'Style') {
        //     alert('Beer style is required');
        //     error = true;
        // }

        // if there are no errors with the input fields then we can cross reference the beer name
        if(error === false) {
            // now checking to see if the beer already exists
            for(var beer in this.state.beers) {
                matched = this.state.beers[beer].url === friendlyUrl ? true : false;
            }

            if(matched === false) {

                let beerObject = {
                    name: name,
                    alcoholContent: document.getElementById('alcoholContent').value,
                    description: document.getElementById('description').value,
                    city: document.getElementById('city').value,
                    country: country,
                    manufacturer: document.getElementById('brewer').value,
                    type: type,
                    style: style,
                    locations: this.state.createBeers.locations,
                    url: friendlyUrl,
                    lastEditedBy: this.state.user.uid
                }

                // add to beers list
                CreateBeer(beerObject);
            } else {
                alert('Beer already exists');
            }
        }
    }

    render () {

        console.log(this.state);

        var types = this.props.types,
            styles = this.props.styles,
            locations = this.props.locations,
            countries = this.props.countries,
            beers = this.state.beers || {},
            formFillCount = this.state.formFillCount;

        var typeSelectOptions = types.map((type, i) => {
            return <option key={i} value={type}>{type}</option>
        });

        var styleSelectOptions = styles.map((style, i) => {
            return <option key={i} value={style}>{style}</option>
        });

        var countrySelectOptions = countries.map((country, i) => {
            return <option key={i} value={country}>{country}</option>
        });

        console.log(this.state.description);

        return (
            <div>
                <section className="area buffer page-title">
                    <h1>Add a beer</h1>
                </section>
                <form className="add-item-form" onSubmit={this.createBeerObject}>
                    <section className="area buffer">
                        <h2>About the beer</h2>

                        {formFillCount === 0 ?
                        <div className="form-row zero">
                            <input id="name"
                                className="input"
                                placeholder="beer name here"
                                type="text" onChange={() => this.checkFormSection('zero')}
                                required />
                            <input id="alcoholContent"
                                className="input"
                                placeholder="Alcohol content"
                                type="number" onChange={() => this.checkFormSection('zero')}
                                step="any"
                                min="0"
                                required />
                                {/* if everything is filled out, we will show the next button */}
                            {this.state.showNextButton === true ?
                                <button type="button"
                                    onClick={() => this.checkBeerName()}>
                                    Next
                                </button>
                            :
                            null}
                        </div>
                        :
                        null}

                        {formFillCount === 1
                        ?
                        <div className="form-row one">
                            <textarea id="description"
                                className="input"
                                placeholder="Tell us about the beer"
                                type="text"
                                onChange={() => this.checkFormSection('one')}
                                required />
                            <button type="button"
                                onClick={() => this.previousButtonClick()}>
                                Previous
                            </button>
                            {this.state.showNextButton === true ?
                                <button type="button"
                                    onClick={() => this.nextButtonClick()}>
                                    Next
                                </button>
                            :
                            null}
                        </div>
                        :
                        null}

                        {formFillCount === 2
                        ?
                        <div className="form-row two">
                            <input id="brewer"
                                className="input"
                                placeholder="Brewer"
                                type="text"
                                onChange={() => this.checkFormSection('two')}
                                required />
                            <input id="city"
                                className="input"
                                placeholder="City of origin"
                                type="text"
                                onChange={() => this.checkFormSection('two')}
                                required />
                            <select id="country"
                                className="select"
                                onChange={() => this.checkFormSection('two')}>
                                <option>Country</option>
                                {countrySelectOptions}
                            </select>
                            <button type="button"
                                onClick={() => this.previousButtonClick()}>
                                Previous
                            </button>
                            {this.state.showNextButton === true ?
                                <button type="button"
                                    onClick={() => this.nextButtonClick()}>
                                    Next
                                </button>
                            :
                            null}
                        </div>
                        :
                        null}

                        {formFillCount === 3
                        ?
                        <div className="form-row three">
                            <input id="photo"
                                className="input"
                                placeholder="image url"
                                type="file"
                                onChange={() => this.checkFormSection('three')}
                                required />
                            <button type="button"
                                onClick={() => this.previousButtonClick()}>
                                Previous
                            </button>

                            {this.state.showNextButton === true ?
                                <button type="button"
                                    onClick={() => this.nextButtonClick()}>
                                    Next
                                </button>
                            :
                            null}
                        </div>
                        :
                        null}

                        {formFillCount === 4
                        ?
                        <div className="form-row four">
                            <select id="type"
                                className="select"
                                onChange={() => this.checkFormSection('four')}>
                                <option>Type</option>
                                {typeSelectOptions}
                            </select>
                            <select id="style"
                                className="select"
                                onChange={() => this.checkFormSection('four')}>
                                <option>Style</option>
                                {styleSelectOptions}
                            </select>
                            <button type="button"
                                onClick={() => this.previousButtonClick()}>
                                Previous
                            </button>

                            {this.state.showNextButton === true ?
                            <button type="button"
                                onClick={() => this.nextButtonClick()}>
                                Next
                            </button>
                            :
                            null}
                        </div>
                        :
                        null}

                    </section>
                    <section className="area buffer">
                        <h2>Who sells this beer?</h2>
                        {/* passing a prop flag so certain click events are displayed on the FilterLocationsComponent page */}
                        <FilterLocationsComponent creationPage={true} />
                        { Object.keys(beers).length > 0 ?
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
        createBeers: state.createBeers,
        user: state.user
    }
}

const CreateBeerContainer = connect(MapStateToProps)(CreateBeerContainerView);

export default CreateBeerContainer
