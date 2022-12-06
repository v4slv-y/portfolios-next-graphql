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
        startDate: "2011-02-05T08:00Z"
        endDate: "2014-03-21T17:00Z"
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

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID!) {
    updatePortfolio(
      id: $id
      input: {
        title: "UPDATE Job in Vilani"
        company: "UPDATE Wood manufacture"
        companyWebsite: "UPDATE www.rabstvo.lv"
        location: "UPDATE Vilana, Latvia"
        jobTitle: "UPDATE Rab"
        description: "UPDATE Work hard and don't ask questions!"
        startDate: "2011-02-05T08:00Z"
        endDate: "2014-03-21T17:00Z"
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

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID!) {
    deletePortfolio(id: $id)
  }
`;

export const SING_UP = gql`
  mutation SingUp(
    $avatar: String!
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    singUp(
      input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;

export const SING_IN = gql`
  mutation SingIn($email: String!, $password: String!) {
    singIn(input: { email: $email, password: $password }) {
      _id
      avatar
      username
      role
    }
  }
`;
