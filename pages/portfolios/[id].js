// const PortfolioDetail = ({ query }) => {
//   const { id } = query;

//   return <p>portfolio ID Page: {id}</p>;
// };

// PortfolioDetail.getInitialProps = ({ query }) => {
//   return { query };
// };

import axios from "axios";

const fetchPortfolio = async (prtf_id) => {
  const query = `
  query Portfolio {
    portfolio(id: "${prtf_id}"){
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

  const { data: graph_1 } = await axios.post("http://localhost:3000/graphql", {
    query,
  });
  const data_1 = graph_1.data;
  // console.log(graph_1);
  return data_1.portfolio;

  // const query = `
  // query Portfolio($at_id: ID) {
  //   portfolio(id: $at_id){
  //     _id
  //     title
  //     company
  //     companyWebsite
  //     location
  //     jobTitle
  //     description
  //     startDate
  //     endDate
  //   }
  // }
  // `;

  // const vari = { at_id: prtf_id };

  // return axios
  //   .post("http://localhost:3000/graphql", {
  //     query,
  //     vari,
  //   })
  //   .then(({ data: graph_1 }) => graph_1.data)
  //   .then((data) => data.portfolio);
};

const PortfolioDetail = (props) => {
  return <p>portfolio ID Page: {props.portfolio.title}</p>;
};

PortfolioDetail.getInitialProps = async (context) => {
  console.log("GET INITIAL PROPS - portfolios id");
  const doroga = context.query.id;
  const portfolio = await fetchPortfolio(doroga);

  return { portfolio };
};

export default PortfolioDetail;

{
  /* <div className="portfolio-detail">
  <div className="container">

    <div className="jumbotron">
      <h1 className="display-3">Some title</h1>
      <p className="lead">Some Job title</p>
      <p>
        <a className="btn btn-lg btn-success" href="#" role="button">
          See Company</a>
        </p>
    </div>

    <div className="row marketing">
      <div className="col-lg-6">
        <h4 className="title">Location</h4>
        <p className="text">Some Location</p>

        <h4 className="title">Start Date</h4>
        <p className="text">Some Start Date</p>
      </div>

      <div className="col-lg-6">
        {/* TODO: days later... */
}
//         <h4 className="title">Days</h4>
//         <p className="text">44</p>

//         <h4 className="title">End Date</h4>
//         <p className="text">Some End Date</p>
//       </div>
//       <div className="col-md-12">
//         <hr />
//         <h4 className="title">Description</h4>
//           <p>Some Description lala la lalala lala lala la lalala lala lala la lalala lala...</p>
//         </div>
//     </div>
//   </div>
// </div> */}
