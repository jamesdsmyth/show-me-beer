export function populateLocations (data) {
    return {
        type: 'ALL_LOCATIONS',
        data: data
    }
}

export function populateShortLocations (data) {
    return {
        type: 'ALL_SHORT_LOCATIONS',
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

export function saveBeerToUser (beerObjects) {

    console.log(beerObjects);

    return {
        type: 'SAVE_BEER',
        beers : {
            data: beerObjects
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
export function addLocationToBeer (location) {
    return {
        type: 'ADD_LOCATION_TO_BEER',
        name: location.name,
        coords: location.coords,
        url: location.url
    }
}

// adding location from a beer when creating a beer
export function removeLocationToBeer (location) {
    return {
        type: 'REMOVE_LOCATION_FROM_BEER',
        name: location.name,
        coords: location.coords
    }
}
