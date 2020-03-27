const request = require('request')

const forecast =(lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/96f1c61a8808aa1cd7b70fc2c64eef9c/'+lat+','+long+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('cannot connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+' % chance of rain.')
        }
    })
}

module.exports = forecast