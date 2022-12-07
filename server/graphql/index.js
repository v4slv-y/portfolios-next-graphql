const mongooseModel = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const Portfolio = require("./models/Portfolio");
const User = require("./models/User");
const { portfolioTypes, userTypes } = require("./types");
const { buildAuthContext } = require("./context");
const {
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries
} = require("./resolvers");

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}

    type Query {
      portfolio(id: ID!): Job
      portfolios: [Job]
      
      user(id: ID): User
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Job
      updatePortfolio(id: ID, input: PortfolioInput): Job
      deletePortfolio(id: ID): ID

      singUp(input: singUpInput): String
      singIn(input: singInInput): User
      singOut: Boolean
    }
  `;

  const resolvers = {
    Query: { ...portfolioQueries, ...userQueries },
    Mutation: { ...portfolioMutations, ...userMutations },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongooseModel.model("Portfolio")),
        User: new User(mongooseModel.model("User")),
      },
    }),
  });

  return apolloServer;
};
