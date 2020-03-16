module.exports = { user, project };

async function user(parent, _args, context, _info) {
	return await context.prisma.comment({ id: parent.id }).user();
}

async function project(parent, _args, context, _info) {
	return await context.prisma.comment({ id: parent.id }).project();
}
