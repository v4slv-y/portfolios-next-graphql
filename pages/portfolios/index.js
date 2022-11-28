import axios from "axios";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";
import { useState } from "react";

const graphcreatePortfolio = async () => {
  const query = `
  mutation ProtfolioCreate {
    createPortfolio(input: {
      title: "Job in Vilani"
      company: "Wood manufacture"
      companyWebsite: "www.rabstvo.lv"
      location: "Vilana, Latvia"
      jobTitle: "Rab"
      description: "Work hard and don't ask questions!"
      startDate: "01/02/2011"
      endDate: "04/02/2022"
    }) {
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
  return data_1.createPortfolio;
};

const fetchPortfolios = async () => {
  console.log("fetching portfolios");
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

const graphUpdatePortfolio = async (id) => {
  const query = `
  mutation UpdatePortfolio {
    updatePortfolio(id: "${id}",input: {
      title: "UPDATE Job in Vilani"
      company: "UPDATE Wood manufacture"
      companyWebsite: "UPDATE www.rabstvo.lv"
      location: "UPDATE Vilana, Latvia"
      jobTitle: "UPDATE Rab"
      description: "UPDATE Work hard and don't ask questions!"
      startDate: "01/02/2011"
      endDate: "04/02/2022"
    }) {
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

  const result_query = await axios.post("http://localhost:3000/graphql", {
    query,
  });
  return result_query.data.data.updatePortfolio;
};

const graphDeletePorfolio = async (id) => {
  const query = `
    mutation DeletePortfolio{
      deletePortfolio(id: "${id}")
    }
  `;

  const result_query = await axios.post("http://localhost:3000/graphql", {
    query,
  });
  return result_query.data.data.deletePortfolio;
};

const Portfolios = ({ portfolios }) => {
  const [portfolios_data, setPortfolios] = useState(portfolios);

  const createPortfolio = async () => {
    const newPrtf = await graphcreatePortfolio();
    const newPrtflios = [...portfolios_data, newPrtf];
    setPortfolios(newPrtflios);
  };

  const updatePortfolio = async (prtf_id) => {
    const updatedPrtf = await graphUpdatePortfolio(prtf_id);
    const index = portfolios_data.findIndex((p) => p._id === prtf_id);
    const newPrtf = portfolios_data.slice();
    newPrtf[index] = updatedPrtf;
    setPortfolios(newPrtf);
  };

  const deletePortfolio = async (id) => {
    const deleteId = await graphDeletePorfolio(id);
    const index = portfolios_data.findIndex((p) => p._id === deleteId);
    const newPrtf = portfolios_data.slice();
    newPrtf.splice(index, 1);
    setPortfolios(newPrtf);
  };

  return (
    <>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>Portfolios</h1>
            </div>
          </div>
          <button onClick={createPortfolio} className="btn btn-primary">
            Create Portfolio
          </button>
        </section>

        <section className="pb-5">
          <div className="row">
            {portfolios_data.map((prt) => (
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
                <button
                  className="btn btn-warning"
                  onClick={() => updatePortfolio(prt._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePortfolio(prt._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

Portfolios.getInitialProps = async () => {
  console.log("GET INITIAL PROPS FROM portfolios/index.js");
  const portfolios = await fetchPortfolios();
  return { portfolios };
};

export default Portfolios;
