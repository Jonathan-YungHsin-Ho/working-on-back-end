const jwt = require('jsonwebtoken');

module.exports = {
	checkFields,
	generateToken,
	getUserID,
	checkAdmin,
	validToken,
};

const JWT_SECRET = process.env.JWT_SECRET;

function checkFields(args) {
	for (let key of Object.keys(args)) {
		if (!args[key]) throw new Error('Invalid input for required fields');
	}
}

function generateToken(user) {
	const payload = {
		id: user.id,
		username: user.username,
	};

	const options = {
		expiresIn: '3d',
	};

	return jwt.sign(payload, JWT_SECRET, options);
}

function getUserID(context) {
	const Authorization = context.request.get('Authorization');

	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { id: userID } = jwt.verify(token, JWT_SECRET);
		return userID;
	}

	throw new Error('Not Authenticated');
}

async function checkAdmin(context) {
	const user = await context.prisma.user({ id: getUserID(context) });
	if (user.email !== process.env.ADMIN_EMAIL)
		throw new Error('You are unauthorized to perform this action.');
}

function validToken(context) {
	const Authorization = context.request.get('Authorization');

	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		return jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				return {
					token: '',
					valid: false,
				};
			} else {
				return {
					token: generateToken(decoded),
					valid: true,
				};
			}
		});
	}

	throw new Error('Not Authenticated');
}
