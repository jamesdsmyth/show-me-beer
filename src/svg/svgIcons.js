import React from 'react';

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


export default Icon;
// module.exports.GLYPHS = GLYPHS;
