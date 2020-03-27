const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
//console.log(__filename)

const app=express()


//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Heather',
        text:'Use this site to get your weather!'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'HeatherA'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Ironman',
        name:'Dushbag'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must enter address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longtitude,location }={})=>{
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longtitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                address:req.query.address,
                location,
                forecastdata
            })
        })
    })
})




app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('page404',{
        title:'help404',
        name:'help',
        errorinfo:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('page404',{
        title:'404',
        name:'404',
        errorinfo:'page not found'
    })
})


app.listen(3000,()=>{
    console.log('the server is on port 3000')
})
