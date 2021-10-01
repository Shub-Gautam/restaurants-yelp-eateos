var request = require("request-promise");
var cherrio = require("cheerio");

var getDataofRes = require("./getDataofRes");

// var url = "https://www.yelp.com/search?cflt=restaurants";
// Since it is not a fully defined url, yelp going to route us to the following url
// https://www.yelp.com/search?cflt=restaurants&find_loc=San+Francisco%2C+CA
// Default location in yelp is set to CA San Francisco so whenever we pass a url to search restaurants without
// any specific location, yelp gonna route us to list the restaurants in its default location.

// This is for storing all the links for the restaurents ========================

const urllist = [];

// Function to extract url of restaurents ==============================

function saveUrlOfRestaurants(htmlurl) {
  return new Promise((resolve, reject) => {
    request(htmlurl, (err, response, html) => {
      if (err) {
        reject(err);
      }
      if (!err && response.statusCode == 200) {
        var $ = cherrio.load(html);
        var data = $("h4 > span > a");
        for (let index = 0; index < data.length; index++) {
          urllist.push(data[index].attribs.href);
        }
        console.log("working");
        resolve("Stored successfully");
      }
    });
  });
}

// Driver Function  ==========================================

async function fn() {
  // Saving Urls of different restaurants
  var target = 200; //No. of restaurantes
  for (let i = 0; i < target; i = i + 10) {
    html_link_to_parse = `https://www.yelp.com/search?cflt=restaurants&find_loc=San%20Francisco%2C%20CA&start=${i}`;
    await saveUrlOfRestaurants(html_link_to_parse);
  }

  console.log("No. of Url fetched : " + urllist.length);

  // Extracting and saving data from restaurent's page
  for (let l = 0; l < urllist.length; l++) {
    await getDataofRes(`https://www.yelp.com/${urllist[l]}`);
  }

  console.log("Stored Successfully");
}

fn();
