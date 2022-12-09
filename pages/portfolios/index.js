import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Link from "next/link";
import { useGetPortfolios } from "@/apollo/actions";

const Portfolios = () => {
  const { data } = useGetPortfolios();

  const portfolios_data = (data && data.portfolios) || [];
  console.log(portfolios_data);

  return (
    <>
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
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Portfolios;
