require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const {
  UserModel,
  signupSchema,
  addEntitySchema,
  updateEntitySchema,
  LoginModel,
  addLogin,
  reviewModel,
  reviewJoi,
} = require("./models/BiryaniP");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(cookieParser());

const port = process.env.PUBLIC_PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI;

const secretKey = process.env.JWT_SECRET_KEY;
async function Connection() {
  await mongoose.connect(mongoDbUri);
  console.log("connected to DB");
}

app.use(express.json());
app.use("/api", routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/api/signup", async (req, res) => {
  const { username, password, email } = req.body;

  // Validate the signup data
  const { error } = signupSchema.validate({ username, password, email });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    // Check if the user already exists
    const existingUser = await LoginModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose a different one.",
      });
    }

    // If the user doesn't exist, create a new user
    const newUser = new LoginModel({ username, password, emailAddress: email });
    await newUser.save();

    res.cookie("username", username);

    const token = jwt.sign({ username }, secretKey);

    res.cookie("jwt", token);

    console.log("Signup success", username);
    console.log("Signup success. Token set:", token);
    res.json({
      success: true,
      message: "Signup successful",
      username,
      token,
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password, email } = req.body;

  const { error } = addLogin.validate({ username, password, email });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const user = await LoginModel.findOne({ username });

    await user.save();

    if (user) {
      // console.log(user.username);

      const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
      res.cookie("jwt", token);
      res.cookie("username", username);
      res.json({
        success: true,
        message: "Login successful",
        username,
        token,
        userId: user._id,
        username: user.username,
      });
      console.log("login success", username);
      console.log("Login success. Token set:", token);
    } else {
      res.status(200).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("jwt");
  res.json({ success: true, message: "Logout successful" });
});

app.post("/api/addEntity", async (req, res) => {
  try {
    const { error } = reviewJoi.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const name = req.body;
    const newEntity = new reviewModel(name);
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

    const { error } = updateEntitySchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const name = req.body;
    await UserModel.ByIdAndUpdate(entityId, name);

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

async function GetRandomBiryani() {
  let allBiryanis = await GetAll();
  if (allBiryanis.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * allBiryanis.length);
  return allBiryanis[randomIndex];
}

app.get("/getRandomBiryani", async (req, res) => {
  try {
    let randomBiryani = await GetRandomBiryani();
    res.json({ data: randomBiryani });
  } catch (error) {
    console.error("Error fetching random biryani:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/getBiryaniP", async (req, res) => {
  let value = await GetAll();
  res.send({ data: value });
});

app.get("/getUser", async (req, res) => {
  let x = await LoginModel.find();
  res.send(x);
});

app.post("/getAllReview", async (req, res) => {
  let x = req.body;
  // res.send(x);
  let value = await reviewModel.find({ username: x.username });
  console.log(value);
  res.send(value);
});

app.get("/api/protected", verifyToken, (req, res) => {
  // If the control reaches here, it means the token is valid
  res.json({ success: true, message: "Access to protected resource granted" });
});
function verifyToken(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Token not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Attach the decoded data to the request object for later use if needed
    req.user = decoded;
    next();
  });
}

Connection().then(() => {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
});

module.exports = app;
