const mongoose = require("mongoose");
const config = require("../config/dev");
const fakeDb = require("./fakeDb");

const configm = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
};

mongoose.connect(config.DB_URI, configm, async () => {
  console.log("Starting popularing DB");
  await fakeDb.populate();
  await mongoose.connection.close();
  console.log("DB has benn populated!");
});
