const input = document.querySelector("#todo-input");
const button = document.querySelector("#add-todo-btn");
const list = document.querySelector("#todo-list");
let  currentFilter = "all";

const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filters;
        renderTodos();
    });
});

let todos = [];

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
    const data = localStorage.getItem("todos");
    if (data) {
        todos = JSON.parse(data);
    } else {
        todos = [];
    }
};

const addTodo = () => {
    const text = input.value;
    if (text === "") return;
    todos.push({
        text: text,
        completed: false
    });
    
    input.value = "";
    saveTodos();
    renderTodos();
};

button.addEventListener("click", addTodo);

const renderTodos = () => {
    list.innerHTML = "";

    let remaning = 0;

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    if (todos.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "Aucune tache pour le moment.";
        empty.style.fontStyle = "0.6";
        list.appendChild(empty);
        return;
    }

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.text;

        if (todo.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }
        li.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            todos.splice(index, 1);
            saveTodos();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    const total = todos.length;
    const remaining = todos.filter(todo => !todo.completed).length;

    counter.textContent = `${remaining} remaining / ${total} total`;

    counter.classList.remove("pulse");
    void counter.offsetWidth;
    counter.classList.add("pulse");
}
const clearCompletedBtn = document.querySelector("#clear-completed-btn");

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});

button.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
loadTodos();
renderTodos();