import React from 'react'
import{ Link, IndexLink } from 'react-router'

class HeaderContainer extends React.Component {
    render() {

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
                </header>

                <main className="main">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default HeaderContainer
