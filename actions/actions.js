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

export function saveBeer (beerObjects) {

    console.log(beerObjects);

    return {
        type: 'SAVE_BEER',
        beers : {
            data: beerObjects
        }
    }
}
