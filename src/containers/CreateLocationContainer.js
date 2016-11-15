import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Store from '../reducers/CombinedReducers';
import FilterBeersComponent from '../components/FilterBeersComponent';
import { CreateLocation } from '../data/FirebaseRef';
import { initialiseLocationCreation } from '../actions/actions';

class CreateBeerContainerView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formFillCount: 0,
            showNextButton: false,
            visibleSection: 'form',
            borough: 'Borough',
            country: 'Country'
        };

        // binding this to createBeer() function
        this.createLocationObject = this.createLocationObject.bind(this);
    }

    // when the beers finally are loaded from firebase, we use this to set the state
    componentWillReceiveProps(props) {
        this.setState({
            locations: props.locations,
            createLocations: props.createLocations,
            visibleSection: props.createLocations.visibleSection,
            user: props.user
        });
    }

    // when we navigate through the steps, we want to populate data that the user has already filled out
    setFieldData() {
        setTimeout(() => {
            $('#name').val(this.state.name);
            $('#street').val(this.state.street);
            $('#borough').val(this.state.borough);
            $('#postcode').val(this.state.postcode);
            $('#city').val(this.state.city);
            $('#country').val(this.state.country);
            $('#description').val(this.state.description);
            $('#phone').val(this.state.phone);
            $('#latitude').val(this.state.latitude);
            $('#longitude').val(this.state.longitude);
            $('#photo').val(this.state.photo);
            $('#phone').val(this.state.phone);
        }, 250);
    }

    // clicking the next button will change the question section.
    // this is done by increasing the formFillCount which matches to the section that relates to that number
    nextButtonClick(section) {
        let setObject = {};

        switch (section) {

        case 'zero':

            setObject = {
                name: $('#name').val(),
                street: $('#street').val(),
                borough: $('#borough').val(),
                postcode: $('#postcode').val(),
                city: $('#city').val(),
                country: $('#country').val()
            };

            break;

        case 'one':

            setObject = {
                phone: $('#phone').val()
            };

            break;

        case 'two':

            setObject = {
                longitude: $('#longitude').val(),
                latitude: $('#latitude').val()
            };

            break;

        case 'three':

            setObject = {
                description: $('#description').val()
            };

            break;

        case 'four':

            setObject = {
                photo: document.getElementById('photo').files[0]
            };

            break;

        default:
            console.log('default');
        }

        setObject.formFillCount = this.state.formFillCount + 1;
        setObject.showNextButton = false;

        this.setState(setObject);
        this.setFieldData();
    }

    previousButtonClick() {
        this.setState({
            formFillCount: this.state.formFillCount - 1,
            showNextButton: true
        });

        this.setFieldData();
    }

    // checks the section to see whether it has been filled out correctly
    checkFormSection(sectionNumber) {
        let completed = 0;
        let inputCount = 0;
        const section = $(`.form-row. ${sectionNumber}`);

        section.find('.input').each(() => {
            inputCount++;
            if ($(this).val() !== ('') && ($(this).val() !== 'Country') && ($(this).val() !== 'Borough')) {
                completed++;
            }
        });

        // if the number of completed fields === the number of inputs, then we can show the next button
        if (completed === inputCount) {
            this.setState({
                showNextButton: true
            });
        } else {
            this.setState({
                showNextButton: false
            });
        }
    }

    // clears the form so no input is populated
    clearFormData() {
        this.setState({
            name: null,
            street: null,
            borough: null,
            postcode: null,
            city: null,
            country: null,
            description: null,
            phone: null,
            style: null,
            longitude: null,
            latitude: null,
            photo: null,
            formFillCount: 0,
            showNextButton: false
        });
    }

    // removes all selected locations from the beer so a new beer can be created
    clearBeers() {
        Store.dispatch(clearBeersFromLocation());
    }

    // navigates the user to the form section again ready to create a new beer
    viewForm() {
        Store.dispatch(initialiseLocationCreation());
    }

    // creating the object to pass to firebase to add the beer to the list
    createLocationObject(event) {
        event.preventDefault();

        const locationObject = {
            name: this.state.name,
            street: this.state.street,
            borough: this.state.borough,
            postcode: this.state.postcode,
            city: this.state.city,
            country: this.state.country,
            description: this.state.description,
            phone: this.state.phone,
            url: this.state.name.replace(/\s+/g, '-').toLowerCase(),
            coords: {
                latitude: this.state.latitude,
                longitude: this.state.longitude
            },
            photo: this.state.photo,
            beers: this.state.createLocations.beers,
            lastEditedBy: this.state.user.uid
        };

        console.log(locationObject);
        // add to locations list
        CreateLocation(locationObject);
    }

    render() {
        const boroughs = this.props.boroughs;
        const countries = this.props.countries;
        const sectionToDisplay = this.state.visibleSection;
        const formFillCount = this.state.formFillCount;

        let toDisplay = null;

        console.log(sectionToDisplay);

        const boroughSelectOptions = boroughs.map((type, i) => <option key={i} value={type}>{type}</option>);

        const countrySelectOptions = countries.map((country, i) => <option key={i} value={country}>{country}</option>);

        switch (sectionToDisplay) {
        default:
            toDisplay =
                <form className="add-item-form" onSubmit={this.createLocationObject}>
                    {formFillCount < 6 ?
                        <section className="area buffer">
                            <h2>Tell us about the Location</h2>
                            <p>Here you can add a location and tell us what beers are currently being sold there.</p>

                            {/* this is section one and is shown only for the first 4 sections */}
                            {formFillCount === 0 ?
                                <div className="form-row zero">
                                    <input
                                        id="name"
                                        className="input"
                                        placeholder="Name of location"
                                        onChange={() => this.checkFormSection('zero')}
                                        type="text"
                                    />
                                    <input
                                        id="street"
                                        className="input"
                                        placeholder="Street name"
                                        type="text"
                                    />
                                    <input
                                        id="postcode"
                                        className="input"
                                        placeholder="Postcode"
                                        onChange={() => this.checkFormSection('zero')}
                                        type="text"
                                    />
                                    <input
                                        id="city"
                                        className="input"
                                        placeholder="City of origin"
                                        onChange={() => this.checkFormSection('zero')}
                                        type="text"
                                    />
                                    <select
                                        id="borough"
                                        className="select input"
                                        onChange={() => this.checkFormSection('zero')}
                                    >
                                        <option>Borough</option>
                                        {boroughSelectOptions}
                                    </select>
                                    <select
                                        id="country"
                                        className="select input"
                                        onChange={() => this.checkFormSection('zero')}
                                    >
                                        <option>Country</option>
                                        {countrySelectOptions}
                                    </select>
                                    <div className="buttons">
                                        {this.state.showNextButton === true ?
                                            <button
                                                type="button"
                                                className="button secondary"
                                                onClick={() => this.nextButtonClick('zero')}
                                            >
                                                Next
                                            </button>
                                        :
                                        null}
                                    </div>
                                </div>
                            :
                                null
                            }

                            {formFillCount === 1 ?
                                <div className="form-row one">
                                    <input
                                        id="phone"
                                        className="input"
                                        placeholder="Phone number"
                                        onChange={() => this.checkFormSection('one')}
                                        type="number"
                                    />
                                    <div className="buttons">
                                        <button
                                            type="button"
                                            className="button secondary"
                                            onClick={() => this.previousButtonClick()}
                                        >
                                            Previous
                                        </button>
                                        {this.state.showNextButton === true ?
                                            <button
                                                type="button"
                                                className="button secondary"
                                                onClick={() => this.nextButtonClick('one')}
                                            >
                                                Next
                                            </button>
                                        :
                                        null}
                                    </div>
                                </div>
                            :
                                null
                            }

                            {formFillCount === 2 ?
                                <div className="form-row two">
                                    <input
                                        id="latitude"
                                        className="input"
                                        placeholder="Location's latitude"
                                        onChange={() => this.checkFormSection('two')}
                                        type="text"
                                    />
                                    <input
                                        id="longitude"
                                        className="input"
                                        placeholder="Location's longitude"
                                        onChange={() => this.checkFormSection('two')}
                                        type="text"
                                    />
                                    <div className="buttons">
                                        <button
                                            type="button"
                                            className="button secondary"
                                            onClick={() => this.previousButtonClick()}
                                        >
                                            Previous
                                        </button>
                                        {this.state.showNextButton === true ?
                                            <button
                                                type="button"
                                                className="button secondary"
                                                onClick={() => this.nextButtonClick('two')}
                                            >
                                                Next
                                            </button>
                                        :
                                        null}
                                    </div>
                                </div>
                            :
                                null
                            }

                            {formFillCount === 3 ?
                                <div className="form-row three">
                                    <textarea
                                        id="description"
                                        className="input textarea"
                                        placeholder="Tell us about the location"
                                        onChange={() => this.checkFormSection('three')}
                                        type="text"
                                    />
                                    <div className="buttons">
                                        <button
                                            type="button"
                                            className="button secondary"
                                            onClick={() => this.previousButtonClick()}
                                        >
                                            Previous
                                        </button>
                                        {this.state.showNextButton === true ?
                                            <button
                                                type="button"
                                                className="button secondary"
                                                onClick={() => this.nextButtonClick('three')}
                                            >
                                                Next
                                            </button>
                                        :
                                        null}
                                    </div>
                                </div>
                            :
                                null
                            }

                            {formFillCount === 4 ?
                                <div className="form-row four">
                                    <input
                                        id="photo"
                                        className="input"
                                        placeholder="image url"
                                        onChange={() => this.checkFormSection('four')}
                                        type="file"
                                    />
                                    <div className="buttons">
                                        <button
                                            type="button"
                                            className="button secondary"
                                            onClick={() => this.previousButtonClick()}
                                        >
                                            Previous
                                        </button>
                                        {this.state.showNextButton === true ?
                                            <button
                                                type="button"
                                                className="button secondary"
                                                onClick={() => this.nextButtonClick('four')}
                                            >
                                                Next
                                            </button>
                                        :
                                        null}
                                    </div>
                                </div>
                            :
                                null
                            }
                        </section>
                    :
                    null
                    }

                    {/* this is section one and is shown only for the first 4 sections */}
                    {formFillCount === 5 ?
                        <section className="area buffer">
                            <h2>What beers do they sell?</h2>
                            {/* passing a prop flag so certain click events are displayed on the FilterLocationsComponent page */}
                            <FilterBeersComponent creationPage />
                            <div className="buttons">
                                <button
                                    type="button"
                                    className="button secondary"
                                    onClick={() => this.previousButtonClick()}
                                >
                                    Previous
                                </button>
                                <button
                                    type="submit"
                                    className="button primary"
                                >
                                    Create location!
                                </button>
                            </div>
                        </section>
                    :
                    null
                    }
                </form>;

            break;

        case 'submitted':
            toDisplay =
                <section className="area buffer">
                    <p>Your location is being created...</p>
                </section>;
            break;

        case 'success':
            toDisplay =
                <section className="area buffer">
                    <p>You have just added a location!</p>
                    <div className="buttons">
                        <button
                            type="button"
                            className="button secondary"
                            onClick={() => (this.clearFormData())(this.clearBeers())}
                        >
                            Create another location
                        </button>
                    </div>
                </section>;
            break;

        case 'failure':
            toDisplay =
                <section className="area buffer">
                    <p>We could not create your location at this time</p>
                    <div className="buttons">
                        <button
                            type="button"
                            className="button secondary"
                            onClick={() => this.viewForm()}
                        >
                            Try again
                        </button>
                    </div>
                </section>;
            break;

        }

        return (
            <div>
                <section className="area buffer page-title">
                    <h1>Add a Location</h1>
                </section>
                {toDisplay}
            </div>
        );
    }
}

const MapStateToProps = (state) => {
    return {
        beers: state.beers,
        types: state.beerTypes,
        locations: state.locations,
        countries: state.countries,
        boroughs: state.boroughs,
        createLocations: state.createLocations,
        user: state.user
    };
};

CreateBeerContainerView.propTypes = {
    boroughs: PropTypes.arrayOf.isRequired,
    countries: PropTypes.arrayOf.isRequired
};

const CreateBeerContainer = connect(MapStateToProps)(CreateBeerContainerView);

export default CreateBeerContainer;
