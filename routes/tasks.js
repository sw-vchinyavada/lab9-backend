const router = require("express").Router();
const { verifyToken } = require('./token');
const TaskService = require('../services/task_service');


router.post('/task', verifyToken, async function (req, res, next) {
	try {
		const task = await TaskService.addTask(req.user, req.body);

		if (!task.success)
			return res.status(task.statusCode).send(task);

		res.status(200).send(task);
	}
	catch (err) {
		next(err);
	}

});

router.get('/task/:id', async function (req, res, next) {
	try {

		const task = await TaskService.getTask(req.params.id);
		if (!task.success)
			return res.status(task.statusCode).send(task);
		res.status(200).send(task);
	}
	catch (err) {
		next(err);
	}
});


// only author || moderator || admin

router.put('/task/:id', verifyToken, async function (req, res, next) {
	try {
		const task = await TaskService.editTask(req.user, req.params.id, req.body);
		if (!task.success)
			return res.status(task.statusCode).send(task);
		res.status(200).send(task);
	}
	catch (err) {
		next(err);
	}
});

router.delete('/task/:id', verifyToken, async function (req, res, next) {
	try {
		const task = await TaskService.deleteTask(req.user, req.params.id);
		if (!task.success)
			return res.status(task.statusCode).send(task);
		res.status(200).send(task);
	}
	catch (err) {
		next(err);
	}
});


router.get('/tasks', async function (req, res, next) {
	try {
		const tasks = await TaskService.getTasks(req.query);
		if (!tasks.success)
			return res.status(tasks.statusCode).send(tasks);
		res.status(200).send(tasks);
	}
	catch (err) {
		next(err);
	}
});


module.exports = router;