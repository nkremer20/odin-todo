import './styles.css';
import { homeScreen } from './home-screen';
import { Project, Task, processTaskForm, createPrjCard, createTaskCard } from './tasks';

// Load projects and tasks when page loads
window.onload = () => {
    const projects = Project.getAllProjects();

    for (let prjID in projects) {
        const project = projects[prjID];

        createPrjCard(prjID, project['projectName'])

        for (let taskID in project['tasks']) {
            const task = project['tasks'][taskID];

            createTaskCard(prjID, taskID, task['taskName'], task['dueDate'], task['status'], task['priority'])
        }
    }
}

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

    // addProjectForm.addEventListener('submit', processProjectForm);

    // Logic to close the add project modal
    const cancelProjectBtn = document.querySelector('#cancel-project');
    cancelProjectBtn.addEventListener('click', () => {
        addProjectModal.close();
    })
})