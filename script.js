const input = document.querySelector("#todo-input");
const button = document.querySelector("#add-todo-btn");
const list = document.querySelector("#todo-list");

let todos = [];

const addTodo = () => {
    const text = input.value;
    if (text === "") return;
    todos.push(text);
    input.value = "";
    renderTodos();
}

button.addEventListener("click", addTodo);

const renderTodos = () => {
    list.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = todo;
        list.appendChild(li);
    });
}

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});