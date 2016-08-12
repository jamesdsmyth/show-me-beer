const BeerReducer = (state = {}, action) => {

    console.log('beers', action)

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
