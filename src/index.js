import './styles.css';
import { homeScreen } from './home-screen';
import { Project, Task, processForm } from './tasks';

// Logic for new task modal
const addTaskDialog = document.querySelector('#new-task-dialog');
const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.addEventListener('click', () => {
    const allProjects = Project.getAllProjects();

    const projectSelector = document.querySelector('#projects');
    projectSelector.replaceChildren();

    for (const key in allProjects) {
        const prjOption = document.createElement('option');
        prjOption.textContent = allProjects[key]['projectName'];
        prjOption.value = key;
        projectSelector.appendChild(prjOption);
    }

    const newProject = document.createElement('option');
    newProject.textContent = 'New Project';
    projectSelector.appendChild(newProject);

    addTaskDialog.showModal();

    const newTaskForm = document.querySelector(form);
    form.addEventListener('submit', processForm);

})

// Logic to close modal
const closeModalBtn = document.querySelector('.close-dialog');
closeModalBtn.addEventListener('click', () => {
    addTaskDialog.close();
    form.reset();
})


// const newTask = new Task('test 2', '1/1/25', 'High');
// newTask.save('cc3331c0-acae-4c24-92d6-ffcf2f6e2770');

Task.delete('cc3331c0-acae-4c24-92d6-ffcf2f6e2770', '64104884-eab0-4136-803c-9f79368de47e')