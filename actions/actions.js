export function populateLocations (data) {
    return {
        type: 'ALL_LOCATIONS',
        data: data
    }
}

export function populateBeers (data) {
    return {
        type: 'ALL_BEERS',
        data: data
    }
}

// populating the user state.
export function populateUser (user, data) {

    return {
        type: 'SIGN_IN_USER',
        userName: user.displayName,
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
        beers: {
            data: data.beers,
        },
        locations: {
            data: data.locations
        }
    }
}

export function signOutUser () {
    return {
        type: 'SIGN_OUT_USER'
    }
}

export function saveBeerToUser (beerUID) {

    return {
        type: 'SAVE_BEER',
        beers : {
            data: beerUID
        }
    }
}

export function showAddNotification (item, type) {
    return {
        type: 'SHOW_ADDED_NOTIFICATION',
        beerOrLocation: type,
        name: item
    }
}

export function showRemoveNotification (item, type) {
    return {
        type: 'SHOW_REMOVED_NOTIFICATION',
        beerOrLocation: type,
        name: item
    }
}

// adding location from a beer when creating a beer
export function addLocationToBeer (key) {
    return {
        type: 'ADD_LOCATION_TO_BEER',
        uid: key
    }
}

// adding location from a beer when creating a beer
export function removeLocationFromBeer (key) {
    return {
        type: 'REMOVE_LOCATION_FROM_BEER',
        uid: key
    }
}

// adding beer from a location when creating a location
export function addBeerToLocation (key) {
    return {
        type: 'ADD_BEER_TO_LOCATION',
        uid: key
    }
}

// removing beer from a location when creating a location
export function removeLocationFromBeer (key) {
    return {
        type: 'REMOVE_BEER_FROM_LOCATION',
        uid: key
    }
}
