const input = document.querySelector("#todo-input");
const button = document.querySelector("#add-todo-btn");
const list = document.querySelector("#todo-list");
const counter = document.querySelector("#counter");
const clearCompletedBtn = document.querySelector("#clear-completed-btn");

let currentFilter = "all";
let todos = [];

const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filters;
        renderTodos();
    });
});

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
    const data = localStorage.getItem("todos");
    todos = data ? JSON.parse(data) : [];
};

const addTodo = () => {
    const text = input.value.trim();
    if (text === "") return;

    todos.push({
        text,
        completed: false
    });

    input.value = "";
    saveTodos();
    renderTodos();
};

const renderTodos = () => {
    list.innerHTML = "";

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    if (todos.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "Aucune taches pour le moment!";
        empty.style.opacity = "0.6";
        list.appendChild(empty);
    }

    filteredTodos.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = todo.text;

        if (todo.completed) {
            li.classList.add("completed");
            li.style.opacity = "0.6";
        }

        li.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            todos = todos.filter(t => t !== todo);
            saveTodos();
            renderTodos();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    const total = todos.length;
    const remaining = todos.filter(todo => !todo.completed).length;
    counter.textContent = `${remaining} remaining / ${total} total`;
};

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});

button.addEventListener("click", addTodo);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});

loadTodos();
renderTodos();