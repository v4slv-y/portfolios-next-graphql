import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($content: String, $topic: String, $parent: String) {
    createPost(input: { content: $content, topic: $topic, parent: $parent }) {
      _id
      content
      slug
      createdAt
      user {
        username
        avatar
      }
      parent {
        content
        user {
          username
          avatar
        }
      }
    }
  }
`;

export const POSTS_BY_TOPIC = gql`
  query PostsByTopic($slug: String, $pageNum: Int, $pageSize: Int) {
    postsByTopic(slug: $slug, pageNum: $pageNum, pageSize: $pageSize) {
      posts {
        _id
        content
        slug
        createdAt
        user {
          username
          avatar
        }
        parent {
          content
          user {
            username
            avatar
          }
        }
      }
      count
    }
  }
`;

export const TOPIC_BY_SLUG = gql`
  query TopicBySlug($slug: String) {
    topicBySlug(slug: $slug) {
      content
      title
      _id
      slug
      user {
        username
        avatar
      }
      forumCategory {
        _id
        slug
        title
      }
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $title: String
    $content: String
    $forumCategory: String
  ) {
    createTopic(
      input: { title: $title, content: $content, forumCategory: $forumCategory }
    ) {
      _id
      title
      content
      slug
      content
      user {
        username
        avatar
      }
      forumCategory {
        _id
        title
        slug
      }
    }
  }
`;

export const TOPICS_BY_CATEGORY = gql`
  query TopicsByCategory($category: String) {
    topicsByCategory(category: $category) {
      _id
      slug
      title
      content
      user {
        username
        avatar
      }
      forumCategory {
        _id
        title
        slug
      }
    }
  }
`;

export const FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      slug
      title
      subTitle
    }
  }
`;

export const GET_USER_PORTFOLIOS = gql`
  query UserPortfolios {
    userPortfolios {
      _id
      title
      jobTitle
      startDate
      endDate
    }
  }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`;

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      _id
      # daysOfExperience @client
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
  mutation ProtfolioCreate(
    $title: String!
    $company: String!
    $companyWebsite: String!
    $location: String!
    $jobTitle: String!
    $description: String!
    $startDate: String!
    $endDate: String
  ) {
    createPortfolio(
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
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
  mutation UpdatePortfolio(
    $id: ID
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    updatePortfolio(
      id: $id
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
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

export const SING_OUT = gql`
  mutation SingOut {
    singOut
  }
`;
