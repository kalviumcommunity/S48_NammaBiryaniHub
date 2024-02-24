const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  dish: String,
  restaurantName: String,
  openingHours: String,
  cusineType: String,
  menu: Array,
  contactInfo: String,
  rating: String,
  review: String,
  image: String,

});

const UserModel = mongoose.model("place", UserSchema);
module.exports = UserModel;
