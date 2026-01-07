const app = require("../server");
const connectDB = require("../db");

module.exports = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    return app(req, res);
  } catch (e) {
    return res.status(500).json({ message: "DB connection failed", error: e.message });
  }
};
