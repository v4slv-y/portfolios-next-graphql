import { gql } from "@apollo/client";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
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

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
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

export const CREATE_PORTFOLIO = gql`
  mutation ProtfolioCreate {
    createPortfolio(
      input: {
        title: "Job in Vilani"
        company: "Wood manufacture"
        companyWebsite: "www.rabstvo.lv"
        location: "Vilana, Latvia"
        jobTitle: "Rab"
        description: "Work hard and don't ask questions!"
        startDate: "01/02/2011"
        endDate: "04/02/2022"
      }
    ) {
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
