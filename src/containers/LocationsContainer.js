import React, { PropTypes } from 'react';
import FilterLocationsComponent from '../components/FilterLocationsComponent';

const LocationsContainer = ({ children }) => (
    <div>
        {!children ?
            <div>
                <section className="area buffer page-title">
                    <h1>Locations</h1>
                </section>
                <FilterLocationsComponent />
            </div>
        : null}
        {children}
    </div>
);

LocationsContainer.propTypes = {
    children: PropTypes.arrayOf
};

export default LocationsContainer;
