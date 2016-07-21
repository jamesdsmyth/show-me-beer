import React from 'react'
import { Link } from 'react-router'

class HomeContainer extends React.Component {

    createUser (event) {

        console.log(document.getElementById('email').value);
        console.log(document.getElementById('password').value);


        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value
        event.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error);
            // ...
        });

        setTimeout(() => {
            FireBaseCurrentUser();
        }, 500);
    }

    render () {
        return (
            <div className="container">
                {/*<section className="area sign-in">
                    <form onSubmit={this.createUser}>
                        <input type="email" id="email" placeholder="your email address" required />
                        <input type="password" id="password" placeholder="password" minLength="6" required />
                        <button type="submit">Create User</button>
                    </form>
                </section>*/}
            </div>
        )
    }
}

export default HomeContainer
