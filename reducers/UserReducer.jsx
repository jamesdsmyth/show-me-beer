// setting state up initially as an object because it is empty until populated.
const UserReducer = (state = {}, action) => {

    var newState = Object.assign({}, state);

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
