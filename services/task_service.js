const Task = require('../models/task');
const { error_json, success_json } = require('../utils/helpers');
const { taskValidation } = require('../utils/validation');

module.exports = class TaskService {
    static async addTask(session, data) {


        // check if data is valid
        const { error } = taskValidation(data)
        if (error)
            return error_json(400, error.details[0].message);

        // assigning user to the task	
        data.author_id = session.user_id;
        data.title = data.title.toUpperCase();

        const task = await Task.create(data);
        if (!task)
            return error_json(500, "Error creating task");

        return success_json(200, task);


    }

    static async getTask(id) {

        var task = await Task.findById({ _id: id });
        if (!task)
            return error_json(404, "Task not found");
        return success_json(200, task);

    }

    static async editTask(session, id, data) {
        const task = await Task.findById({ _id: id });
        if (!task)
            return error_json(404, "Task not found");
        // check if user is author of the task or has higher role
        if (session.role == "moderator" || session.role == "admin") {
            // make sure author_id is not modified
            data.author_id = session.user_id;
            data.title = data.title.toUpperCase();
            // if everything is ok edit the task
            var res = await Task.updateOne({ _id: id }, data);

            if (!res)
                return error_json(500, "Error editing task");

            res = await Task.findOne({ _id: id });
            return success_json(200, res);
        }
        else
            return error_json(401, "Not authorized");

    }

    static async deleteTask(session, id) {
        // check if user is author of the task
        if (session.role == "moderator" || session.role == "admin") {
            const task = await Task.findById({ _id: id});
            if (!task)
                return error_json(404, "Task not found");

            const res = await Task.deleteOne({ _id: id });
            if (!res)
                return error_json(500, "Error deleting task");

            return success_json(200, { "ok": res.ok });
    
        }
        else
            return error_json(401, "Not Authorized");


    }

    static async getTasks(query) {

        var perPage = 4;
        try {
            var page = parseInt(query.page);
            if (page <= 0) page = 1;
        }
        catch { var page = 1; }
        var qry = {};
        if (query.category) qry.categories = query.category;
        if (query.tag) qry.tags = query.tag;
        if (query.author_id) qry.author_id = query.author_id;

        const tasks = await Task.find(qry, {}, { skip: perPage * (page - 1), limit: perPage });
        if (!tasks)
            return error_json(500, "Error getting tasks");
        const count = await Task.countDocuments(qry);
        return success_json(200, { count: tasks.length, total: count, tasks: tasks });

    }
}