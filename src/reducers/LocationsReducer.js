const LocationsReducer = (state = {}, action) => {
    switch (action.type) {
    case 'ALL_LOCATIONS':
        return action.data;
    default:
        return state;
    }
};

export default LocationsReducer;
