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

export function populateUser (data) {
    return {
        type: 'SIGN_IN_USER',
        userName: data.displayName,
        email: data.email,
        uid: data.uid
    }
}

export function signOutUser () {
    return {
        type: 'SIGN_OUT_USER'
    }
}
