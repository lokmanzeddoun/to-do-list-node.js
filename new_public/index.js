let timeDiv = document.querySelector(".time");
let addButton = document.querySelector(".input-container button");
let doneButton = document.getElementById("done");
let undoButton = document.getElementById("undo");
let deleteButton = document.getElementById("delete");
const taskContainer = document.querySelector(".task-container");
const inputAddButton = document.getElementById("addItem");

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
getTime();

function formatTime(str) {
  return str.length === 1 ? "0" + str : str;
}
function createTask() {
  const tasks = document.querySelector(".task");
  const copiedTask = tasks.cloneNode(true);
  let inputContent = document.getElementById("addItem").value;
  copiedTask.querySelector("p").textContent = inputContent;
  inputAddButton.value = "";
  taskContainer.appendChild(copiedTask);
}
function updateTask() {
  const task = document.querySelector(".task");
  let inputContent = document.getElementById("addItem").value;
  task.querySelector("p").textContent = inputContent;
  taskContainer.classList.remove("none");
  inputAddButton.value = "";
}

addButton.addEventListener("click", updateOrCreateTask);

inputAddButton.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    updateOrCreateTask();
  }
});
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
