import './styles.css';
import { homeScreen } from './home-screen';
import { Project } from './tasks';

// Logic for new task modal
const addTaskDialog = document.querySelector('#new-task-dialog');
const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', () => {
    const allProjects = Project.getAllProjects();

    const projectSelector = document.querySelector('#projects');
    projectSelector.replaceChildren();

    for (const key in allProjects) {
        console.log(`ID: ${key} | ${allProjects[key]['projectName']}`)

        const prjOption = document.createElement('option');
        prjOption.textContent = allProjects[key]['projectName'];
        prjOption.value = allProjects[key]['projectName'];
        projectSelector.appendChild(prjOption);
    }

    

    addTaskDialog.showModal();
})

// Logic to close modal
const closeModalBtn = document.querySelector('.close-dialog');
closeModalBtn.addEventListener('click', () => {
    addTaskDialog.close();
    form.reset();
})

// // Listner to check for form new task form submission
// const form = document.querySelector('form');
// form.addEventListener('submit', processForm);

// const projects = Project.getAllProjects();

// Event listener for creating a new project

