function validateConcertQueryParams(query){
    const errors = []
    if(!errors.artist){
        errors.push("Artist is required.")
    }
    if(!errors.city){
        errors.push("Location is required.")
    }
    return errors
}

function validateMerchandiseStallsQueryParams(query){
    const errors = []
    if(!errors.stallName){
        errors.push("StallName is required.")
    }
    return errors
}

function validateAfterPartyQueryParam(query){
    const errors = []
    if(!errors.city){
        errors.push("City is required.")
    }
    return errors
}


module.exports = {validateConcertQueryParams, validateMerchandiseStallsQueryParams, validateAfterPartyQueryParam}