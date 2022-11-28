const data_p = {
  portfolios: [
    {
      _id: "sad87da79213123",
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016",
    },
    {
      _id: "da789ad1",
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013",
    },
    {
      _id: "sadcxv9",
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "01/01/2010",
      endDate: "01/01/2011",
    },
  ],
};

exports.portfolioQueries = {
  hello: () => {
    return "hello my world";
  },
  portfolio: (root, args) => {
    const result = data_p.portfolios.find((prt) => prt._id === args.id);
    return result;
  },
  portfolios: () => {
    return data_p.portfolios;
  },
};

exports.portfolioMutations = {
  createPortfolio: (root, args) => {
    const _id = require("crypto").randomBytes(10).toString("hex");
    const newPortfolio = { ...args.input };
    newPortfolio._id = _id;

    data_p.portfolios.push(newPortfolio);
    return newPortfolio;
  },
  updatePortfolio: (root, args) => {
    const index = data_p.portfolios.findIndex((p) => p._id === args.id);
    const oldPrtf = data_p.portfolios[index];
    const updatedPrtf = { ...oldPrtf, ...args.input };
    data_p.portfolios[index] = updatedPrtf;

    return updatedPrtf;
  },
  deletePortfolio: (root, args) => {
    const index = data_p.portfolios.findIndex((p) => p._id === args.id);
    data_p.portfolios.splice(index, 1);

    return args.id;
  },
};
