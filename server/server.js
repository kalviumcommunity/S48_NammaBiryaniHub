require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const { UserModel, addEntitySchema, updateEntitySchema } = require("./models/BiryaniP");

const app = express();
const cors = require("cors");
app.use(cors());

const port = process.env.PUBLIC_PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI;

async function Connection() {
  await mongoose.connect(mongoDbUri);
  console.log("connected to DB");
}

app.use(express.json());
app.use("/api", routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/api/addEntity", async (req, res) => {
  try {

    const { error } = addEntitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const name = req.body;
    const newEntity = new UserModel(name);
    let x = await newEntity.save();

    res.json({ success: true, message: "Entity added successfully", x });
  } catch (error) {
    console.error("Error adding entity:", error);
    res.status(500).json({ success: false, message: "Failed to add entity" });
  }
});

app.put("/api/updateEntity/:id", async (req, res) => {
  try {
    const entityId = req.params.id;
    const name = req.body;

    const { error } = updateEntitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    
    await UserModel.findByIdAndUpdate(entityId, name);

    res.json({ success: true, message: "Entity updated successfully" });
  } catch (error) {
    console.error("Error updating entity:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update entity" });
  }
});

app.delete("/api/deleteEntity/:id", async (req, res) => {
  try {
    const entityId = req.params.id;

    await UserModel.findByIdAndDelete(entityId);

    res.json({ success: true, message: "Entity deleted successfully" });
  } catch (error) {
    console.error("Error deleting entity:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete entity" });
  }
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
