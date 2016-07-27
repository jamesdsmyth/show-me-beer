import React from 'react'
import { connect } from 'react-redux'
import{ Link, IndexLink } from 'react-router'
import Store from '../reducers/CombinedReducers.jsx'
import * as actions from '../actions/actions.js'

class HeaderContainerView extends React.Component {

    signIn (event) {
        event.preventDefault();

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
    }

    signOut (event) {
        event.preventDefault();

        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          Store.dispatch(actions.signOutUser());
        }, function(error) {
          alert('an error occurred when signing out');
        });
    }

    render() {

        var userObject = this.props.user;
        var headingClasses = this.props.children === null ? 'main-header home' : 'main-header';

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
                        userObject.userName !== null ?
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
