import React, { PropTypes } from 'react';
import FilterBeersComponent from '../components/FilterBeersComponent';

const BeersContainer = ({ children }) => (
    <div>
        {!children ?
            <div>
                <section className="area buffer page-title">
                    <h1>Beers</h1>
                </section>
                <FilterBeersComponent />
            </div>
            : null
        }
        {children}
    </div>
    );

BeersContainer.propTypes = {
    children: PropTypes.arrayOf
};

export default BeersContainer;
