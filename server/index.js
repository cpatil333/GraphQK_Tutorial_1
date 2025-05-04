import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fakedb.js";


const resolvers = {
  Query: {
    users: () => users,
    userById: (parent, { id }) => users.find((user) => user.id == id),
    quotesByby: (parent, { by }) => quotes.filter((quote) => quote.by == by),
    quotes: () => quotes,
  },
  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
