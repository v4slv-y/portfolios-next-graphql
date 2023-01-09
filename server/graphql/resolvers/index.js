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

exports.forumQueries = {
  topicBySlug: async (root, args, context) => {
    return await context.models.Topic.getBySlug(args.slug);
  },

  forumCategories: async (root, args, context) => {
    return await context.models.ForumCategory.getAll();
  },

  topicsByCategory: async (root, { category }, context) => {
    const forumCategory = await context.models.ForumCategory.getBySlug(
      category
    );
    if (!forumCategory) return null;

    return await context.models.Topic.getAllByCategory(forumCategory._id);
  },

  postsByTopic: async (root, args, context) => {
    const topic = await context.models.Topic.getBySlug(args.slug);
    return context.models.Post.getAllByTopic(
      topic,
      args.pageNum,
      args.pageSize
    );
  },
};

exports.forumMutations = {
  createTopic: async (root, { input }, ctx) => {
    const category = await ctx.models.ForumCategory.getBySlug(
      input.forumCategory
    );
    input.forumCategory = category._id;
    const topic = await ctx.models.Topic.create(input);
    return topic;
  },

  createPost: async (root, { input }, ctx) => {
    const post = await ctx.models.Post.create(input);
    return post;
  },
};
