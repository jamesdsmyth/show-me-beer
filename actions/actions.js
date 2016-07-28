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
// main alterations here is saving the Firebase user beers into an array of the beer name.
// same goes to the location name. This then is cross referenced with the beer title and listed as added!
// if the user has already saved it.
export function populateUser (user, data) {

    let beersArray = [];
    let locationsArray = [];

    for(var beer in data.beers) {
        beersArray.push(data.beers[beer].beer);
    }

    return {
        type: 'SIGN_IN_USER',
        userName: user.displayName,
        email: user.email,
        uid: user.uid,
        beers: beersArray,
        locations: data.locations
    }
}

export function signOutUser () {
    return {
        type: 'SIGN_OUT_USER'
    }
}

export function saveBeer (beerObjects) {

    var beerArray = [];

    for (var b in beerObjects) {
        beerArray.push(beerObjects[b].beer);
    }

    return {
        type: 'SAVE_BEER',
        beers : beerArray
    }
}
