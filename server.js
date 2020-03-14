const { ApolloServer } = require('apollo-server');
const { prisma } = require('./generated/prisma-client');

const typeDefs = require('./schema');
const Query = require('./resolvers/Query');
// const User = require('./resolvers/User');
// const Mutation = require('./resolvers/Mutation');

const resolvers = {
	Query,
	// Mutation,
	// User,
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: req => ({ ...req, prisma }),
});

module.exports = server;
