var request = require("request-promise");
var cherrio = require("cheerio");

var url = "https://www.yelp.com/search?cflt=restaurants";
// Since it is not a fully defined url, yelp going to route us to the following url
// https://www.yelp.com/search?cflt=restaurants&find_loc=San+Francisco%2C+CA
// Default location in yelp is set to CA San Francisco so whenever we pass a url to search restaurants without
// any specific location, yelp gonna route us to list the restaurants in its default location.

// This is for storing all the links for the restaurents
const urllist = [];

// we have yo make this function syncronous
function saveUrlOfRestaurents(htmlurl) {
  request(htmlurl, (err, response, html) => {
    if (!err && response.statusCode == 200) {
      var $ = cherrio.load(html);
      var data = $("h4 > span > a");
      var imgurl = $(".css-xlzvdl").attribs.src;
      for (let index = 0; index < data.length; index++) {
        urllist.push(data[index].attribs.href);
      }
      console.log("working");
    }
  });
}

for (let i = 0; i < 20; i = i + 10) {
  html_link_to_parse = `https://www.yelp.com/search?cflt=restaurants&find_loc=San%20Francisco%2C%20CA&start=${10}`;
  saveUrlOfRestaurents(url);
}

setTimeout(() => {
  console.log(urllist);
}, 20000);

//   console.log(
//     $(
//       "html>body>yelp-react-root>div>div>div>div>div>div>div>ul>li>div>div>span"
//     )
//   );
