// https://www.apollographql.com/docs/apollo-server/api/express-middleware/
import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./schemas/typeDefs.js";
import { resolvers } from "./schemas/resolvers.js";
import dotenv from "dotenv";
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
    await server.start();
    app.use("/graphql", cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }));
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}/`);
}
startServer();
