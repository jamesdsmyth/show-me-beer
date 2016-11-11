export function populateLocations (data) {
    return {
        type: 'ALL_LOCATIONS',
        data: data
    };
}

export function populateBeers (data) {
    return {
        type: 'ALL_BEERS',
        data: data
    };
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
            data: data.beers
        },
        locations: {
            data: data.locations
        }
    };
}

export function signOutUser () {
    return {
        type: 'SIGN_OUT_USER'
    };
}

export function saveBeerToUser (beerUID) {

    return {
        type: 'SAVE_BEER',
        beers : {
            data: beerUID
        }
    };
}

export function showAddNotification (item, type) {
    return {
        type: 'SHOW_ADDED_NOTIFICATION',
        beerOrLocation: type,
        name: item
    };
}

export function showRemoveNotification (item, type) {
    return {
        type: 'SHOW_REMOVED_NOTIFICATION',
        beerOrLocation: type,
        name: item
    };
}

// adding location from a beer when creating a beer
export function addLocationToBeer (key) {
    return {
        type: 'ADD_LOCATION_TO_BEER',
        uid: key
    };
}

// adding location from a beer when creating a beer
export function removeLocationFromBeer (key) {
    return {
        type: 'REMOVE_LOCATION_FROM_BEER',
        uid: key
    };
}

// adding beer from a location when creating a location
export function addBeerToLocation (key) {
    return {
        type: 'ADD_BEER_TO_LOCATION',
        uid: key
    };
}

// removing beer from a location when creating a location
export function removeBeerFromLocation (key) {
    return {
        type: 'REMOVE_BEER_FROM_LOCATION',
        uid: key
    };
}

// this removes all locations from the beer array for when the form needs to be completely reset
export function clearLocationsFromBeer () {
    return {
        type: 'CLEAR_LOCATIONS_FROM_BEER'
    };
}

// after creating a beer, we need to display the form again so the user can create another beer
export function initialiseBeerCreation () {
    return {
        type: 'INITIALISE_BEER_CREATION'
    };
}

// when the beer has been submitted we need to show a screen that tells the user something is happening
export function beerSubmitted () {
    return {
        type: 'BEER_SUBMITTED'
    };
}

// on creation of the beer, we need to let the creation page know to display the success message
export function creationOfBeerSuccess () {
    return {
        type: 'BEER_CREATED_SUCCESS'
    };
}

// on failure of creation of the beer, we need to let the creation page know to display the failure message
export function creationOfBeerFailure () {
    return {
        type: 'BEER_CREATED_FAILURE'
    };
}

// this removes all locations from the beer array for when the form needs to be completely reset
export function clearBeersFromLocations () {
    return {
        type: 'CLEAR_BEERS_FROM_LOCATIONS'
    };
}

// after creating a location, we need to display the form again so the user can create another beer
export function initialiseLocationCreation () {
    return {
        type: 'INITIALISE_LOCATION_CREATION'
    };
}

// when the location has been submitted we need to show a screen that tells the user something is happening
export function locationSubmitted () {
    return {
        type: 'LOCATION_SUBMITTED'
    };
}

// on creation of the location, we need to let the creation page know to display the success message
export function creationOfLocationSuccess () {
    return {
        type: 'LOCATION_CREATED_SUCCESS'
    };
}

// on failure of creation of the location, we need to let the creation page know to display the failure message
export function creationOfLocationFailure () {
    return {
        type: 'LOCATION_CREATED_FAILURE'
    };
}
