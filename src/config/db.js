const db = require("../models");

async function connectDB() {
  try {
    await db.sequelize.authenticate();
    console.log("connected to db");

    // await db.sequelize.sync();
    // console.log("database synced");
  } catch (e) {
    console.log(`DB Error ${e}`);
  }
}

connectDB();

module.exports = db;
