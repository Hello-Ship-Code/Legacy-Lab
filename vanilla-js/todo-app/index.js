"use strict";
const new_task = document.getElementById('new-task');
const sub_btn = document.getElementById('sub-btn');
const list_task = document.getElementById('list-task');
let savedTask = [];
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
            savedTask = parsedTasks;
        }
    }
    catch (e) {
        console.error('Error parsing tasks from localStorage', e);
    }
}
savedTask.forEach(data => display(data));
function display(savedData) {
    if (!list_task)
        return;
    let li = document.createElement('li');
    li.textContent = savedData.task;
    li.setAttribute('data-id', savedData.id);
    //delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(savedData.id);
    });
    li.addEventListener('click', () => toggleCompletion(savedData.id));
    li.appendChild(deleteBtn);
    list_task.appendChild(li);
}
function toggleCompletion(id) {
    const task = savedTask.find(task => task.id === id);
    if (task) {
        task.complete = !task.complete; // Toggle the complete flag
        localStorage.setItem('tasks', JSON.stringify(savedTask));
        // Update the UI
        const taskElement = list_task === null || list_task === void 0 ? void 0 : list_task.querySelector(`li[data-id="${id}"]`);
        console.log(taskElement === null || taskElement === void 0 ? void 0 : taskElement.textContent);
        if (taskElement) {
            // Safely set the style if taskElement is not null
            taskElement.style.textDecoration = task.complete ? 'line-through' : 'none';
        }
    }
}
sub_btn === null || sub_btn === void 0 ? void 0 : sub_btn.addEventListener('click', () => {
    if (!new_task || !list_task)
        return;
    const data = new_task.value.trim();
    if (data) {
        const taskDetails = { id: new Date().toISOString(), task: data, complete: false };
        savedTask.push(taskDetails);
        display(taskDetails);
        localStorage.setItem('tasks', JSON.stringify(savedTask));
        new_task.value = "";
    }
});
function deleteTask(id) {
    savedTask = savedTask.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(savedTask));
    const data = document.querySelector(`li[data-id="${id}"]`);
    if (data) {
        data.remove();
    }
}
