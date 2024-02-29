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

const UserModel = mongoose.model("place", UserSchema);

const LoginSchema = new mongoose.Schema({
  username: String,
  password: String,
  emailAddress: String,
});

const LoginModel = mongoose.model("user", LoginSchema);

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
  // openingHours: Joi.string(),
  // cuisineType: Joi.string(),
  // menu: Joi.array().items(Joi.string()),
  // contactInfo: Joi.string(),
  rating: Joi.string(),
  review: Joi.string(),
  // image: Joi.string().uri(),
});

const addLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = { UserModel, LoginModel, addEntitySchema, updateEntitySchema, addLogin, signupSchema };
