import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "isomorphic-unfetch";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import AppNavbar from "@/components/Shared/Navbar.js";
import Hero from "../components/shared/Hero";

const client = new ApolloClient({
  ssrMode: true,
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  // resolvers: {
  //   Portfolio: {
  //     daysOfExperience() {
  //       return "100";
  //     },
  //   },
  // },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <div className="portfolio-app">
        <AppNavbar />
        {Component.name === "Home" && <Hero />}

        <div className="container">
          <Component {...pageProps} />
        </div>

        {Component.name === "Home" && (
          <footer
            id="sticky-footer"
            className="py-4 bg-black text-white-50 py-3"
          >
            <div className="container text-center">
              <small>Copyright &copy; Your Website</small>
            </div>
          </footer>
        )}
      </div>
      <ToastContainer />
    </ApolloProvider>
  );
};

export default MyApp;

//skipped lecture 39. Apollo high order component(HOC)
