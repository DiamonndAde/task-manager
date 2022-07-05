const Task = require("../models/task");
const asyncWrapper = require("../middlewares/async");
const { createCustomApiError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(
      createCustomApiError(`Task not found with the id: ${taskID}`, 404)
    );
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(
      createCustomApiError(`Task not found with the id: ${taskID}`, 404)
    );
  }
  // res.status(200).json({ task: null, status: "deleted" });
  // res.status(200).send()
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, // return the new updated document
    runValidators: true, // run validators on the updated document (e.g. check if the title is not empty) and return the validation errors if any
  });
  if (!task) {
    return next(
      createCustomApiError(`Task not found with the id: ${taskID}`, 404)
    );
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
