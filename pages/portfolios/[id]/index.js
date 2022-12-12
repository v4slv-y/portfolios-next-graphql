import { useQuery, gql } from "@apollo/client";
// import { GET_PORTFOLIO } from "../../../apollo/queries";
import { useGetPortfolio } from "../../../apollo/actions";
import { formatDate } from "../../../utils/functions";
import moment from "moment";

const PortfolioDetail = ({ query }) => {
  // const { loading, error, data } = useQuery(GET_PORTFOLIO, {
  //   variables: { id: query.id },
  // });

  // if (loading) {
  //   return "Loading...";
  // }

  // const portfolio = (data && data.portfolio) || {};

  const { data } = useGetPortfolio({ variables: { id: query.id } });
  const portfolio = (data && data.portfolio) || {};

  function experienceDaysCount() {
    let now = moment().unix();

    if (portfolio.endDate) now = portfolio.endDate / 1000;

    return moment
      .unix(now)
      .diff(moment.unix(portfolio.startDate / 1000), "days");
  }

  return (
    <div className="portfolio-detail">
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">{portfolio.title}</h1>
          <p className="lead">{portfolio.jobTitle}</p>
          <p>
            <a
              className="btn btn-lg btn-success"
              href={portfolio.companyWebsite}
              role="button"
            >
              See Company
            </a>
          </p>
        </div>
        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{portfolio.location}</p>
            <h4 className="title">Start Date</h4>
            <p className="text">{formatDate(portfolio.startDate)}</p>
          </div>
          <div className="col-lg-6">
            <h4 className="title">Days</h4>
            <p className="text">{experienceDaysCount()}</p>
            <h4 className="title">End Date</h4>
            <p className="text">
              {(portfolio.endDate && formatDate(portfolio.endDate)) ||
                "Present day."}
            </p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{portfolio.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PortfolioDetail.getInitialProps = async ({ query }) => {
  console.log("GET INITIAL PROPS - portfolios id");

  return { query };
};

export default PortfolioDetail;
