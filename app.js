const routes = require("./routes/route");

const fastify = require("fastify")({
	logger: true,
});
require("dotenv").config();
const port = process.env.PORT || 3000;

// register the database in plugin
fastify.register(require("@fastify/postgres"), {
	connectionString: process.env.PG_URL,
});

// register the route plugin

fastify.register(routes);
const start = async () => {
	try {
		// then create server
		fastify.listen({ port }, (err) => {
			if (err) throw err;
			console.log(`server listening on ${fastify.server.address().port}`);
		});
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
