// npm install --save express
// "scripts": {
//     "dev": "node server server/index.js", <- node vmesto next
//     "build": "next build",
//     "start": "next start"
//   },

const express = require("express");
const next = require("next");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { portfolioResolvers } = require("./graphql/resolvers");
const { portfolioTypes } = require("./graphql/types");

app.prepare().then(() => {
  const server = express();

  const schema = buildSchema(`
  ${portfolioTypes}
  type Query{
    hello: String
    portfolio(id: ID!): Job
    portfolios: [Job]
  }
  `);

  const root = { ...portfolioResolvers };

  server.use(
    "/graphql",
    graphqlHTTP({
      schema, //schema
      rootValue: root, //resolvers
      graphiql: true,
    })
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
