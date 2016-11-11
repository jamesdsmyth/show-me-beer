import React from 'react';
import FilterBeersComponent from '../components/FilterBeersComponent.jsx';

class BeersContainer extends React.Component {

    render() {
        return (
            <div>
            {!this.props.children ?
                <div>
                    <section className="area buffer page-title">
                        <h1>Beers</h1>
                    </section>
                    <FilterBeersComponent />
                </div>
                : null}
                {this.props.children}
            </div>
        );
    }
}

export default BeersContainer;
