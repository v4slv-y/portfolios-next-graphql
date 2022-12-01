const mongoose = require("mongoose");
const config = require("../config/dev");

const configm = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("./models/portfolio");

exports.connect = () => {
  mongoose.connect(config.DB_URI, configm, () => {
    console.log("connected to mongoDB! from database/index.js");
  });
};
