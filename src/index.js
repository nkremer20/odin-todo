import './styles.css';
import { homeScreen } from './home-screen';
import { Project } from './tasks';

// Logic for new task modal
const addTaskDialog = document.querySelector('#new-task-dialog');
const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', () => {
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
