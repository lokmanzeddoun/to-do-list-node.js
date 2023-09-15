const Task = require("../models/tasks")


const creatTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).json(tasks)
    } catch (err) {
        res.status(501).json({ msg: err })
    }
}
const getTask = async (req, res) => {
    try {

        const { id: TaskId } = req.params;
        const task = await Task.findOne({ _id: TaskId })
        if (!task) {
            return res.status(404).json({ msg: `task not found with this id ${TaskId}` })
        }

        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
const updateTask = async (req, res) => {
    try {
        const { id: TaskID } = req.params
        const updateInfo = req.body
        const task = await Task.findByIdAndUpdate({ _id: TaskID }, updateInfo,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
        if (!task) {
            return res.status(404).json({ msg: `task not found with this id ${TaskId}` })
        }
        res.status(200).json({ task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }

}
const deleteTask = async (req, res) => {
    try {
        const { id: TaskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: TaskId })
        if (!task) {
            return res.status(404).json({ msg: `task not found with this id ${TaskId}` })
        }
            res.status(200).json({ task })
    }
        catch (error) {
            res.status.json({ msg: error })
        }
    }

    // other way to send response
    // res.send()
    // res.status().json({task:null,status:'success'})





module.exports = {
    getAllTasks, getTask, creatTask, updateTask, deleteTask,
}