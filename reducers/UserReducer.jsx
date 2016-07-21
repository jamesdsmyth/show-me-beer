const UserReducer = (state = {}, action) => {

    console.log(state);
    var newState = Object.assign({}, state);

    console.log(action)

    switch (action.type) {

        case 'POPULATE_USER':
            // need to look at the grow me reducers for this.
            // newState = {
            //     ...state,
            //     name: action.data.name
            // }

            console.log(newState);

            return newState;
            break;

            default:
                return state;
    }
}

export default UserReducer
