const baseUrl = `http://localhost:3001`;
let timeDiv = document.querySelector(".time");
let addButton = document.querySelector(".input-container button");
let doneButton = document.getElementById("done");
const taskContainer = document.querySelector(".task-container");
const inputAddButton = document.getElementById("addItem");
const taskForm = document.querySelector(".input-container");
async function getAllTodos() {
	try {
		const result = await fetch(`${baseUrl}/todos`);
		if (!result.ok) {
			throw new Error(`Response status: ${result.status}`);
		}
		const json = await result.json();
		return json;
	} catch (error) {
		console.error(error.message);
	}
}
async function createTodo(name) {
	try {
		const response = await fetch(`${baseUrl}/todos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // This line is important
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) {
			throw new Error(`Name Must Be Unique : ${response.status}`);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error.message);
	}
}
async function deleteTodo(id) {
	try {
		const response = await fetch(`${baseUrl}/todos/${id}`, {
			method: "DELETE",
		});
		console.log("🚀 ~ response:", response);
		if (!response.ok) {
			throw new Error(`Error Occurred Please Try Again : ${response.status}`);
		}
		return response.ok;
	} catch (error) {
		console.error(error.message);
	}
}
document.addEventListener("DOMContentLoaded", async () => {
	const todos = await getAllTodos();
	const taskTemplate = document.querySelector(".task"); // This is the template task element
	todos.map((todo) => {
		const task = document.querySelector(".task");
		task.setAttribute("data-id", todo.id);
		const copiedTask = task.cloneNode(true);
		copiedTask.querySelector("p").textContent = todo.name;
		taskContainer.appendChild(copiedTask);
	});
	taskTemplate.classList.add("none");
	const deleteButtons = document.querySelectorAll(".delete"); // Returns a NodeList
	deleteButtons.forEach((deleteButton) => {
		deleteButton.addEventListener("click", async (e) => {
			const parentTask = deleteButton.closest(".task");
			console.log(parentTask);
			const id = parentTask.getAttribute("data-id");
			const res = await deleteTodo(id);
			console.log(res);
			if (res) {
				parentTask.remove();
			}
		});
	});
});
taskForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		await createTask(e.target[0].value);
	} catch (error) {
		console.error(`can not perform this action Error Required `);
	}
});
function getTime() {
	let date = new Date();
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const day = daysOfWeek[date.getDay()];
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let time = `${formatTime(hours.toString())}:${formatTime(
		minutes.toString()
	)}`;
	timeDiv.innerHTML = `${day}
  ${time}`;
}
// setInterval(() => {
// 	getTime();
// }, 1000);

function formatTime(str) {
	return str.length === 1 ? "0" + str : str;
}
async function createTask(name) {
	console.log("🚀 ~ createTask ~ name:", name);
	const tasks = document.querySelector(".task");
	const copiedTask = tasks.cloneNode(true);
	copiedTask.classList.remove("none");
	const res = await createTodo(name);
	inputAddButton.value = "";
	if (res) {
		copiedTask.querySelector("p").textContent = name;
		taskContainer.appendChild(copiedTask);
	}
}

// async function deleteTask() {

// }
function updateTask() {
	const task = document.querySelector(".task");
	let inputContent = document.getElementById("addItem").value;
	task.querySelector("p").textContent = inputContent;
	taskContainer.classList.remove("none");
	inputAddButton.value = "";
}

// addButton.addEventListener("click", updateOrCreateTask);

// inputAddButton.addEventListener("keypress", (event) => {
// 	if (event.key === "Enter") {
// 		updateOrCreateTask();
// 	}
// });
let count = taskContainer.childElementCount;
function updateOrCreateTask() {
	let inputContent = document.getElementById("addItem").value;
	const task = document.querySelector(".task");
	if (count === 1) {
		task.querySelector("p").textContent = inputContent;
		taskContainer.classList.remove("none");
		inputAddButton.value = "";
		++count;
	} else {
		const copiedTask = task.cloneNode(true);
		copiedTask.querySelector("p").textContent = inputContent;
		inputAddButton.value = "";
		taskContainer.appendChild(copiedTask);
	}
}
