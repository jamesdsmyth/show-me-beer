import React from 'react'
import { Link } from 'react-router'

class HomeContainer extends React.Component {
    render () {
        return (
            <div className="container">
                <section className="split">
                    <h2 className="intro-headings">
                        <Link to="/beers">
                            Beers
                        </Link>
                    </h2>
                </section>
                <section className="split">
                    <h2 className="intro-headings">
                        <Link to="/locations">
                            Locations
                        </Link>
                    </h2>
                </section>
            </div>
        )
    }
}

export default HomeContainer
