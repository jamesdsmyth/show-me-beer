import React from 'react'
import { connect } from 'react-redux'
import{ Link, IndexLink } from 'react-router'
import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'
import { SignUserIn, SignUserOut } from '../data/FirebaseRef.jsx'

class HeaderContainerView extends React.Component {

    signIn (event) {
        event.preventDefault();

        SignUserIn();
    }

    signOut (event) {
        event.preventDefault();

        SignUserOut();
    }

    render() {

        var userObject = this.props.user;
        var headingClasses = this.props.children === null ? 'main-header home' : 'main-header';

        console.log(userObject.userName)

        return (
            <div>
                <header className={headingClasses}>
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
                    </ul>

                    {/* checking if userObject.userName is populated or not */
                        (userObject.userName !== undefined) && (userObject.userName !== null) ?
                            <section className="sign-in-area">
                                <span>{userObject.userName}</span>
                                <button type="submit"
                                        className="button"
                                        onClick={this.signOut}>Sign out</button>
                            </section>

                            :

                            <section className="sign-in-area">
                                <button type="submit"
                                        className="button"
                                        onClick={this.signIn}>Sign in</button>
                            </section>
                    }

                </header>
                <main className="main">
                    {this.props.children}
                </main>
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
