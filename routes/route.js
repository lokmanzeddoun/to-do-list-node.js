const { v4: uuidv4 } = require("uuid");

async function routes(fastify, options) {
	fastify.get("/todos", async (request, reply) => {
		try {
			const { rows } = await fastify.pg.query("SELECT * FROM todos");
			reply.send(rows);
		} catch (error) {
			throw new Error(err);
		}
	});
	fastify.post("/todos", async (request, reply) => {
		const { name, important, dueDate } = request.body;
		const id = uuidv4();
		console.log(id);
		const done = false;
		let createdAt = new Date().toISOString();
		try {
			const { rows } = await fastify.pg.query(
				`INSERT INTO todos (id, name, "createdAt", important, "dueDate", done)
      VALUES($1, $2, $3, $4, $5, $6 )
       RETURNING *`,
				[id, name, createdAt, important, dueDate, done]
			);
			console.log(rows);
			reply.code(201);
			return { created: true };
		} catch (error) {
			throw new Error(error);
		}
	});
	fastify.patch("/todos/:id", async (request, reply) => {
		const id = request.params.id;
		console.log(id);
		const { important, dueDate, done } = request.body;
		try {
			const { rows } = await fastify.pg.query(
				`UPDATE todos SET
        important = COALESCE($1,important),
        "dueDate"=COALESCE($2,"dueDate"),
        done = COALESCE($3,done)
        WHERE id= $4
        RETURNING *
        `,
				[important, dueDate, done, id]
			);
			console.log(rows);
			reply.code(204);
		} catch (error) {
			throw new Error(error);
		}
	});

	fastify.delete("/todos/:id", async (request, reply) => {
		const id = request.params.id;
		try {
			const { rows } = await fastify.pg.query(
				`DELETE FROM todos
        WHERE id = $1
        RETURNING * 
        `,
				[id]
			);
			console.log(rows);
			reply.code(204);
		} catch (error) {
			throw new Error(error);
		}
	});
}
module.exports = routes;
