require('dotenv').config();
const server = require('./server');

server
	.listen()
	.then(({ url }) => console.log(`\n** Server running at ${url} **\n`));
