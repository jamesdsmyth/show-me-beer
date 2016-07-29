const ShortLocationsReducer = (state = {}, action) => {

    switch (action.type) {
        case 'ALL_SHORT_LOCATIONS':

            var newState = action.data.shortLocations;

            return newState;
            break;

        default:
            return state;
    }
}

export default ShortLocationsReducer
