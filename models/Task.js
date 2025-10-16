import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
title: { type: String, required: true },
description: { type: String },
category: { type: String, enum: ['Work','Personal','Shopping'], default: 'Personal', index: true },
status: { type: String, enum: ['pending', 'completed'], default: 'pending', index: true },
dueDate: { type: Date, index: true }
}, { timestamps: true });

taskSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Task', taskSchema);