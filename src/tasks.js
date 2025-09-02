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
    delete(projectName) {
        const projects = Project.getAllProjects();

        delete projects[projectName];

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Update project status
    static updateStatus(projectName) {
        const projects = Project.getAllProjects();

        projects[projectName]['status'] = 'completed';

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



export { Project }




































// class Project {
//     constructor(projectName, status='Not Started') {
//         this.projectName = projectName;
//         this.status = status;
//         this._id = crypto.randomUUID();
//         this.tasks = {};
//     };


// }

// class Task {
//     constructor(taskName, dueDate, priority) {
//         this.taskName = taskName;
//         this.dueDate = dueDate;
//         this.priority = priority;
//         this.id = crypto.randomUUID();
//     };

//     // Saves task to local storage
//     save() {
//         const taskJson = JSON.stringify(this);
//         const tasks = Task.getAllTasks();
//         console.log('saved task')
//     }

//     // Gets all tasks from local storage
//     static getAllTasks() {
//         const projects = localStorage.getItem('project');
//         if (!projects) {
//             console.log('No projects')
//             return [];
//         } else {
//             console.log(projects)
//             return JSON.parse(projects);
//         }
//     }

// }

// function processForm(event) {
//     event.preventDefault();
//     const form = document.querySelector('form');

//     let taskData = [];

//     for (let i = 0; i < form.elements.length; i++) {
//         let element = form.elements[i];
//         if (element.type !== 'submit') {
//             taskData[i] = element.value;
//         }
//     }

//     const newTask = new Task(taskData[0], taskData[1], taskData[2]);
//     newTask.save();

//     form.reset();

//     const addTaskDialog = document.querySelector('#new-task-dialog');
//     addTaskDialog.close();
// }

// function createTaskCard (task) {
//     const todoContainer = document.querySelector('.todo-container');

// }

// export { processForm };