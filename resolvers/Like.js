module.exports = { user, project };

async function user(parent, _args, context, _info) {
	return await context.prisma.like({ id: parent.id }).user();
}

async function project(parent, _args, context, _info) {
	return await context.prisma.like({ id: parent.id }).project();
}
