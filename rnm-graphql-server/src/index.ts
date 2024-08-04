// https://www.apollographql.com/docs/apollo-server/api/express-middleware/

import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import dotenv from "dotenv";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import CharacterAPI from "./datasources/character-api";
import { resolvers } from "./resolvers";
import { CustomCharacterAPI } from "./datasources/custom-character-api";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 4000;

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  })
);

const createContext = async (context: any) => {
  const { req } = context;
  const { cache } = server;
  const token = req?.headers?.token || null;
  return {
    token,
    dataSources: {
      characterAPI: new CharacterAPI({ cache }),
      customCharacterAPI: new CustomCharacterAPI(),
    },
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "my-graph-id@my-graph-variant",

          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

async function startServer() {
  try {
    await server.start();

    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
        context: createContext,
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

// Local environment
if (process.env.NODE_ENV !== "lambda") {
  startServer();
}

// AWS Lambda
const handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: createContext,
  }
);

export { handler };
