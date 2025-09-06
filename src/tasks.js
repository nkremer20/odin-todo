class Project {
    constructor(projectName, status='Not Started') {
        this.projectName = projectName;
        this.status = status;
        this.id = crypto.randomUUID();
    }

    // Save new project
    save() {
        const projects = Project.getAllProjects();

        projects[this.id] = {
            projectName: this.projectName, 
            status: this.status,
            tasks: {}
        }

        console.log(projects);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Delete existing project
    static delete(id) {
        const projects = Project.getAllProjects();

        delete projects[id];

        localStorage.setItem('projects', JSON.stringify(projects));
        console.log('project deleted');
    }

    // Update project status
    static updateStatus(id, status) {
        const projects = Project.getAllProjects();

        projects[id]['status'] = status;

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Update project name
    static updateProjectName(id, projectName) {
        const projects = Project.getAllProjects();

        projects[id]['projectName'] = projectName;

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static getAllProjects() {
        const projects = localStorage.getItem('projects');

        if (!projects) {
            console.log('No projects');
            return {};
        } else {
            return JSON.parse(projects);
        }
    }
}

class Task {
    constructor(taskName, dueDate, priority, status='Not Started') {
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.id = crypto.randomUUID();
    }

    // Save a task to a project
    save(prjID) {
        const projects = Project.getAllProjects();

        projects[prjID]['tasks'][this.id] = {
            taskName: this.taskName, 
            dueDate: this.dueDate,
            priority: this.priority,
            status: this.status,
        }

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Delete a task from a project
    static delete(prjID, taskID) {
        const projects = Project.getAllProjects();

        delete projects[prjID]['tasks'][taskID];

        localStorage.setItem('projects', JSON.stringify(projects));
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

    form.reset();

    const addTaskDialog = document.querySelector('#new-task-dialog');
    addTaskDialog.close();
}

// function createTaskCard (task) {
//     const todoContainer = document.querySelector('.todo-container');

// }


export { Project, Task, processForm };