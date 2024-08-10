const routes = require("./routes/route");
const cors = require("@fastify/cors");
const path = require("node:path");
const fastify = require("fastify")({
	logger: true,
});
require("dotenv").config();
const port = process.env.PORT || 3000;
fastify.register(cors, {
	// put your options here
});
// serving static file

fastify.register(require("@fastify/static"), {
	root: path.join(__dirname, "public"),
	// prefix: "/", // optional: default '/'
	// constraints: { host: "example.com" }, // optional: default {}
});
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
