let tasks = {
    todo: [],
    progress: [],
    done: []
  };
  
  function addTask(status) {
    const input = document.getElementById('new-task-input');
    const task = input.value.trim();
    if (task !== '') {
      tasks[status].push(task);
      updateTasks();
      input.value = '';
    }
  }
  
  function updateTasks() {
    const columns = ['todo', 'progress', 'done'];
    columns.forEach((status) => {
      const tasksContainer = document.getElementById(`${status}-tasks`);
      tasksContainer.innerHTML = '';
      tasks[status].forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.textContent = task;
        taskCard.addEventListener('click', () => {
          if (status === 'done') {
            tasks[status].splice(index, 1);
            updateTasks();
          }
        });
        tasksContainer.appendChild(taskCard);
      });
      document.querySelector(`.${status} .count`).textContent = tasks[status].length;
    });
  }
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
  }
  
  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const target = event.target.closest('.tasks');
    target.appendChild(document.getElementById(data));
    const status = target.id.split('-')[0];
    const task = document.getElementById(data).textContent;
    tasks[status].push(task);
    updateTasks();
  }
  
  updateTasks();
  