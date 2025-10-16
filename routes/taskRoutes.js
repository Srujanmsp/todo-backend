import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { createTask, getTasks, updateTask, deleteTask,getTaskById, markTaskCompleted, markTaskPending, getTasksByCategory } from '../controllers/taskController.js';


const router = express.Router();

// Create task & get all tasks
router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

// Get tasks by category (place BEFORE :id routes)
router.get('/category/:category', protect, getTasksByCategory);

// Single task by ID
router.get('/:id', protect, getTaskById);

// Update & delete task
router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

// Mark task completed/pending
router.post('/:id/markCompleted', protect, markTaskCompleted);
router.post('/:id/markPending', protect, markTaskPending);

export default router;