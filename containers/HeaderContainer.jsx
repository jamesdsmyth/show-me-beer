import React from 'react'
import { connect } from 'react-redux'
import{ Link, IndexLink } from 'react-router'
import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'
import { SignUserIn, SignUserOut } from '../data/FirebaseRef.jsx'

import NotificationsComponent from '../components/NotificationsComponent.jsx'

class HeaderContainerView extends React.Component {

    // when the user clicks sign in
    signIn (event) {
        event.preventDefault();

        SignUserIn();
    }

    // when the user clicks sign out
    signOut (event) {
        event.preventDefault();

        SignUserOut();
    }

    render() {

        var userObject = this.props.user;

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
                                        Add a Beer
                                    </span>
                                </Link>
                            </li>
                        :
                        null }
                    </ul>

                    {/* checking if userObject.userName is populated or not */
                        (userObject.userName !== undefined) && (userObject.userName !== null) ?
                            <section className="sign-in-area">
                                <img className="user-image"
                                     src={userObject.photo}
                                     alt={userObject.userName} />
                                <button type="submit"
                                        className="button"
                                        onClick={this.signOut}>Sign out</button>
                            </section>

                            :

                            <section className="sign-in-area">
                                <button type="submit"
                                        className="button primary"
                                        onClick={this.signIn}>Sign in</button>
                            </section>
                    }

                </header>
                <main className="main">
                    {this.props.children}
                </main>
                <NotificationsComponent />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const HeaderContainer = connect(mapStateToProps)(HeaderContainerView);

export default HeaderContainer
