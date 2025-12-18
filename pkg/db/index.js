const mongoose = require("mongoose");

const init = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error!", err.message);
    // process.exit(1);
  }
};

module.exports = { init };