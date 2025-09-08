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

// Open modal and process new task form on sumbission
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

    const addTaskForm = document.querySelector('.add-task-form');

    addTaskForm.addEventListener('submit', processTaskForm);

    // Logic to close the add task modal
    const cancelTaskBtn = document.querySelector('#cancel-task');
    cancelTaskBtn.addEventListener('click', () => {
        addTaskModal.close();
    })
})



// // Logic for new task modal
// const addTaskDialog = document.querySelector('#new-task-dialog');
// const addTaskBtn = document.querySelector('.add-task-btn');
// addTaskBtn.addEventListener('click', () => {
//     const allProjects = Project.getAllProjects();

//     const projectSelector = document.querySelector('#projects');
//     projectSelector.replaceChildren();

//     for (const key in allProjects) {
//         const prjOption = document.createElement('option');
//         prjOption.textContent = allProjects[key]['projectName'];
//         prjOption.value = key;
//         projectSelector.appendChild(prjOption);
//     }

//     const newProject = document.createElement('option');
//     newProject.textContent = 'New Project';
//     projectSelector.appendChild(newProject);

//     addTaskDialog.showModal();

//     const newTaskForm = document.querySelector(form);
//     form.addEventListener('submit', processForm);

// })

// // Logic to close modal
// const closeModalBtn = document.querySelector('.close-dialog');
// closeModalBtn.addEventListener('click', () => {
//     addTaskDialog.close();
//     form.reset();
// })


// const newTask = new Task('test 2', '1/1/25', 'High');
// newTask.save('cc3331c0-acae-4c24-92d6-ffcf2f6e2770');

// Task.updateStatus('cc3331c0-acae-4c24-92d6-ffcf2f6e2770', 'e49cef31-656f-41f5-adb1-680389cdba75', 'In Progress')