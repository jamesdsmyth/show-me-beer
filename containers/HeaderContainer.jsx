import React from 'react'
import{ Link, IndexLink } from 'react-router'

class HeaderContainer extends React.Component {
    render() {
        return (
            <div>
                <header className="main-header">
                    <ul className="main-navigation">
                        <li>
                            <Link to="/" activeClassName="active">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/beers" activeClassName="active">
                                Beers
                            </Link>
                        </li>
                        <li>
                            <Link to="/locations" activeClassName="active">
                                Locations
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
