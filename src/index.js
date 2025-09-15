import './styles.css';
import { homeScreen } from './home-screen';
import { Project, Task, processTaskForm, processProjectForm, createPrjCard, createTaskCard } from './tasks';

// Load projects and tasks when page loads
let projects = Project.getAllProjects();

for (let prjID in projects) {
    const project = projects[prjID];

    createPrjCard(prjID, project['projectName'])

    for (let taskID in project['tasks']) {
        const task = project['tasks'][taskID];

        createTaskCard(prjID, taskID, task['taskName'], task['dueDate'], task['status'], task['priority'])
    }
}

// Delete project
let prjDeleteBtns = document.querySelectorAll('.delete-prj-button');

prjDeleteBtns.forEach(prjDeleteBtn => {
    prjDeleteBtn.addEventListener('click', () => {
        const prjCard = prjDeleteBtn.parentNode.parentNode;
        const prjID = prjCard.id;

        // Delete project from localStorage
        Project.delete(prjID);

        // Remove card from DOM
        const deletedCard = document.getElementById(prjID);
        deletedCard.remove();

        prjDeleteBtns = document.querySelectorAll('.delete-prj-button');
    })
})

// TODO: Update project name
let prjCards = document.querySelectorAll('.prj-card');
console.log(prjCards)

// Delete task
let taskDeleteBtns = document.querySelectorAll('.delete-task-btn');
console.log(taskDeleteBtns)

taskDeleteBtns.forEach(taskDeleteBtn => {
    taskDeleteBtn.addEventListener('click', () => {
        const taskCard = taskDeleteBtn.parentNode.parentNode;
        const taskCardID = taskCard.id;
        
        const prjCard = taskDeleteBtn.parentNode.parentNode.parentNode;
        const prjCardID = prjCard.id;

        // Delete task from localStorage
        Task.delete(prjCardID, taskCardID);

        // Remove card from DOM
        const deletedCard = document.getElementById(taskCardID);
        deletedCard.remove();

        taskDeleteBtns = document.querySelectorAll('.delete-task-btn');
    })
})

// TODO: Update task name

// TODO: Update task due date

// TODO: Update task priority

// TODO: Update task status

// Open new task modal and process new task form on sumbission
const addTaskModal = document.querySelector('.add-task-modal');
const addTaskForm = document.querySelector('.add-task-form');
const addTaskBtn = document.querySelector('.add-task-btn');

addTaskBtn.addEventListener('click', () => {
    const projects = Project.getAllProjects();

    const projectSelector = document.querySelector('#project');
    projectSelector.replaceChildren();
    for (const key in projects) {
        const prjOption = document.createElement('option');
        prjOption.textContent = projects[key]['projectName'];
        prjOption.value = key;
        projectSelector.appendChild(prjOption);
    }

    addTaskModal.showModal();

    addTaskForm.addEventListener('submit', processTaskForm);

    // Logic to close the add task modal
    const cancelTaskBtn = document.querySelector('#cancel-task');
    cancelTaskBtn.addEventListener('click', () => {
        addTaskModal.close();
    })

    // TODO: Update task delete button query selector when new task is created
})

// Open new project modal and process new project form on sumbission
const addProjectModal = document.querySelector('.add-project-modal');
const addProjectForm = document.querySelector('.add-project-form');
const addProjectBtn = document.querySelector('.add-project-btn');

addProjectBtn.addEventListener('click', () => {

    addProjectModal.showModal();

    addProjectForm.addEventListener('submit', processProjectForm);

    // Logic to close the add project modal
    const cancelProjectBtn = document.querySelector('#cancel-project');
    cancelProjectBtn.addEventListener('click', () => {
        addProjectModal.close();
    })

    // TODO: Update project delete button query selector when new project is created
})