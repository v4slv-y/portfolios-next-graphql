import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";
import {
  useGetPortfolios,
  useUpdatePortfolio,
  useDeletePortfolio,
  useCreatePortfolio,
} from "@/apollo/actions";

const Portfolios = () => {
  const { data } = useGetPortfolios();
  const [updatePortfolio] = useUpdatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();
  const [createPortfolio] = useCreatePortfolio();

  const portfolios_data = (data && data.portfolios) || [];
  console.log(portfolios_data);
  // debugger;

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
                  onClick={() =>
                    updatePortfolio({ variables: { id: prt._id } })
                  }
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    deletePortfolio({ variables: { id: prt._id } })
                  }
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
