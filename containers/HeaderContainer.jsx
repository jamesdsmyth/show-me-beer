import React from 'react'
import{ Link, IndexLink } from 'react-router'

class HeaderContainer extends React.Component {
    render() {
        return (
            <div>
                <header className="main-header">
                    <ul className="main-navigation">
                        <li>
                            <Link to="/beers" activeClassName="active">
                                <img src="../images/glass.png" alt="image of a beer glass" />
                                <span className="hidden">
                                    Beers
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/locations" activeClassName="active">
                                <img src="../images/pin.png" alt="image of a map marker pin" />
                                <span className="hidden">
                                    Locations
                                </span>
                            </Link>
                        </li>
                    </ul>
                </header>

                <main className="main">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default HeaderContainer
