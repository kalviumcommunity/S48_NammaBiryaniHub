require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.PUBLIC_PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI;
const UserModel = require("./models/BiryaniP");

async function Connection() {
  await mongoose.connect(mongoDbUri);
  console.log("connected to DB");
}

app.use(express.json());
app.use("/api", routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

async function GetAll() {
  let result = await UserModel.find();
  return result;
}

app.get("/getBiryaniP", async (req, res) => {
  let value = await GetAll();
  res.send({ data: value });
});

Connection().then(() => {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
});

module.exports = app;
