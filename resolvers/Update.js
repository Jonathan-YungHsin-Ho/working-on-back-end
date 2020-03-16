module.exports = { project };

async function project(parent, _args, context, _info) {
	return await context.prisma.update({ id: parent.id }).project();
}
