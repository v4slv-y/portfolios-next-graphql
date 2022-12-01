const mongooseModel = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const { portfolioQueries, portfolioMutations } = require("./resolvers");
const { portfolioTypes } = require("./types");
const Portfolio = require("./models/Portfolio");

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes}
    type Query {
      portfolio(id: ID!): Job
      portfolios: [Job]
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Job
      updatePortfolio(id: ID, input: PortfolioInput): Job
      deletePortfolio(id: ID): ID
    }
  `;

  const resolvers = {
    Query: { ...portfolioQueries },
    Mutation: { ...portfolioMutations },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Portfolio: new Portfolio(mongooseModel.model("Portfolio")),
      },
    }),
  });

  return apolloServer;
};
