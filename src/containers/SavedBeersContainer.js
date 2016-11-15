import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Icon from '../svg/svgIcons';

const SavedBeersContainerView = ({ beers, user }) => {
    const userBeers = user.beers.data;

    let toReturn = null;
    let count = 0;

    // looping through each beer and if it is listed within the userBeers then it is displayed
    const beerList = Object.keys(beers).map((beer, i) => {
        const beerItem = beers[beer];

        for (const savedBeer in userBeers) {
            if (userBeers[savedBeer].uid === beer) {
                count = i;
                toReturn =
                    <li key={i}>
                        <Link to={`/beers/${beerItem.url}`}>
                            <img src={beerItem.photo} alt={beerItem.name} className="beer-image" />
                        </Link>
                        <div className="beer-details">
                            <h3>
                                <Link
                                    to={`/beers/${beerItem.url}`}
                                    className="beer-title"
                                >
                                    {beerItem.name}
                                </Link>
                            </h3>
                            <span className="italic">{beerItem.type}, {beerItem.style} and brewed in {beerItem.country}</span>
                        </div>
                    </li>;
            }
        }

        return toReturn;
    });

    return (
        <div>
            <section className="area buffer page-title">
                <h1>My Saved Beers</h1>
                <Icon glyph={GLYPHS.PIN} />
            </section>
            <section className="area buffer beer">
                {count > 0 ?
                    <ul className="beers-list">
                        {beerList}
                    </ul>
                :
                <p>You do not have any saved beers, click on the stars next to a beer to add them to this list</p> }
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        beers: state.beers
    };
};

SavedBeersContainerView.propTypes = {
    beers: PropTypes.arrayOf.isRequired,
    user: PropTypes.shape.isRequired
};

const SavedBeersContainer = connect(mapStateToProps)(SavedBeersContainerView);

export default SavedBeersContainer;
