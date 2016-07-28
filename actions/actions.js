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

export function populateUser (user, data) {

    console.log(user, data);
    return {
        type: 'SIGN_IN_USER',
        userName: user.displayName,
        email: user.email,
        uid: user.uid,
        beers: data.beers,
        locations: data.locations
    }
}

export function signOutUser () {
    return {
        type: 'SIGN_OUT_USER'
    }
}
