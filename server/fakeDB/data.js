const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      avatar:
        "https://i.pinimg.com/600x315/6b/2b/71/6b2b7195bbcd1fd5e4507997c8baf74d.jpg",
      email: "yulugy@inbos.ls",
      name: "slava second",
      username: "yulugy",
      info: "hello im from rezekne",
      password: "1234567",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
      email: "bazil@gmail.ls",
      name: "bazil first",
      username: "vasilij",
      info: "hello im from Riga",
      password: "1234567000",
    },
  ],

  portfolios: [
    {
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016",
      user: user1Id,
    },
    {
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013",
      user: user1Id,
    },
    {
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "01/01/2010",
      endDate: "01/01/2011",
      user: user2Id,
    },
    {
      title: "Work in Vilani",
      company: "Gator",
      companyWebsite: "www.derevja.lv",
      location: "Vilani, Latvia",
      jobTitle: "Rab",
      description: "Wrok hard and don't ask questions!",
      startDate: "04/04/2013",
      endDate: "12/02/2014",
      user: user2Id,
    },
  ],
};

module.exports = data;
