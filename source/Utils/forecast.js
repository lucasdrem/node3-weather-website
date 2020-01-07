const request = require('request')

const forecast = (lat, long, callback) =>{
    const url='https://api.darksky.net/forecast/34ed45e2b6c419398eac75fcc66b8777/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'
    request ({url:url, json:true}, (error, response) =>{
        if(error){
            callback('Unable to connect to the wather app!', undefined)
        }else if(response.body.error){
            callback('Unable to find location!', undefined)
        }else{
            const data = response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + 'ºC degrees out. There is a ' + 100*response.body.currently.precipProbability + '% chance of rain!'
            callback(undefined, data)
        }
    })
}

module.exports = forecast