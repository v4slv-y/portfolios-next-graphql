// const apiCall = () => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res({ testing: "just data dadada" });
//     }, 200);
//   });
// };

import axios from "axios";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";

const fetchPortfolios = async () => {
  const query = `
  query Portfolios {
    portfolios{
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
  `;

  const { data: graph } = await axios.post("http://localhost:3000/graphql", {
    query,
  });
  const data_1 = graph.data;
  return data_1.portfolios;
};

const Portfolios = ({ portfolios }) => {
  return (
    <>
      {/* {props.testing} */}
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>Portfolios</h1>
            </div>
          </div>
        </section>

        <section className="pb-5">
          <div className="row">
            {portfolios.map((prt) => (
              <div key={prt._id} className="col-md-4">
                <Link
                  legacyBehavior
                  href="/portfolios/[id]"
                  as={`/portfolios/${prt._id}`}
                >
                  <a className="card-link">
                    <PortfolioCard portfolio={prt} />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

Portfolios.getInitialProps = async () => {
  console.log("GET INITIAL PROPS FROM portfolio/index.js");
  const portfolios = await fetchPortfolios();
  return { portfolios };
};

export default Portfolios;
