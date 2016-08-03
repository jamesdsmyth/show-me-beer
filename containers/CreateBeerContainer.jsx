import React from 'react'
import { connect } from 'react-redux'

class CreateBeerContainerView extends React.Component {

    render () {

        var types = this.props.types,
            styles = this.props.styles,
            countries = this.props.countries

        var typeSelectOptions = types.map((type, i) => {
            return <option key={i}>{type}</option>
        });

        var styleSelectOptions = styles.map((style, i) => {
            return <option key={i}>{style}</option>
        });

        var countrySelectOptions = countries.map((country, i) => {
            return <option key={i}>{country}</option>
        });

        return (
            <div>
                <section className="area buffer page-title">
                    <h1>Beers</h1>
                </section>
                <section className="area">
                    <form className="add-beer-form">
                        <input id="name" className="input" placeholder="Name of beer" type="text" required />
                        <input id="alcoholContent" className="input" placeholder="Alcohol content" type="text" required />
                        <input id="city" className="input" placeholder="City of origin" type="text" required />
                        <textarea id="description" className="input" placeholder="Tell us about the beer" type="text" required />
                        <input id="manufacturer" className="input" placeholder="Brewer" type="text" required />
                        <input id="photo" className="input" placeholder="photograph url" type="text" required />
                        <select>
                            <option>Type</option>
                            {typeSelectOptions}
                        </select>
                        <select>
                            <option>Style</option>
                            {styleSelectOptions}
                        </select>
                        <select>
                            <option>Country</option>
                            {countrySelectOptions}
                        </select>
                        <button type="submit" className="button">Add!</button>
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
        countries: state.countries,
        user: state.user
    }
}

const CreateBeerContainer = connect(MapStateToProps)(CreateBeerContainerView);

export default CreateBeerContainer
