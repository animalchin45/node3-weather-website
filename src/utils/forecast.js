const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/4a6ec09bcabde9bd8c20e478d318b468/${lat},${long}`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(`No weather service available`, undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} The temp is ${body.currently.temperature} and there is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast