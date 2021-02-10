
require('dotenv').config()
var path = require('path')
const fetch = require("node-fetch");
//// cors
var cors = require('cors')
///corse
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv');
const axios = require('axios')
//Body-parser
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('dist'))

console.log(__dirname)


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'..\\..\\dist\\index.html'))

})

//server port
app.listen(8085, function () {
    console.log('index server file Example app listening on port 8085!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//api geo 

app.get('/fetchLocation', (req, res) => {
  console.log(req.query.city)
    const url = `http://api.geonames.org/searchJSON?maxRows=10&operator=OR&q=${req.query.city}&name=${req.query.city}&username=meraloy720`;
    axios.get(url).then(resp => {console.log(resp.data.geonames[0]),
      res.end(JSON.stringify((resp.data.geonames[0])));
    })
    .catch(err => {
      res.end(JSON.stringify({err}));
    })
  })
/// weather API
  app.get('/fetchForecast', (req, res) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.long}&key=${process.env.WEATHERBIT}`;
    axios.get(url).then(resp => { console.log(resp)
      res.end(JSON.stringify(resp.data));
    })
    .catch(err => {
      res.end(JSON.stringify({err}));
    })
  })

  /// photo

  app.get('/fetchImg', (req, res) => {
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY}&q=${req.query.q}&image_type=photo`;
    axios.get(url).then(resp => {
      res.end(JSON.stringify(resp.data.hits[0]));
    })
    .catch(err => {
      res.end(JSON.stringify({err}));
    })
  })






/// meaning api 

// const URI = 'https://api.meaningcloud.com/sentiment-2.1?';

// const encodedURI = encodeURI(URI)
// const apiKey = process.env.API_KEY;
// console.log(`Your API Key is ${apiKey}`);
// let userInput = [] 

// /// meaning api  function 
// app.post('/api', async function(req, res) {
//     userInput = req.body.textToAnalize;
//     console.log(`userInput : ${userInput}`);
//     const apiURL = `${encodedURI}key=${apiKey}&txt=${userInput}&lang=en`

//     const response = await fetch(apiURL)
//     const meaningAPI = await response.json()
//     res.send(meaningAPI)
// })





//