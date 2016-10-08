const BeerReducer = (state = {}, action) => {

    switch (action.type) {
        case 'ALL_BEERS':
            let newState = Object.assign({}, state, action.data);

            return newState;
            break;

        default:
            return state;
    }
}

export default BeerReducer
