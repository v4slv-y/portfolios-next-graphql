import axios from "axios";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PORTFOLIOS, CREATE_PORTFOLIO } from "../../apollo/queries";

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

const Portfolios = () => {
  const [portfolios_data, setPortfolios] = useState([]);
  const [getPortfolios, { loading, error, data }] =
    useLazyQuery(GET_PORTFOLIOS);
  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] },
      });
    },
  });

  // const onPortfolioCreated = (dataC) => {
  //   setPortfolios([...portfolios_data, dataC.createPortfolio]);
  // };
  // const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
  //   onCompleted: onPortfolioCreated,
  // });

  useEffect(() => {
    getPortfolios();
  }, []);

  if (
    data &&
    data.portfolios.length > 0 &&
    (portfolios_data.length === 0 ||
      data.portfolios.length !== portfolios_data.length)
  ) {
    setPortfolios(data.portfolios);
  }
  if (loading) {
    return "Loading...";
  }

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

export default Portfolios;
