const request = require('request')
const geocode = (address, callback) =>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHVjYWRyZW0iLCJhIjoiY2s0eXR6c3J3MDRkcjNtbmU4MDZlcjM2ciJ9.S84a4fMTzbU0uJ5I7FTG4A&limit=1'
    request ({url:url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(response.body.features.length ===0){
            callback('Unable to find you location, prease try again!',undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })

        }
    })
}

module.exports = geocode