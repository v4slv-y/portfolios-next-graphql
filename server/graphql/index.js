const mongooseModel = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const { portfolioTypes, userTypes, forumTypes } = require("./types");
const { buildAuthContext } = require("./context");
const {
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries,
  forumQueries,
  forumMutations,
} = require("./resolvers");

const Portfolio = require("./models/Portfolio");
const User = require("./models/User");
const ForumCategory = require("./models/ForumCategory");
const Topic = require("./models/Topic");
const Post = require("./models/Post");

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}
    ${forumTypes}

    type Query {
      portfolio(id: ID!): Job
      portfolios: [Job]
      userPortfolios: [Job]

      user(id: ID): User

      forumCategories: [FomurCategory]

      topicsByCategory(category: String): [Topic]
      topicBySlug(slug: String): Topic

      postsByTopic(slug: String, pageNum: Int, pageSize: Int): PagPosts
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Job
      updatePortfolio(id: ID, input: PortfolioInput): Job
      deletePortfolio(id: ID): ID

      singUp(input: singUpInput): String
      singIn(input: singInInput): User
      singOut: Boolean

      createTopic(input: TopicInput): Topic

      createPost(input: PostInput): Post
    }
  `;

  const resolvers = {
    Query: { ...portfolioQueries, ...userQueries, ...forumQueries },
    Mutation: { ...portfolioMutations, ...userMutations, ...forumMutations },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: (res) => {
      // console.log(res)
      return {
        ...buildAuthContext(res.req),
        models: {
          Portfolio: new Portfolio(mongooseModel.model("Portfolio"), res.req.user),
          User: new User(mongooseModel.model("User")),
          ForumCategory: new ForumCategory(mongooseModel.model("ForumCategory")),
          Topic: new Topic(mongooseModel.model("Topic"), res.req.user),
          Post: new Post(mongooseModel.model("Post"), res.req.user),
        },
      }

    },
  });

  return apolloServer;
};
