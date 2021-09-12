import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient  = new ApolloClient({
  uri: 'https://fakerql.nplan.io/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;