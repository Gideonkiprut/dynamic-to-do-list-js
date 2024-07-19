document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    function addTask(taskText, save = true) {
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item');  // Add class to the li element

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');  // Add class to the button

        // Assign an onclick event to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTask(taskText);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li to the taskList
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';

        if (save) {
            saveTask(taskText);
        }
    }

    function saveTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add an event listener to addButton to call addTask when the button is clicked
    addButton.addEventListener('click', () => addTask(taskInput.value));

    // Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});
