import './styles.css';
import { homeScreen } from './home-screen';
import { processForm } from './tasks';

// Logic for new task modal
const addTaskDialog = document.querySelector('#new-task-dialog');
const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', () => {
    addTaskDialog.showModal();
})

// Listner to check for form new task form submission
const form = document.querySelector('form');
form.addEventListener('submit', processForm);

