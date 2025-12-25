const input = document.querySelector("#todo-input");
const button = document.querySelector("#add-todo-btn");
const list = document.querySelector("#todo-list");

let todos = [];

const addTodo = () => {
    const text = input.value;
    if (text === "") return;
    todos.push({
        text: text,
        completed: false
    });

    input.value = "";
    renderTodos();
}

button.addEventListener("click", addTodo);

const renderTodos = () => {
    list.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo;
        if (todo.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }
        li.addEventListener("click", () => {
            todo.completed = !todo.completed;
            renderTodos();
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            todos.splice(index, 1);
            renderTodos();
        });
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});