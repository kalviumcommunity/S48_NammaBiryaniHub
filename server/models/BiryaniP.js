const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  dish: String,
  restaurantName: String,
  openingHours: String,
  cuisineType: String,
  menu: Array,
  contactInfo: String,
  rating: String,
  review: String,
  image: String,
});

// Export the Mongoose model
const UserModel = mongoose.model("place", UserSchema);

// Export the Joi validation schema
const addEntitySchema = Joi.object({
  dish: Joi.string().required(),
  restaurantName: Joi.string().required(),
  openingHours: Joi.string().required(),
  cuisineType: Joi.string().required(),
  menu: Joi.array().items(Joi.string()).required(),
  contactInfo: Joi.string().required(),
  rating: Joi.string().required(),
  review: Joi.string().required(),
  image: Joi.string().uri().required(),
});

const updateEntitySchema = Joi.object({
  dish: Joi.string(),
  restaurantName: Joi.string(),
  openingHours: Joi.string(),
  cuisineType: Joi.string(),
  menu: Joi.array().items(Joi.string()),
  contactInfo: Joi.string(),
  rating: Joi.string(),
  review: Joi.string(),
  image: Joi.string().uri(),
});

module.exports = { UserModel, addEntitySchema, updateEntitySchema };
