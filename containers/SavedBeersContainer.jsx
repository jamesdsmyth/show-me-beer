import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class SavedBeersContainerView extends React.Component {

    render () {

        var beers = this.props.beers,
            userBeers = this.props.user.beers.data

            // looping through each beer and if it is listed within the userBeers then it is displayed
            var beerList = Object.keys(beers).map((beer, i) => {
                let beerItem = beers[beer];

                for (var savedBeer in userBeers) {
                    if(userBeers[savedBeer].beer === beerItem.name) {
                        return <li key={i}>
                                    <Link to={"/beers/" + beer}>
                                        <img src={beerItem.photo} alt={beerItem.name} className="beer-image" />
                                    </Link>
                                    <div className="beer-details">
                                        <h3>
                                            <Link to={"/beers/" + beer}
                                                  className="beer-title">
                                                {beerItem.name}
                                            </Link>
                                        </h3>
                                        <span className="italic">{beerItem.type}, {beerItem.style} and brewed in {beerItem.country}</span>
                                    </div>
                                </li>
                    }
                }
            });

        return (
            <div>
                <section className="area buffer page-title">
                    <h1>Your saved beers</h1>
                </section>
                <section className="area buffer beer">
                    <ul className="beers-list">
                        {beerList}
                    </ul>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        beers: state.beers,
    }
}

const SavedBeersContainer = connect(mapStateToProps)(SavedBeersContainerView)

export default SavedBeersContainer
