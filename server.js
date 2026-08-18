const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/symptom", require("./routes/symptom"));
app.use("/api/history", require("./routes/history"));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ MongoDB Connection with Robust Error Handling
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/ai-health";
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error! Please make sure your database server is running.");
    console.error(err.message);
  });

// ✅ Server Start
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});