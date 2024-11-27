const fs = require('fs');

class TaskManager {
    constructor(config) {
        this.tasks = [];
        this.config = config || { storage: 'local' };
        this.loadTasks();
    }

    addTask(task) {
        this.tasks.push({ task, completed: false });
        this.saveTasks();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
    }

    toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
    }

    getTasks() {
        return this.tasks;
    }

    saveTasks() {
        if (this.config.storage === 'local') {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        } else {
            fs.writeFileSync(this.config.storage, JSON.stringify(this.tasks));
        }
    }

    loadTasks() {
        if (this.config.storage === 'local') {
            this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        } else {
            if (fs.existsSync(this.config.storage)) {
                this.tasks = JSON.parse(fs.readFileSync(this.config.storage));
            }
        }
    }
}

module.exports = TaskManager;

const TaskManager = require('task-manager');

const TaskManager = require('task-manager');
const config = require('./config.json');

const taskManager = new TaskManager(config);

taskManager.addTask('Изучить JavaScript');

console.log(taskManager.getTasks());

taskManager.toggleTask(0);

taskManager.removeTask(0);
