class Project {
    constructor(projectName, description, status) {
        this.projectName = projectName;
        this.description = description;
        this.status = status;
        this.createdAt = new Date().toISOString();
        this.closedAt = null;
        this._id = crypto.randomUUID();
    };


}

class Task {
    constructor(taskName, dueDate, priority) {
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
    };

    // Saves task to local storage
    save() {
        const taskJson = JSON.stringify(this);

    }

    // Gets all tasks from local storage
    static getAllTasks() {
        
    }

}

function processForm(event) {
    event.preventDefault();
    const form = document.querySelector('form');

    let taskData = [];

    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (element.type !== 'submit') {
            taskData[i] = element.value;
        }
    }

    const newTask = new Task(taskData[0], taskData[1], taskData[2]);
    newTask.save();

    console.log(newTask);

    form.reset();
}

function createTaskCard (task) {
    const todoContainer = document.querySelector('.todo-container');

}

export { processForm };