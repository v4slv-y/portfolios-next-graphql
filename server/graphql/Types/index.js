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
