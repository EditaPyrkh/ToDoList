const tasks = [
    {
      _id: '5d2ca9e2e03d40b326596aa7',
      completed: true,
      body:
        'Book a room at Alia Hotel',
      title: 'Tomorrow till 10a.m.',
    },
    {
      _id: '5d2ca9e29c8a94095c1288e0',
      completed: false,
      body:
        'Post two new stories!!',
      title:
        'IG',
    },
];

(function(arrOfTasks) {
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
      acc[task._id] = task;
      return acc;
    }, {});
  
    const listContainer = document.querySelector(
      '.tasks-list-section .list-group',
    );
    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
  
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeletehandler );
  
    function renderAllTasks(tasksList) {
      if (!tasksList) {
        console.error('Add tasks!');
        return;
      }
  
      const fragment = document.createDocumentFragment();
      Object.values(tasksList).forEach(task => {
        const li = listItemTemplate(task);
        fragment.appendChild(li);
      });
      listContainer.appendChild(fragment);
    }
  
    function listItemTemplate({ _id, title, body } = {}) {
      const li = document.createElement('li');
      li.setAttribute('data-task-id', _id);
  
      const span = document.createElement('span');
      span.textContent = title;
      span.style.fontWeight = 'bold';
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
  
      const article = document.createElement('p');
      article.textContent = body;
      
  
      li.appendChild(span);
      li.appendChild(deleteBtn);
      li.appendChild(article);
  
      return li;
    }
  
    function onFormSubmitHandler(e) {
      e.preventDefault();
      const titleValue = inputTitle.value;
      const bodyValue = inputBody.value;
  
      if (!titleValue || !bodyValue) {
        alert('Please add text!');
        return;
      }
  
      const task = createNewTask(titleValue, bodyValue);
      const listItem = listItemTemplate(task);
      listContainer.insertAdjacentElement('afterbegin', listItem);
      form.reset();
    }
  
    function createNewTask(title, body) {
      const newTask = {
        title,
        body,
        completed: false,
        _id: `task-${Math.random()}`,
      };
  
      objOfTasks[newTask._id] = newTask;
  
      return { ...newTask };
    }
  
    function deleteTask(id) {
      const { title } = objOfTasks[id];
      const isConfirm = confirm(`You sure want to delete this task: ${title}?`);
      if (!isConfirm) return isConfirm;
      delete objOfTasks[id];
      return isConfirm;
    }
  
    function deleteTaskFromHtml(confirmed, el) {
      if (!confirmed) return;
      el.remove();
    }
  
    function onDeletehandler({ target }) {
      if (target.classList.contains('delete-btn')) {
        const parent = target.closest('[data-task-id]');
        const id = parent.dataset.taskId;
        const confirmed = deleteTask(id);
        deleteTaskFromHtml(confirmed, parent);
      }
    }
  
})(tasks);
  