var mongoose = require("mongoose");

var mongouri = process.env.MONGO_CONNECTION_URI;

mongoose.connect(mongouri);

var ResSchema = new mongoose.Schema({
  name: String,
  imgurl: String,
  address: String,
  LatLng: String,
  businesshours: String,
});

var resDataObject = new mongoose.model("restaurant", ResSchema);

module.exports = resDataObject;
