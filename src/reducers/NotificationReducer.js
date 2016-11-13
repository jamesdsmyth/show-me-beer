const NotificationReducer = (state = {}, action) => {

    let newState = null;

    switch(action.type) {
        case 'SHOW_ADDED_NOTIFICATION':
            newState = Object.assign({}, state, {
                beerOrLocation: action.beerOrLocation,
                name: action.name,
                added: true,
                removed: false
            });

            return newState;

        case 'SHOW_REMOVED_NOTIFICATION':
            newState = Object.assign({}, state, {
                beerOrLocation: action.beerOrLocation,
                name: action.name,
                added: false,
                removed: true
            });

            return newState;
            break;

        default:
            return state;
    }
}

export default NotificationReducer
