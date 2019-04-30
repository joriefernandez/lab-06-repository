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


app.use('*', (request, response) => response.send('Sorry, that route does not exist'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


//Function to search location
function searchLocation(searchQuery){
  console.log(`Search query: ${searchQuery}`);
  return new Location(searchQuery, require('./data/geo.json'));
}

function Location(query, data) {
  this.search_query = query;
  this.formatted_query= data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}

