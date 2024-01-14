const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();
const uuidv4 = require("uuid").v4;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET all short URLs
app.get("/all", async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.json({ shortUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET short URLs by user ID
app.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const shortUrls = await ShortUrl.find({ user: userId });
    res.json({ shortUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a short URL
app.post("/shortUrls", async (req, res) => {
  try {
    const userId = req.body.data.user;
    await ShortUrl.create({ user: userId, full: req.body.data.fullUrl });
    const shortUrls = await ShortUrl.find({ user: userId });
    res.json({ shortUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET redirect to full URL by short URL
app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (!shortUrl) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();
    // res.json({ fullUrl: shortUrl.full });
    res.redirect(shortUrl.full);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE one URL by ID
app.delete("/delete/:urlId", async (req, res) => {
  try {
    await ShortUrl.findByIdAndDelete(req.params.urlId);
    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE all URLs by user ID
app.delete("/delete/user/:userId", async (req, res) => {
  try {
    await ShortUrl.deleteMany({ user: req.params.userId });
    res.json({ message: "All URLs for the user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE all URLs with secret key
app.delete("/delete/all", async (req, res) => {
  try {
    // Validate the secret key before allowing deletion
    const secretKey = req.body.secretKey;
    if (secretKey === "iamdinujaya") {
      await ShortUrl.deleteMany({});
      res.json({ message: "All URLs deleted successfully" });
    } else {
      res.status(401).json({ error: "Unauthorized access" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5005);
