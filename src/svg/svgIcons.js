import React, { PropTypes } from 'react';

// exporting the GLYPHS to be referenced in the components
export const GLYPHS = {
    PIN: require('../images/pin.svg')
};

// icon.jsx
const Icon = ({ glyph, width = 16, height = 16, className = 'icon' }) => {
    return (
        <svg className={className} width={width} height={height}>
            <use xlinkHref={glyph} />
        </svg>
    );
};

Icon.propTypes = {
    glyph: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};


export default Icon;
// module.exports.GLYPHS = GLYPHS;
