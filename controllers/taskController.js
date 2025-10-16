import Task from '../models/Task.js';

export const createTask = async (req, res) => {
try {
const { title, description, dueDate } = req.body;
const task = await Task.create({ title, description, dueDate, user: req.user });
res.status(201).json(task);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const getTasks = async (req, res) => {
try {
const { search, status, sortBy, order, page = 1, limit = 10 } = req.query;
const query = { user: req.user };


if (status) query.status = status;
if (search) query.$text = { $search: search };


const sortOptions = {};
if (sortBy) sortOptions[sortBy] = order === 'desc' ? -1 : 1;


const tasks = await Task.find(query)
.sort(sortOptions)
.skip((page - 1) * limit)
.limit(Number(limit));


const total = await Task.countDocuments(query);


res.json({ total, page: Number(page), tasks });
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const updateTask = async (req, res) => {
try {
const task = await Task.findOneAndUpdate(
{ _id: req.params.id, user: req.user },
req.body,
{ new: true }
);


if (!task) return res.status(404).json({ message: 'Task not found' });
res.json(task);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const deleteTask = async (req, res) => {
try {
const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json({ message: 'Task deleted successfully' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};
