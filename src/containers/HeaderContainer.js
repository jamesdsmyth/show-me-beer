import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Store from '../reducers/CombinedReducers';
import * as actions from '../actions/actions';
import { SignUserIn, SignUserOut } from '../data/FirebaseRef';

import NotificationsComponent from '../components/NotificationsComponent';

class HeaderContainerView extends React.Component {

    // when the user clicks sign in
    static signIn(event) {
        event.preventDefault();

        SignUserIn();
    }

    // when the user clicks sign out
    static signOut(event) {
        event.preventDefault();

        SignUserOut();
    }

    render() {
        const userObject = this.props.user;

        return (
            <div>
                <header className="main-header">
                    <ul className="main-navigation">
                        <li>
                            <Link to="/beers" activeClassName="active">
                                <span>
                                    Beers
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/locations" activeClassName="active">
                                <span>
                                    Locations
                                </span>
                            </Link>
                        </li>
                        {(userObject.userName !== undefined) && (userObject.userName !== null) ?
                            <li>
                                <Link to="/saved-beers" activeClassName="active">
                                    <span>
                                        My Saved Beers
                                    </span>
                                </Link>
                            </li>
                        :
                        null }
                        {(userObject.userName !== undefined) && (userObject.userName !== null) ?
                            <li>
                                <Link to="/add-beer" activeClassName="active">
                                    <span>
                                        + Beer
                                    </span>
                                </Link>
                            </li>
                        :
                        null }
                        {(userObject.userName !== undefined) && (userObject.userName !== null) ?
                            <li>
                                <Link to="/add-location" activeClassName="active">
                                    <span>
                                        + Location
                                    </span>
                                </Link>
                            </li>
                        :
                        null }
                    </ul>

                    {/* checking if userObject.userName is populated or not */
                        (userObject.userName !== undefined) && (userObject.userName !== null) ?
                            <section className="sign-in-area">
                                <img
                                    className="user-image"
                                    src={userObject.photo}
                                    alt={userObject.userName}
                                />
                                <button
                                    type="submit"
                                    className="button"
                                    onClick={this.signOut}
                                >
                                        Sign out
                                </button>
                            </section>

                            :

                            <section className="sign-in-area">
                                <button
                                    type="submit"
                                    className="button primary"
                                    onClick={this.signIn}
                                >
                                        Sign in
                                </button>
                            </section>
                    }

                </header>
                <main className="main">
                    {this.props.children}
                </main>
                <NotificationsComponent />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

HeaderContainerView.propTypes = {
    children: PropTypes.arrayOf,
    user: PropTypes.shape
};

const HeaderContainer = connect(mapStateToProps)(HeaderContainerView);

export default HeaderContainer;
