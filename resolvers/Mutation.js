const bcrypt = require('bcryptjs');

const {
	generateToken,
	checkFields,
	getUserID,
	addNewTags,
	splitAndTrimTags,
	deleteDisconnectedTags,
} = require('../utils');

module.exports = {
	signup,
	login,
	updateUser,
	deleteUser,
	// createProject,
	// updateProject,
	// deleteProject,
	// createLike,
	deleteLike,
	// createComment,
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
	const user = await context.prisma.user({ username: args.username });
	const token = generateToken(user);
	const passwordMatch = await bcrypt.compare(args.password, user.password);

	if (!user || !passwordMatch) throw new Error('Invalid Login');

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

// async function createProject(parent, args, context, info) {}

// async function updateProject(parent, args, context, info) {}

// async function deleteProject(_parent, args, context, _info) {
// 	// const id = getUserID(context);
// 	// return await context.prisma.deleteProject({ id: args.id });
// }

// async function createLike(parent, args, context, info) {}

async function deleteLike(_parent, args, context, _info) {
	return await context.prisma.deleteLike({ id: args.id });
}

// async function createComment(parent, args, context, info) {
// 	const { projectID, text } = args;
// }

async function deleteComment(_parent, args, context, _info) {
	return await context.prisma.deleteComment({ id: args.id });
}
