// packages
var express = require('express');
var router = express.Router();

// models
var PostModel = require('../models/post.model')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/feeds', function (req, res, nect) {
  console.log("request for feed " + JSON.stringify(req.body));
  var text = req.body.text; //  text search field
  var quotetext = req.body.quotetext; //   search with quotes field
  var sort = req.body.sort; // sort with name or date
  var skip = 0; // default as 0 for skip objects
  var limit = 10; // default 10 objects
  var query = {};

  // check if normal text search
  if (text) {
    console.log("in text query ");
    query = {
      $text: {
        $search: text
      }
    }
  };

  // check if search is with quotes
  if (quotetext) {
    console.log("in quotes query ");
    query = {
      $or: [{
        name: {
          $regex: quotetext
        }
      }]
    }
  };

  // check if skip & limit given 
  // else will take default values from above 
  if (req.body.skip) skip = req.body.skip;
  if (req.body.limit) limit = req.body.limit;

  console.log("final query " + JSON.stringify(query));
  console.log("skip " + skip);
  console.log("limit " + limit);

  PostModel.find(query
    // ,{},
    // {dateLastEdited:-1} // default sorting of date
  ).skip(skip).limit(limit).then(data => {
    if (data.length > 0) {
      var result;

      // check if any sort given from frontend i.e. date or name
      if (sort === 'date') {
        result = data.sort((a, b) => b.dateLastEdited - a.dateLastEdited)
      } else if (sort === 'name') {
        // sort by name
        result = data.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        result = data
      }

      // console.log(result);
      res.status(200).send({
        message: 'success',
        data: result,
        count: result.length
      })

    } else {
      res.status(404).send({
        message: "No post found for this search"
      })
    }
  }).catch(err => {
    console.log("error " + err);
    res.status(500).send({
      message: "Something went wrong",
      error: err
    })
  })
})

module.exports = router;