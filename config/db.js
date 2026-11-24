const mongoose = require("mongoose");

let connection;

const dbConnected = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not configured");

  if (!connection) {
    connection = mongoose.connect(process.env.MONGO_URI).catch((error) => {
      connection = null;
      throw error;
    });
  }

  await connection;
  console.log("DB Connected");
};

module.exports = dbConnected;
