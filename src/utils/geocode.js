const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5pbWFsY2hpbiIsImEiOiJjanp0NWNieDEwMXN1M21sNXFjZGdteHlxIn0.iPVY4m0sScJZoMupkzv_yw&limit=1`

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback(`Location services not available.`, undefined)
        } else if (!body.features[0]) {
            callback(`Invalid location.`, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode