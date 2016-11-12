const BeerReducer = (state = {}, action) => {
    switch (action.type) {
    case 'ALL_BEERS':
        return Object.assign({}, state, action.data);

    default:
        return state;
    }
};

export default BeerReducer;
