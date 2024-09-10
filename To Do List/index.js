document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTasksList();
        updatestatus();
    }
})

let tasks = [];

const progressBar = document.getElementById('progress');
progressBar.style.width = '0%';

const saveTasks = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask =()=> {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    if(text && dueDate){
        tasks.push({ text: text, completed: false, priority: priority, dueDate: dueDate });
        updateTasksList();
        taskInput.value = '';
        prioritySelect.value = 'low';
        dueDateInput.value = '';
        updatestatus();
        saveTasks();
    }
};

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updatestatus();
    saveTasks();
};

const deleteTask = (index) =>{
    tasks.splice(index,1);
    updateTasksList();
    updatestatus();
    saveTasks();
};

const editTask = (index) =>{
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById('prioritySelect');
    const dueDateInput = document.getElementById('dueDateInput');
    taskInput.value = tasks[index].text;
    prioritySelect.value = tasks[index].priority;
    dueDateInput.value = tasks[index].dueDate;
    tasks.splice(index,1);
    updateTasksList();
    updatestatus();
    saveTasks();
};

const updatestatus = ()=>{
    const completedTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
    const progress = (totalTasks === 0) ? 0 : (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById('number').innerHTML = `${completedTasks} / ${totalTasks}`
};

const updateTasksList = ()=>{
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = "";
        
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
        
        listItem.innerHTML = `
            <div class="taskItem ${task.priority}">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                    <span class="priorityLabel">[${task.priority.toUpperCase()}]</span>
                    <span class="dueDateLabel">Due: ${task.dueDate}</span>
                </div>
                <div class="icons">
                    <img src="./image/edit.png" onclick="editTask(${index})" />
                    <img src="./image/delete.png" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
}
document.getElementById('ntask').addEventListener('click',function(e){
    e.preventDefault();
    addTask();
})