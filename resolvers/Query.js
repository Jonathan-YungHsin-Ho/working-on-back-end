const { getUserID, validToken } = require('../utils');

module.exports = {
	info,
	user,
	me,
	checkToken,
	allProjects,
	projectByID,
	allUsers,
};

function info() {
	return 'Welcome to WorkingOn GraphQL playground!';
}

async function user(_parent, args, context, _info) {
	return await context.prisma.user({ id: args.id });
}

async function me(_parent, _args, context, _info) {
	return await context.prisma.user({ id: getUserID(context) });
}

function checkToken(_parent, _args, context, _info) {
	return validToken(context);
}

async function allProjects(_parent, _args, context, _info) {
	return await context.prisma.projects();
}

async function projectByID(_parent, args, context, _info) {
	return await context.prisma.project({ id: args.id });
}

async function allUsers(_parent, _args, context, _info) {
	return await context.prisma.users();
}
