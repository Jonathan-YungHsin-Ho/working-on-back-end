module.exports = { projects, followers, following };

async function projects(parent, _args, context, _info) {
	return await context.prisma.projects({
		where: { postedBy: { id: parent.id } },
	});
}

async function followers(parent, _args, context, _info) {
	return await context.prisma.user({ id: parent.id }).followers();
}

async function following(parent, _args, context, _info) {
	return await context.prisma.user({ id: parent.id }).following();
}
