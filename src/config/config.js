require("dotenv").config();
const env = process.env.NODE_ENV || "development";

const config = {
  [env]: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};

module.exports = config;
