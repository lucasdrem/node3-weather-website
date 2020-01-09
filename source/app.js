const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require ('request')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../source/templates/views')
const partialsPath = path.join(__dirname, '../source/templates/partials')

// Setup handle bars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Lucas Grober'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Lucas Grober'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help page',
        name: 'Lucas Grober'
    })
})

app.get('/weatherapp', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term!'
        })
    }
    const command = req.query.address
    
    geocode(command, (error1, { latitude, longitude, location} = {}) =>{
        if(error1){
            return res.send( { error1 })
        }

    forecast(longitude, latitude, (error2, data2) => {
        if(error2){
            return res.send({ error2 })
        }

    res.send({
        forecast: data2,
        location: location,
        address: req.query.address
    })
         
})       
})
})

app.get('/products', (req, res) =>{
    if (!req.query.search){
       return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404page-help', {
        title: 'About me',
        name: 'Lucas Grober'
    })
})

app.get('*', (req, res) =>{
    res.render('404page', {
        title: 'About me',
        name: 'Lucas Grober',
        errormessage: 'My 404 page!'
    })
})


app.listen(port, () =>{
 console.log('Server is up on port ' + port)
})