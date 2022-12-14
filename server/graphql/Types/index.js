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
  avatar: String!
  username: String!
  name: String
  email: String!
  password: String!
  passwordConfirmation: String!
}

input singInInput{
  password: String!
  email: String!
}
`;

exports.forumTypes = `
type FomurCategory{
  _id: ID
  title: String
  subTitle: String
  slug: String
}

type Author{
  avatar: String
  username: String
}

  type Topic{
    _id: ID
    title: String
    content: String
    slug: String
    forumCategory: FomurCategory
    user: Author
    createdAt: String
  }

  input TopicInput{
    title: String
    content: String
    forumCategory: String
  }

  type Post{
    _id: ID
    content: String
    slug: String
    fullSlug: String
    topic: Topic
    user: User
    parent: Post
    createdAt: String
  }

  type PagPosts{
    posts: [Post]
    count: Int
  }

  input PostInput{
    content: String
    parent: String
    topic: String
  }
`;
