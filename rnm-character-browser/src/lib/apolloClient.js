import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listCustomCharacters: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...incoming];
            },
          },
        },
      },
    },
  }),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL,
  }),
});
