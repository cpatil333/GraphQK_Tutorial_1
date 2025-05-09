import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    userById(_id: ID!): User
    quotes: [QuoteWithName]
    quotesByby(by: ID!): [Quote]
    myProfile: User
  }
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type QuoteWithName {
    name: String
    by: IdName
  }
  type IdName {
    _id: String
    firstName: String
  }
  type Quote {
    name: String
    by: String
  }
  type Token {
    token: String
  }
  type Mutation {
    singupUser(newUser: UserInput!): User
    singinUser(userSignin: UserSigninInput!): Token
    createQuote(name: String!): String
    updateUser(userUpdate: ExistUserInput!): User
    deleteUser(_id: ID!): User
  }
  input ExistUserInput {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
