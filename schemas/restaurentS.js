var mongoose = require("mongoose");

var mongouri = "mongodb://localhost:27017/resdata";

mongoose.connect(mongouri);

var ResSchema = new mongoose.Schema({
  name: String,
  imgurl: String,
  address: String,
  LatLng: String,
  businesshours: String,
});

var resDataObject = new mongoose.model("restaurent", ResSchema);

module.exports = resDataObject;
