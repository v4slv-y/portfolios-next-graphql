const data_p = {
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
    },
  ],
};

const Portfolio = require("../../database/models/portfolio");

exports.portfolioQueries = {
  portfolio: async (root, { id }, context) => {
    return await context.models.Portfolio.getById(id);
  },
  portfolios: async (root, args, context) => {
    return await context.models.Portfolio.getAll();
  },
};

exports.portfolioMutations = {
  createPortfolio: async (root, args, context) => {
    const createdPortfolio = await Portfolio.create(args.input);
    return createdPortfolio;
  },
  updatePortfolio: async (root, { id, input }, context) => {
    const undatedPortfolio = await context.models.Portfolio.findAndUpdate(
      id,
      input
    );
    return undatedPortfolio;
  },
  deletePortfolio: async (root, args, context) => {
    const deletetedPortfolioId = await context.models.Portfolio.findAndDelete(
      args.id
    );
    return deletetedPortfolioId._id;
  },
};
