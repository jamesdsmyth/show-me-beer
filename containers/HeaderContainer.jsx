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
                                {/*<img src="../images/glass.png" alt="image of a beer glass" />*/}
                                <span>
                                    Beers
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/locations" activeClassName="active">
                                {/*<img src="../images/pin.png" alt="image of a map marker pin" />*/}
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
