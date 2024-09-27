// Define an array to store the tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
}

// Function to render the tasks on the page
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" onchange="toggleTaskDone(${task.id})" ${task.done ? 'checked' : ''}>
      <span>${task.text}</span>
      <button onclick="removeTask(${task.id})">Remove</button>
    `;
    taskList.appendChild(li);
  });
}

// Function to toggle the status of a task (done or not)
function toggleTaskDone(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  renderTasks();
}

// Function to remove a task
function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Render initial tasks
renderTasks();
