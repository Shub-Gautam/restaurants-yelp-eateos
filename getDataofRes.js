var request = require("request-promise");
var cherrio = require("cheerio");

const resDataObject = require("./schemas/restaurentS.js");

var name, address, workinghours, imgurl, latandlang;

// Helper function ================================

function getDataofRes(url) {
  return new Promise((resolve, reject) => {
    // Extract Data
    request(url, (err, response, html) => {
      if (err) {
        reject(err);
      }
      if (!err && response.statusCode == 200) {
        var $ = cherrio.load(html);

        //   Find Data on the page
        name = $(".css-m7s7xv").text();
        address = $("address").text();
        workinghours = $(
          "html>body>div>div>yelp-react-root>div>div>div>div>div>div>div>div>div>div>span>span"
        ).text();
        latandlang = $("").text();
        imgurl = $("").text();
      }
      //   Adding Data to the mongodb object
      var file = new resDataObject({
        name: `${name}`,
        imgurl: "imgurl",
        address: `${address}`,
        latlng: "latandlang",
        businesshours: `${workinghours}`,
      });

      // Saving to DB
      const res = file
        .save()
        .then(() => {
          console.log("1 obj successfully stored");
          resolve(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
}

module.exports = getDataofRes;

//   var imgurl = $("css-bq71j2").text();
//   var imgurl = $("img").find(".photo-header-media-image__373c0__rKqBU")
//     .attribs.src;
// console.log(imgurl);
