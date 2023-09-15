const express = require("express");
const app = express();
const port = 3000;
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require('dotenv').config()
app.use(express.static("./public"))
app.use(express.json())
// routes
app.get("/", (req, res) => {
    res.send("Task manager")
})
app.use("/api/v1/tasks", tasks)

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`server is listening on port ...${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()

// app.get('api/v1/tasks')   -get all tasks
// app.post('api/v1/tasks')   -creat new task
// app.get('api/v1/tasks/:id')   -get single task
// app.patch('api/v1/tasks/:id')   -edit  task
// app.delete('api/v1/tasks/:id')   -delete  task