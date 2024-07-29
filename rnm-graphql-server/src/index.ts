// https://www.apollographql.com/docs/apollo-server/api/express-middleware/

import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import dotenv from "dotenv";
import axios from "axios";

// Resolvers query has to match with frontend to avoid returning null value to the frontend request
export const resolvers = {
  Query: {
    characters: async (_, { page, filter }) => {
      const query = `
          query($page: Int, $filter: FilterCharacter) {
            characters(page: $page, filter: $filter) {
              results {
                id
                name
                status
                image
                species
                gender
                type
                origin {
                  name
                }
                location {
                  name
                }
                episode {
                  episode
                  name
                  created
                  id
                  air_date
                }
              }
              info {
                count
                pages
                next
                prev
              }
            }
          }
        `;

      const res = await axios.post(process.env.API_URL, {
        query,
        variables: { page, filter },
      });

      return res.data.data.characters;
    },
    character: async (_, { id }) => {
      const query = `
          query($id: ID!) {
            character(id: $id) {
              id
              name
              status
              image
              species
              gender
              type
              origin {
                name
                id
                type
              }
              location {
                name
              }
              episode {
                episode
                name
                created
                id
                air_date
              }
            }
          }
        `;

      const res = await axios.post(process.env.API_URL, {
        query,
        variables: { id },
      });

      return res.data.data.character;
    },
  },
};

export const typeDefs = `#graphql
  type Character {
    id: ID
    name: String
    status: String
    image: String
    species: String
    gender: String
    type: String
    origin: Origin
    location: Location
    episode: [Episode]
  }

  type PageInfo {
    count: Int
    pages: Int
    next: String
    prev: String
  }

  type CharacterResponse {
    results: [Character]
    info: PageInfo
  }

  type Origin {
    id: ID
    name: String
    type: String
  }

  type Location {
    created: String
    dimension: String
    id: ID
    name: String
    # residents: [Character]!
    type: String
  }

  type Episode {
    air_date: String
    # characters: [Character]!
    created: String
    episode: String
    id: ID
    name: String
  }

  input FilterCharacter{
    gender: String
    name: String
    species: String
    status: String
    type: String
  }

  type Query {
    characters(page: Int, filter: FilterCharacter): CharacterResponse
    character(id: ID!): Character
  }
`;

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  try {
    await server.start();

    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: PORT }, resolve)
    );
    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}/`);
  } catch (e) {
    console.log(`Error starting server: ${e}`);
  }
}

startServer();
