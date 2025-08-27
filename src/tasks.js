class Task {
    constructor(taskName, dueDate, priority) {
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
    };

    createTask() {
        const taskJson = JSON.stringify(this);
        console.log(taskJson);
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
    newTask.createTask();
}

export { processForm };