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

    // Update task name
    static updateName(prjID, taskID, newTaskName) {
        const projects = Project.getAllProjects();

        projects[prjID]['tasks'][taskID]['taskName'] = newTaskName;

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Update task due date
    static updateDueDate(prjID, taskID, newDueDate) {
        const projects = Project.getAllProjects();

        projects[prjID]['tasks'][taskID]['dueDate'] = newDueDate;

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Update task priority
    static updatePriority(prjID, taskID, newPriority) {
        const projects = Project.getAllProjects();

        projects[prjID]['tasks'][taskID]['priority'] = newPriority;

        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    // Update task status
    static updateStatus(prjID, taskID, newStatus) {
        const projects = Project.getAllProjects();

        projects[prjID]['tasks'][taskID]['status'] = newStatus;

        localStorage.setItem('projects', JSON.stringify(projects));
    }
}

function processTaskForm(event) {
    event.preventDefault();
    const form = document.querySelector('.add-task-form');

    let taskData = [];

    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (element.type !== 'submit' && element.type !== 'reset') {
            taskData[i] = element.value;
        }
    }

    const taskName = taskData[0];
    const dueDate = taskData[1];
    const priority = taskData[2];
    const prjID = taskData[3];

    const newTask = new Task(taskName, dueDate, priority);

    newTask.save(prjID);

    form.reset();

    const modal = document.querySelector('.add-task-modal');
    modal.close();

    createTaskCard(prjID, newTask['id'], taskName, dueDate, newTask['status'], priority);
}

function processProjectForm(event) {
    event.preventDefault();
    const form = document.querySelector('.add-project-form');

    let projectData = [];

    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (element.type !== 'submit' && element.type !== 'reset') {
            projectData[i] = element.value;
        }
    }

    const projectName = projectData[0];

    const newProject = new Project(projectName);
    newProject.save()

    form.reset();

    const modal = document.querySelector('.add-project-modal');
    modal.close();

    createPrjCard(newProject['id'], projectName);

    console.log(projectData);
}

function createPrjCard(prjID, prjName) {
    const todoContainer = document.querySelector('.todo-container')

    const prjCard = document.createElement('div');
    prjCard.id = prjID;
    prjCard.classList.add('prj-card');

    const prjCardName = document.createElement('h1');
    prjCardName.textContent = prjName;
    prjCard.appendChild(prjCardName);

    todoContainer.appendChild(prjCard);
}

function createTaskCard(prjID, taskID, taskName, dueDate, status, priority) {
    const prjCard = document.getElementById(prjID);

    const taskCard = document.createElement('div');
    taskCard.id = taskID;
    taskCard.classList.add('task-card');

    const taskCardName = document.createElement('p');
    taskCardName.textContent = `Task Name: ${taskName}`;
    taskCard.appendChild(taskCardName);

    const taskCardDueDate = document.createElement('p');
    taskCardDueDate.textContent = `Due Date: ${dueDate}`;
    taskCard.appendChild(taskCardDueDate);

    const taskCardStatus = document.createElement('p');
    taskCardStatus.textContent = `Status: ${status}`;
    taskCard.appendChild(taskCardStatus);

    const taskCardPriority = document.createElement('p');
    taskCardPriority.textContent = `Priority: ${priority}`;
    taskCard.appendChild(taskCardPriority);

    prjCard.appendChild(taskCard);
}

export { Project, Task, processTaskForm, processProjectForm, createPrjCard, createTaskCard };