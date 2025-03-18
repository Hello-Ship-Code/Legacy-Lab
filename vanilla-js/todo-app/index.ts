type details = {
    id: string,
    task: string,
    complete: boolean
}

const new_task = document.getElementById('new-task') as HTMLInputElement | null;
const sub_btn = document.getElementById('sub-btn') as HTMLButtonElement | null;
const list_task = document.getElementById('list-task') as HTMLUListElement | null;


let savedTask: details[] = [];
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
            savedTask = parsedTasks;
        }
    } catch (e) {
        console.error('Error parsing tasks from localStorage', e);
    }
}

savedTask.forEach(data => display(data));

function display(savedData: details):void{
    if(!list_task) return
    let li = document.createElement('li');
    li.textContent = savedData.task;
    li.setAttribute('data-id', savedData.id);
        
    //delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', (e) => { e.stopPropagation();
    deleteTask(savedData.id)});

    li.addEventListener('click',()=> toggleCompletion(savedData.id));

    li.appendChild(deleteBtn);
    list_task.appendChild(li);
}

function toggleCompletion(id: string): void {
    const task = savedTask.find(task => task.id === id);
    if (task) {
        task.complete = !task.complete; // Toggle the complete flag
        localStorage.setItem('tasks', JSON.stringify(savedTask));

        // Update the UI
        const taskElement = list_task?.querySelector(`li[data-id="${id}"]`);
        console.log(taskElement?.textContent);
        if (taskElement) {
            // Safely set the style if taskElement is not null
            (taskElement as HTMLLIElement).style.textDecoration = task.complete ? 'line-through' : 'none';
        }
    }
}


sub_btn?.addEventListener('click',()=>{
    if( !new_task || !list_task) return
    const data: string = new_task.value.trim();
    
    if(data){
        const taskDetails: details =  {id: new Date().toISOString(), task: data, complete: false}
        savedTask.push(taskDetails);
        display(taskDetails)
        localStorage.setItem('tasks',JSON.stringify(savedTask));
        new_task.value="";
    }
});

function deleteTask(id: string): void{
    savedTask =  savedTask.filter(task => task.id !== id);
    localStorage.setItem('tasks',JSON.stringify(savedTask));

    const data = document.querySelector(`li[data-id="${id}"]`);
    if(data){
        data.remove();
    }
}