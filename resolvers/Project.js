module.exports = { postedBy, likes, comments };

async function postedBy(parent, _args, context, _info) {
	return await context.prisma.project({ id: parent.id }).postedBy();
}

// async function starredBy(parent, args, context, info) {}

// async function updates(parent, args, context, info) {}

async function likes(parent, _args, context, _info) {
	return await context.prisma.likes({ where: { id: parent.id } });
}

async function comments(parent, _args, context, _info) {
	return await context.prisma.comments({ where: { id: parent.id } });
}

// async function tags(parent, args, context, info) {}
