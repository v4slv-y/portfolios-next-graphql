const mongoose = require("mongoose");
const config = require("../config/dev");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const configm = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
};

require("./models/portfolio");
require("./models/user");

exports.connect = () => {
  mongoose.connect(config.DB_URI, configm, () => {
    console.log("connected to mongoDB! from database/index.js");
  });
};

exports.initSessionStore = () => {
  const store = new MongoDBStore({
    uri: config.DB_URI,
    collection: "portfolioSessions",
  });

  return store;
};
