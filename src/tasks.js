import closeIcon from './assets/close_small_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';

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

        console.log(`Project Name updated to ${projectName}`);
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
        console.log('task deleted');
    }

    // Update task name
    static updateName(prjID, taskID, newTaskName) {
        const projects = Project.getAllProjects();

        projects[prjID]['tasks'][taskID]['taskName'] = newTaskName;

        localStorage.setItem('projects', JSON.stringify(projects));

        console.log(`Task Name updated to ${newTaskName}`);
    }

    // Update task due date
    static updateDueDate(prjID, taskID, newDueDate) {
        const projects = Project.getAllProjects();

        projects[prjID]['tasks'][taskID]['dueDate'] = newDueDate;

        localStorage.setItem('projects', JSON.stringify(projects));

        console.log(`Due date updated to ${newDueDate}`);
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

    // Create prj card
    const prjCard = document.createElement('div');
    prjCard.id = prjID;
    prjCard.classList.add('prj-card');

    // Create prj card header
    const prjCardHeader = document.createElement('div');
    prjCardHeader.classList.add('prj-card-header');
    prjCard.appendChild(prjCardHeader);

    // Create prj name textarea
    const prjCardName = document.createElement('textarea');
    prjCardName.classList.add('project-name')
    prjCardName.name = 'project-name';
    prjCardName.textContent = prjName;
    prjCardHeader.appendChild(prjCardName);

    // Create delete prj button
    const deletePrjBtn = document.createElement('button');
    deletePrjBtn.classList.add('delete-btn');
    deletePrjBtn.classList.add('delete-prj-button')
    const deleteIcon = document.createElement('img');
    deleteIcon.src = closeIcon;
    deletePrjBtn.appendChild(deleteIcon);
    prjCardHeader.appendChild(deletePrjBtn);

    todoContainer.appendChild(prjCard);
}

function createTaskCard(prjID, taskID, taskName, dueDate, status, priority) {
    const prjCard = document.getElementById(prjID);

    // Create task card
    const taskCard = document.createElement('div');
    taskCard.id = taskID;
    taskCard.classList.add('task-card');

    // Create task card header
    const taskCardHeader = document.createElement('div');
    taskCardHeader.classList.add('task-card-header');
    taskCard.appendChild(taskCardHeader);

    // Create task name textarea
    const taskCardName = document.createElement('textarea');
    taskCardName.classList.add('task-name');
    taskCardName.name = 'task-name';
    taskCardName.textContent = taskName;
    taskCardHeader.appendChild(taskCardName);

    // Create delete task button
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.classList.add('delete-btn');
    deleteTaskBtn.classList.add('delete-task-btn');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = closeIcon;
    deleteTaskBtn.appendChild(deleteIcon);
    taskCardHeader.appendChild(deleteTaskBtn);

    // Create task card info div
    const taskCardInfo = document.createElement('div');
    taskCardInfo.classList.add('task-card-info');
    taskCard.appendChild(taskCardInfo);

    // Create due date input
    const dueDateLabel = document.createElement('p');
    dueDateLabel.textContent = 'Due Date: ';
    const dueDateInput = document.createElement('input')
    dueDateInput.type = 'date';
    dueDateInput.name = 'due-date';
    dueDateInput.classList.add('due-date-input')
    dueDateInput.value = dueDate;
    dueDateLabel.appendChild(dueDateInput);
    taskCardInfo.appendChild(dueDateLabel);

    // Create priority input
    const priorityLabel = document.createElement('p');
    priorityLabel.textContent = `Priority: `;
    const prioritySelector = document.createElement('select');
    prioritySelector.name = 'priority';
    priorityLabel.appendChild(prioritySelector);
    const low = document.createElement('option');
    low.textContent = 'Low';
    low.value = 'Low';
    prioritySelector.appendChild(low);
    const medium = document.createElement('option');
    medium.textContent = 'Medium';
    medium.value = 'Medium';
    prioritySelector.appendChild(medium);
    const high = document.createElement('option');
    high.textContent = 'High';
    high.value = 'High';
    prioritySelector.appendChild(high);
    if (priority === 'Low') {
        low.selected = true;
    } else if (priority === 'Medium') {
        medium.selected = true;
    } else {
        high.selected = true;
    }
    taskCardInfo.appendChild(priorityLabel);

    // Create status selector
    const statusBar = document.createElement('div');
    statusBar.classList.add('status-bar');
    taskCard.appendChild(statusBar);

    const notStartedContainer = document.createElement('div');
    notStartedContainer.classList.add('status-option');
    statusBar.appendChild(notStartedContainer);
    const notStartedInput = document.createElement('input');
    notStartedInput.type = 'radio';
    notStartedInput.name = `task-status-${taskID}`;
    notStartedInput.id = `not-started-${taskID}`;
    notStartedInput.value = 'Not Started';
    notStartedContainer.appendChild(notStartedInput);
    const notStartedLabel = document.createElement('label');
    notStartedLabel.textContent = 'Not Started';
    notStartedLabel.htmlFor = `not-started-${taskID}`;
    notStartedLabel.classList.add('status-label');
    notStartedContainer.appendChild(notStartedLabel);

    const inProgressContainer = document.createElement('div');
    inProgressContainer.classList.add('status-option');
    statusBar.appendChild(inProgressContainer);
    const inProgressInput = document.createElement('input');
    inProgressInput.type = 'radio';
    inProgressInput.name = `task-status-${taskID}`;
    inProgressInput.id = `in-progress-${taskID}`;
    inProgressInput.value = 'In Progress';
    inProgressContainer.appendChild(inProgressInput);
    const inProgressLabel = document.createElement('label');
    inProgressLabel.textContent = 'In Progress';
    inProgressLabel.htmlFor = `in-progress-${taskID}`;
    inProgressLabel.classList.add('status-label');
    inProgressContainer.appendChild(inProgressLabel);

    const completedContainer = document.createElement('div');
    completedContainer.classList.add('status-option');
    statusBar.appendChild(completedContainer);
    const completedInput = document.createElement('input');
    completedInput.type = 'radio';
    completedInput.name = `task-status-${taskID}`;
    completedInput.id = `completed-${taskID}`;
    completedInput.value = 'Completed';
    completedContainer.appendChild(completedInput);
    const completedLabel = document.createElement('label');
    completedLabel.textContent = 'Completed';
    completedLabel.htmlFor = `completed-${taskID}`;
    completedLabel.classList.add('status-label');
    completedContainer.appendChild(completedLabel);

    if (status === 'Not Started') {
        notStartedInput.checked = true;
    } else if (status === 'In Progress') {
        inProgressInput.checked = true;
    } else {
        completedInput.checked = true;
    }

    prjCard.appendChild(taskCard);
}

export { Project, Task, processTaskForm, processProjectForm, createPrjCard, createTaskCard };