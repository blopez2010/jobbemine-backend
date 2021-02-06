const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { importSchema } = require('graphql-import');
require('dotenv').config();
const path = require('path');

const resolvers = {
  Query: {
    getGreetings: () => ({ greeting: 'Hello' }),
  }
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
});

server
  .listen({ port: process.env.JBM_PORT })
  .then(({ url }) => `🚀 GraphQL server listening on ${url}`)
  .then(console.log)
  .catch(console.error);