const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { importSchema } = require('graphql-import');
require('dotenv').config();
const path = require('path');
const { isTokenValid } = require('./authentication');
const queries = require('./queries');

const resolvers = {
  Query: {
    ...queries
  },
};

const filePath = path.join(__dirname, './schema/schema.graphql');
const typeDefs = importSchema(filePath);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const server = new ApolloServer({
  schema,
  cors: {
    origin: '*',
    credentials: true,
  },
  context: ({ req }) => {
    const token = req.headers.authorization;

    return {
      token,
      isAuthenticated: !!isTokenValid(token),
    };
  },
});

server
  .listen({ port: process.env.JBM_PORT })
  .then(({ url }) => `🚀 GraphQL server listening on ${url}`)
  .then(console.log)
  .catch(console.error);
