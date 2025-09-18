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

const todoContainer = document.querySelector('.todo-container')

// Handle delete events on cards
todoContainer.addEventListener('click', (e) => {
    // Delete project
    const prjDeleteBtn = e.target.closest('.delete-prj-button');
    if (prjDeleteBtn) {
        const prjCard = prjDeleteBtn.closest('.prj-card');
        const prjCardID = prjCard.id;

        // Delete project from local storage
        Project.delete(prjCardID);

        // Remove project card from the DOM
        prjCard.remove();
        return;
    }

    // Delete task
    const taskDeleteBtn = e.target.closest('.delete-task-btn');
    if (taskDeleteBtn) {
        const prjCard = taskDeleteBtn.closest('.prj-card');
        const prjCardID = prjCard.id;
        const taskCard = taskDeleteBtn.closest('.task-card');
        const taskCardID = taskCard.id;

        // Delete task from local storage
        Task.delete(prjCardID, taskCardID);

        // Remove task card from DOM
        taskCard.remove();
        
        return;
    }
})

// Handle update events on project and tasks card text areas
todoContainer.addEventListener('focusout', (e) => {
    // Update project name
    if (e.target.matches('textarea.project-name')) {
        const textarea = e.target;
        const prjCard = textarea.closest('.prj-card');
        if (!prjCard) return;

        const prjCardID = prjCard.id;
        const newValue = textarea.value.trim();
        const oldValue = (textarea.defaultValue ?? '').trim();

        if (newValue !== oldValue) {
            if (newValue.length === 0) {
                textarea.value = textarea.defaultValue;
                return;
            }

            // Update project name in local storage
            Project.updateProjectName(prjCardID, newValue);
            textarea.defaultValue = textarea.value;
            return;
        }
    }

    // Update task name
    if (e.target.matches('textarea.task-name')) {
        const textarea = e.target;
        const prjCard = textarea.closest('.prj-card');
        const prjCardID = prjCard.id;
        const taskCard = textarea.closest('.task-card');
        const taskCardID = taskCard.id;

        const newValue = textarea.value.trim();
        const oldValue = (textarea.defaultValue ?? '').trim();

        if (newValue !== oldValue) {
            if (newValue.length === 0) {
                textarea.value = textarea.defaultValue;
                return;
            }

            // Update task name in local storage
            Task.updateName(prjCardID, taskCardID, newValue);
            textarea.defaultValue = textarea.value;
            return;
        }
    }
})

// Handle update events on task inputs
todoContainer.addEventListener('change', (e) => {
    // Update task due date
    if (e.target.matches('.due-date-input')) {
        const dueDateInput = e.target;
        const prjCard = dueDateInput.closest('.prj-card');
        const prjCardID = prjCard.id;
        const taskCard = dueDateInput.closest('.task-card');
        const taskCardID = taskCard.id;

        const newDueDate = e.target.value;
        
        // Update the task due date in local storage
        Task.updateDueDate(prjCardID, taskCardID, newDueDate);
        return;
    }

    // Update task priority
    if (e.target.matches('[name="task-priority"]')) {
        const priorityInput = e.target;
        const prjCard = priorityInput.closest('.prj-card');
        const prjCardID = prjCard.id;
        const taskCard = priorityInput.closest('.task-card');
        const taskCardID = taskCard.id;

        const newPriority = e.target.value;
        
        // Update the task priority in local storage
        Task.updatePriority(prjCardID, taskCardID, newPriority);
        return;
    }

    // Update task status
    if (e.target.matches('input[type="radio"][name^="task-status-"]')) {
        const statusInput = e.target;
        const prjCard = statusInput.closest('.prj-card');
        const prjCardID = prjCard.id;
        const taskCard = statusInput.closest('.task-card');
        const taskCardID = taskCard.id;

        const newStatus = e.target.value;
        
        // Update the task status in local storage
        Task.updateStatus(prjCardID, taskCardID, newStatus);
        return;
    }
})


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

})