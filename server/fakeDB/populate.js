const mongoose = require("mongoose");
const config = require("../config/dev");
const fakeDb = require("./fakeDb");

mongoose.connect(config.DB_URI, async () => {
  console.log("Starting popularing DB");
  await fakeDb.populate();
  await mongoose.connection.close();
  console.log("DB has benn populated!");
});
