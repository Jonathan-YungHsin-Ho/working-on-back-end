const bcrypt = require('bcryptjs');

const {
	generateToken,
	checkFields,
	getUserID,
	// addNewTags,
	// splitAndTrimTags,
	// deleteDisconnectedTags,
} = require('../utils');

module.exports = {
	signup,
	login,
	updateUser,
	deleteUser,
	createProject,
	updateProject,
	deleteProject,
	createLike,
	deleteLike,
	createComment,
	deleteComment,
};

async function signup(_parent, args, context, _info) {
	const { email, username, password } = args;
	checkFields({ email, username, password });
	const hash = bcrypt.hashSync(args.password, 10);
	args.password = hash;

	const user = await context.prisma.createUser(args);
	const token = generateToken(user);

	return { token, user };
}

async function login(_parent, args, context, _info) {
	const user = await context.prisma.user({ email: args.email });
	const passwordMatch = await bcrypt.compare(args.password, user.password);

	if (!user || !passwordMatch) throw new Error('Invalid Login');

	const token = generateToken(user);

	return { token, user };
}

async function updateUser(_parent, args, context, _info) {
	const id = getUserID(context);

	return await context.prisma.updateUser({ data: args, where: { id } });
}

async function deleteUser(_parent, _args, context, _info) {
	const id = getUserID(context);

	return await context.prisma.deleteUser({ id });
}

async function createProject(_parent, args, context, _info) {
	const { name } = args;
	checkFields({ name });
	const id = getUserID(context);

	return await context.prisma.createProject({
		...args,
		postedBy: { connect: { id } },
	});
}

async function updateProject(_parent, args, context, _info) {
	const { id, ...data } = args;

	return await context.prisma.updateProject({ data, where: { id } });
}

async function deleteProject(_parent, args, context, _info) {
	// const id = getUserID(context);
	return await context.prisma.deleteProject({ id: args.id });
}

async function createLike(_parent, args, context, _info) {
	const { projectID } = args;
	const id = getUserID(context);

	return await context.prisma.createLike({
		project: { connect: { id: projectID } },
		user: { connect: { id } },
	});
}

async function deleteLike(_parent, args, context, _info) {
	return await context.prisma.deleteLike({ id: args.id });
}

async function createComment(_parent, args, context, _info) {
	const { projectID, text } = args;
	checkFields({ text });
	const id = getUserID(context);

	return await context.prisma.createComment({
		user: { connect: { id } },
		text,
		project: { connect: { id: projectID } },
	});
}

async function deleteComment(_parent, args, context, _info) {
	return await context.prisma.deleteComment({ id: args.id });
}
