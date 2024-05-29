document.getElementById('AddTask').addEventListener('click', addTask);

function addTask() {
    const TaskName = document.getElementById('TaskName');
    const Task = TaskName.value.trim();

    if (Task === '') return;

    const TaskList = document.getElementById('TaskList');
    const TaskItem = document.createElement('li');

    const uniqueID = 'task-' + Date.now();
    TaskItem.setAttribute('id', uniqueID);
    TaskItem.innerHTML = Task;
    TaskList.appendChild(TaskItem);

    TaskName.value = '';

    TaskItem.addEventListener('click', () => {
        TaskItem.remove();
        saveData();
    });

    saveData();
}

function saveData() {
    const TaskList = document.getElementById('TaskList');
    localStorage.setItem('TaskListItems', TaskList.innerHTML);
}

function loadData() {
    const savedTasks = localStorage.getItem('TaskListItems');
    if (savedTasks) {
        const TaskList = document.getElementById('TaskList');
        TaskList.innerHTML = savedTasks;

        Array.from(TaskList.getElementsByTagName('li')).forEach((taskItem) => {
            taskItem.addEventListener('click', () => {
                taskItem.remove();
                saveData();
            });
        });
    }
}

window.onload = loadData;