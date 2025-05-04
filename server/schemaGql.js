const typeDefs = gql`
  type Query {
    users: [User]
    userById(id: ID!): User
    quotes: [Quote]
    quotesByby(by: ID!): [Quote]
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    by: String
  }
`;

export default typeDefs;
