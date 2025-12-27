const input = document.querySelector("#todo-input");
const button = document.querySelector("#add-todo-btn");
const list = document.querySelector("#todo-list");

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

    if (todos.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "Aucune tache pour le moment.";
        empty.style.fontStyle = "0.6";
        list.appendChild(empty);
        return;
    }

    todos.forEach((todo, index) => {
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
}
button.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
loadTodos();
renderTodos();