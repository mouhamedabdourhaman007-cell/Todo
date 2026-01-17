const input = document.querySelector("#todo-input");
const button = document.querySelector("#add-todo-btn");
const list = document.querySelector("#todo-list");
const counter = document.querySelector("#counter");
const clearCompletedBtn = document.querySelector("#clear-completed-btn");
const filterButtons = document.querySelectorAll(".filters button");

let currentFilter = "all";
let todos = [];

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
  const data = localStorage.getItem("todos");
  todos = data ? JSON.parse(data) : [];
};

const addTodo = () => {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  renderTodos();
};

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter; 

    filterButtons.forEach(b =>
      b.classList.remove("bg-white", "text-black")
    );
    btn.classList.add("bg-white", "text-black");

    renderTodos();
  });
});

const renderTodos = () => {
  list.innerHTML = "";

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "Aucune tâche pour le moment";
    empty.className = "text-center text-gray-400 mt-8";
    list.appendChild(empty);
    counter.textContent = "0 remaining / 0 total";
    return;
  }

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");

    li.className =
      "bg-[#1c1c1e] px-4 py-3 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-opacity";

    if (todo.completed) {
      li.classList.add("opacity-50", "line-through");
    }

    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "flex-1";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "text-red-500 text-lg shrink-0";

    deleteBtn.addEventListener("click", e => {
      e.stopPropagation();
      todos = todos.filter(t => t !== todo);
      saveTodos();
      renderTodos();
    });

    li.append(span, deleteBtn);
    list.appendChild(li);
  });

  const total = todos.length;
  const remaining = todos.filter(t => !t.completed).length;
  counter.textContent = `${remaining} remaining / ${total} total`;
};

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
});

button.addEventListener("click", addTodo);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTodo();
});

loadTodos();
renderTodos();