import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.scss";
import Navbar from "@/components/Shared/Navbar.js";
import Hero from "../components/shared/Hero";

// import App from "next/app";

const MyApp = ({ Component, pageProps }) => {
  // console.log(Component);
  return (
    <div className="portfolio-app">
      <Navbar />
      {/* {pageProps.appData} */}
      {Component.name === "Home" && <Hero />}

      <div className="container">
        <Component {...pageProps} />
      </div>

      {Component.name === "Home" && (
        <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>
      )}
    </div>
  );
};

// MyApp.getInitialProps = async (context) => {
//   console.log('GET INITIAL PROPS FROM _app.js')
//   const initialProps =
//     App.getInitialProps && (await App.getInitialProps(context));

//   return {
//     pageProps: { appData: "hello _app component", ...initialProps.pageProps },
//   };
// };

export default MyApp;
