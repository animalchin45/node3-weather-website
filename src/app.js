const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Randy Savage'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Partly cloudy this evening, then becoming cloudy after midnight. A stray shower or thunderstorm is possible. Low near 75F. Winds N at 15 to 25 mph.',
        title: 'Help',
        name: 'Randy Savage'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Randy Savage'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: `Address required!`
        })
    } else {
        const local = req.query.address
        geocode(local, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.cat){
        return res.send({
            err: `Who dat cat?`
        })
    }
    console.log(req.query.cat)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Error 404: Help file not found.',
        name: 'Randy Savage'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Error 404: Page not found.',
        name: 'Randy Savage'
    })
})

app.listen(3000, () =>{
    console.log(`Server Running...`)
})