const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TaskSchema = new Schema({
	title: {
		type: String,
		required: [true, "Title field is required"]
	},
	status: {
		type: String,
		required: [true, "Status field is required"]
	},
	priority: {
		type: Number,
		required: [true, "Priority field is required"]
	},
	dueDate: {
		type: String,
		required: [true, "Due Date field is required"]
	}
}, { versionKey: false, timestamps: true });

const Task = mongoose.model('task', TaskSchema);
module.exports = Task;