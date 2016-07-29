const BeerReducer = (state = {}, action) => {
    
    switch (action.type) {
        case 'ALL_BEERS':
            var newState = Object.assign({}, state, action.data.beers);

            return newState;
            break;

        default:
            return state;
    }
}

export default BeerReducer
