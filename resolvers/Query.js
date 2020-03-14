const { getUserId, validToken } = require('../utils');

module.exports = {
	info,
	user,
	me,
	checkToken,
};

function info() {
	return 'Welcome to WorkingOn GraphQL playground!';
}

async function user(_parent, args, context, _info) {
	return await context.prisma.user({ id: args.id });
}

async function me(_parent, _args, context, _info) {
	return await context.prisma.user({ id: getUserId(context) });
}

function checkToken(_parent, _args, context, _info) {
	return validToken(context);
}
