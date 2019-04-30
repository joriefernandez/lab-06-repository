'use strict';

require('dotenv').config();

const express =  require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.static('/public'));

app.get('/location', (request, response) => {
  let locationObject = searchLocation(request.query.data);
  console.log(locationObject);
  response.send(locationObject);

});

app.get('/weather', (request, response) => {
  let weatherObject = getWeather();
  console.log(weatherObject);
  response.send(weatherObject);

});


app.use('*', (request, response) => response.send('Sorry, that route does not exist'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


//Function to search location
function searchLocation(searchQuery){
  console.log(`Search query: ${searchQuery}`);
  return new Location(searchQuery, require('./data/geo.json'));
}

function getWeather(){
  let weatherArray = [];
  let data = require('./data/darksky.json');
  data.daily.data.forEach(day => {
    weatherArray.push(new Weather(day.summary, day.time));
  });
  console.table(weatherArray);
  return weatherArray;
}

function Location(query, data) {
  this.search_query = query;
  this.formatted_query= data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}

function Weather(forecast, time){
  this.forecast = forecast;
  this.time = time;
}

