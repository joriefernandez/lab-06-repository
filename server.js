'use strict';

require('dotenv').config();

const express =  require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.static('/public'));

app.get('/location', (request, response) => {
  response.status(200).send('Success!');
});


app.use('*', (request, repsonse) => response.send('Sorry, that route does not exist'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
