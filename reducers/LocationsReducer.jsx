const LocationsReducer = (state = {}, action) => {

    switch (action.type) {
        case 'ALL_LOCATIONS':

            var newState = action.data;

            return newState;
            break;

        default:
            return state;
    }
}

export default LocationsReducer
