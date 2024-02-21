const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  openingHours: String,
  cuisineType: String,
  menu: Array,
  ContactInfo: String,
});

const UserModel = mongoose.model("place", UserSchema);

// getAll();

// console.log("why??");

module.exports = UserModel;
