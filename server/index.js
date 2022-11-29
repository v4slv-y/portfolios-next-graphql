const express = require("express");
const next = require("next");

const { ApolloServer, gql } = require("apollo-server-express");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { portfolioQueries, portfolioMutations } = require("./graphql/resolvers");
const { portfolioTypes } = require("./graphql/types");

app.prepare().then(async () => {
  const server = express();

  const typeDefs = gql`
    ${portfolioTypes}
    type Query {
      hello: String
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

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: server });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
