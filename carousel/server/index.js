// helper files
const database = require('../database/index.js')

// middleware
const parser = require('body-parser');

// import controller
const {getImages, getUsers} = require('./controller.js');

const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/images', getImages);

// app.get('/images', (req, res) => {
//   let dummydata = [{
//         "imageId": 1,
//         "imageTitle": "testImage1",
//         "itemImageUrl": "https://fec-yelp-images.s3-us-west-1.amazonaws.com/food1.jpg",
//         "imageCategory": "food",
//         "imageDescription": "yummy dish",
//         "imageUploadDate": "2020-05-11T07:00:00.000Z",
//         "userId": 1,
//         "restaurantId": 2
//     },
//     {
//         "imageId": 2,
//         "imageTitle": "testImage2",
//         "itemImageUrl": "https://fec-yelp-images.s3-us-west-1.amazonaws.com/food2.jpg",
//         "imageCategory": "decor",
//         "imageDescription": "nice environment",
//         "imageUploadDate": "2020-05-11T07:00:00.000Z",
//         "userId": 1,
//         "restaurantId": 2
//     }]
//   res.send(dummydata);
// })

app.get('/users', getUsers);

module.exports = app;

