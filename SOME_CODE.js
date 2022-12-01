import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Express from "express";
import React from "react";
import { StaticRouter } from "react-router";
import { getDataFromTree } from "@apollo/client/react/ssr";

// File shown below
import Layout from "./routes/Layout";

const app = new Express();
app.use((req, res) => {

  
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "http://localhost:3010",
      credentials: "same-origin",
      headers: {
        cookie: req.header("Cookie"),
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  // The client-side App will instead use <BrowserRouter>
  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </ApolloProvider>
  );


  getDataFromTree(App).then((content) => {
    // Extract the entirety of the Apollo Client cache's current state
    const initialState = client.extract();

    // Add both the page content and the cache state to a top-level component
    const html = <Html content={content} state={initialState} />;

    // Render the component to static markup and return it
    res.status(200);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
    res.end();
  });




});

app.listen(basePort, () =>
  console.log(`app Server is now running on http://localhost:${basePort}`)
);
