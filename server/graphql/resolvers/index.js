exports.portfolioQueries = {
  portfolio: async (root, { id }, context) => {
    return await context.models.Portfolio.getById(id);
  },
  portfolios: async (root, args, context) => {
    return await context.models.Portfolio.getAll();
  },
  userPortfolios: (root, args, context) => {
    return context.models.Portfolio.getAllByUser(context);
  },
};

exports.portfolioMutations = {
  createPortfolio: async (root, args, context) => {
    const createdPortfolio = await context.models.Portfolio.create(args.input);
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

exports.userQueries = {
  user: async (root, args, context) => {
    return await context.models.User.getAuthUser(context);
  },
};

exports.userMutations = {
  singUp: async (root, args, context) => {
    const registeredUser = await context.models.User.singUp(args.input);
    return registeredUser._id;
  },

  singIn: (root, args, context) => {
    console.log(args.input, "in Resolver args.input");
    return context.models.User.singIn(args.input, context);
  },

  singOut: (root, args, context) => {
    return context.models.User.singOut(context);
  },
};
