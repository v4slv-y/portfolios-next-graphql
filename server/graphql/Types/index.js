const portfolioFields = `
  title: String,
  company: String,
  companyWebsite: String,
  location: String,
  jobTitle: String,
  description: String,
  startDate: String,
  endDate: String
`;

exports.portfolioTypes = `
type Job{
  _id: ID
  ${portfolioFields}
}

input PortfolioInput{
  ${portfolioFields}
}
`;

exports.userTypes = `
type User{
  _id: ID
  avatar: String
  username: String
  name: String
  email: String
  role: String
}

input singUpInput{
  avatar: String
  username: String!
  name: String!
  email: String!
  password: String!
  passwordConfirmation: String!
}

input singInInput{
  password: String!
  email: String!
}
`;
