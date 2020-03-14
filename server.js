const { ApolloServer } = require('apollo-server');
const { prisma } = require('./generated/prisma-client');

const typeDefs = require('./schema');
const {
	Query,
	Mutation,
	User,
	Project,
	Like,
	Comment,
} = require('./resolvers');

const resolvers = {
	Query,
	Mutation,
	User,
	Project,
	Like,
	Comment,
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true,
	context: req => ({ ...req, prisma }),
});

module.exports = server;
