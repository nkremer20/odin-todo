import './styles.css';
import { homeScreen } from './home-screen';
import { Project, Task, processForm, createPrjCard, createTaskCard } from './tasks';

// Load projects and tasks when page loads
window.onload = () => {
    const projects = Project.getAllProjects();

    for (let prjID in projects) {
        const project = projects[prjID];

        createPrjCard(prjID, project['projectName'])

        for (let taskID in project['tasks']) {
            const task = project['tasks'][taskID];

            console.log(task['taskName']);

            createTaskCard(prjID, taskID, task['taskName'], task['dueDate'], task['status'], task['priority'])
        }
    }
}

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