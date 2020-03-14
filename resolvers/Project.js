module.exports = { likes, comments };

async function likes(parent, _args, context, _info) {
	return await context.prisma.likes({ where: { id: parent.id } });
}

async function comments(parent, _args, context, _info) {
	return await context.prisma.comments({ where: { id: parent.id } });
}
