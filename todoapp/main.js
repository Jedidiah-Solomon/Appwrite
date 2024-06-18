import "./style.css";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

const DATABASE_ID = "6671c514000251b17f22";
const COLLECTION_ID_TASKS = "6671c5510023c27e553c";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6671a47a002a00f6ebd8");

const db = new Databases(client);

const tasksList = document.getElementById("tasks-list");
const form = document.getElementById("form");

form.addEventListener("submit", addTask);

getTasks();

async function getTasks() {
  const response = await db.listDocuments(DATABASE_ID, COLLECTION_ID_TASKS);

  const tasks = response.documents;

  for (let i = 0; tasks.length > i; i++) {
    renderToDom(tasks[i]);
  }
}

const renderToDom = async (task) => {
  //ADD ITEM TO DOM
  const taskWrapper = `<div class="task-wrapper" id="task-${task.$id}">
                          <p class="complete-${task.completed}">${task.body}</p>
                          <strong class="delete" id="delete-${task.$id}">x</strong>
                      </div>`;

  tasksList.insertAdjacentHTML("afterbegin", taskWrapper);

  const deleteBtn = document.getElementById(`delete-${task.$id}`);
  const wrapper = document.getElementById(`task-${task.$id}`);

  //DELETE TASK EVENT HANDLER
  deleteBtn.addEventListener("click", () => {
    db.deleteDocument(DATABASE_ID, COLLECTION_ID_TASKS, task.$id);
    wrapper.remove();
  });

  //UPDATE TASK EVENT HANDLER
  wrapper.childNodes[1].addEventListener("click", async (e) => {
    task.completed = !task.completed;
    e.target.className = `complete-${task.completed}`;

    db.updateDocument(DATABASE_ID, COLLECTION_ID_TASKS, task.$id, {
      completed: task.completed,
    });
  });
};

async function addTask(e) {
  e.preventDefault();

  const taskBody = e.target.body.value;

  if (taskBody == "") {
    alert("Form field cannot be empty, please enter a task!");
    return;
  }

  const response = await db.createDocument(
    DATABASE_ID,
    COLLECTION_ID_TASKS,
    ID.unique(),
    { body: taskBody }
  );
  renderToDom(response);
  form.reset();
}
