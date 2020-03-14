const bcrypt = require('bcryptjs');

const { generateToken, checkFields, getUserID } = require('../utils');

module.exports = { signup, login, updateUser, deleteUser };

async function signup(_parent, args, context, _info) {
	const { username, password } = args;
	checkFields({ username, password });
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
