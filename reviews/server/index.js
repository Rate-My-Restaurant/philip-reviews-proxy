const express = require('express');
const db = require('../database/index.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/reviews/restaurants/:id', (req, res) => {
  console.log(req.query);
  if(req.query.sort_by) {
    return db.sortReviews(req.params.id, req.query.sort_by, (error, data) => {
      if (error) {
        console.log(error);
        res.status(404).send('error GET on sort reviews');
      } else {
        res.status(200).send(data);
      }
    })
  } else if (req.query.q) {
    return db.searchedReviews(req.params.id, req.query.q, (error, data) => {
      if (error) {
        console.log(error);
        res.status(404).send('error GET on searched reviews');
      } else {
        res.status(200).send(data);
      }
    });
  }
  db.allReviews(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
      res.status(404).send('error GET request on all reviews');
    } else {
      res.status(200).send(data);
    }
  });
});

/*
app.get('/reviews/restaurants/:id', (req, res) => {
  let dummydata = [
    {
        "id": 3,
        "stars": 4,
        "uploadDate": "2/12/2020",
        "restaurantVisit": 2,
        "content": "Love this place",
        "emojiUseful": 1,
        "emojiFunny": 0,
        "emojiCool": 1,
        "reply": "Thank you!",
        "replyDate": "2/13/2020",
        "userID": 3,
        "profPicURL": "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/profilepics/pambeesly.jpg",
        "userName": "Pam Beesly",
        "city": "Fremont",
        "friendCount": 223,
        "memberStatus": "Elite",
        "statusYear": 2020,
        "pictures_count": 4,
        "reviews_count": 2,
        "restaurantName": "Taste of Korea",
        "pictures": [
            "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/korean_menu1.jpg",
            "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/bossam_pic1.jpg",
            "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/korean_inside1.jpg",
            "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/reviewpics/kimchi_pic1.jpg"
        ]
    },
    {
        "id": 7,
        "stars": 3,
        "uploadDate": "5/1/2020",
        "restaurantVisit": 0,
        "content": "Too spicy",
        "emojiUseful": 0,
        "emojiFunny": 0,
        "emojiCool": 0,
        "reply": null,
        "replyDate": null,
        "userID": 5,
        "profPicURL": "https://fec-yelpreviews.s3-us-west-1.amazonaws.com/profilepics/angelamartin.jpg",
        "userName": "Angela Martin",
        "city": "Berkeley",
        "friendCount": 20,
        "memberStatus": "Elite",
        "statusYear": 2020,
        "pictures_count": 2,
        "reviews_count": 2,
        "restaurantName": "Taste of Korea",
        "pictures": []
    }]
    res.send(dummydata);
});
*/

app.post('/reviews/emoji', (req, res) => {
    db.emojiPlus(req.body, (err, data) => {
        if (err) {
          res.status(404).send('error updating emoji')
        } else {
          res.status(200).send(data)
        }
      });
    }
  )

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
