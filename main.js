const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-liste");

const todos = [];

readTodos();

function addTodo(text) {
  const todo = {
    text,
    isDone: false,
    id: Date.now(),
  }; //Funktion um todo Objekt zu erstellen

  todos.push(todo); //Objekte werden in ein Array gepusht
  writeToLocalStorage(todos); //Objekte im LocalSotrage speichern
  readTodos(); //Funktion um Objekte abzurufen und anzuzeigen wird aufgerufen
}

function writeToLocalStorage(todos) {
  localStorage.setItem("savedTodos", JSON.stringify(todos)); //Das Array mit den Todo Objekten wird in den LocalStorage gespeichert
  readTodos();
}

function deleteFromLocalStorage(todoId) {
  const indexToDel = todos.findIndex((todo) => todo.id === todoId); //Index des Todos im Array wird gespeichert
  todos.splice(indexToDel, 1); //Todo wird aus dem Array gelöscht
  writeToLocalStorage(todos); // Funktion um Änderungen im LocalStorage zu speichern wird aufgerufen
  readTodos(); //Funktion um die geänderte Todos zu zeigen wird aufgerufen
}

function checkTask(todoId) {
  const indexToCheck = todos.findIndex((todo) => todo.id === todoId); //Index des Todos im Array wird gespeichert
  todos[indexToCheck].isDone = !todos[indexToCheck].isDone; //Objekt Attribut isDone wird geändert
  writeToLocalStorage(todos); // Funktion um Änderungen im LocalStorage zu speichern wird aufgerufen
  readTodos(); //Funktion um die geänderte Todos zu zeigen wird aufgerufen
}

function editTask(todoId) {
  const indexToEdit = todos.findIndex((todo) => todo.id === todoId); //Index des Todos im Array wird gespeichert
  const newTitle = prompt(
    "Geben Sie bitte einen gültigen Titel ein: ",
    todos[indexToEdit].text //Prompt mit Texteingabe wird angezeigt und in Variable gespeichert
  );
  if (newTitle !== "") {
    //Check ob die Eingabe leer ist
    todos[indexToEdit].text = newTitle; //Text Attribut des Todo Objektes wird geändert
    writeToLocalStorage(todos); // Funktion um Änderungen im LocalStorage zu speichern wird aufgerufen
    readTodos(); //Funktion um die geänderte Todos zu zeigen wird aufgerufen
  } else {
    alert("Bitte gib einen gültigen Titel ein"); //Meldung falls die EIngabe leer war
  }
}

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("todo-titel");
  const text = input.value.trim(); //Input wird von Whitespaces bereinigt

  if (text !== "") {
    //Abfrage ob der Input einen Inhalt hat
    addTodo(text); //Aufruf der Funktion um das todo Objekt zu erstellen
    input.value = ""; //Leerung des Inputs
  }
});

function readTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("savedTodos"));
  todos = [];
  if (savedTodos !== null) {
    todos.push(...savedTodos); //Array wird in todos gespreadet

    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const todoEl = document.createElement("li"); //Listenelement wird erstellt
      todoEl.className = "task"; //Vergabe der Klasse für das Listen Element
      todoEl.id = todo.id; //Vergabe der ID für das Listenelement
      //HTML Skelet für das Todo Objekt
      todoEl.innerHTML = `  
        <input type="checkbox" class="task-check" ${todo.isDone ? "checked" : ""}>
        <span id="todoname" class=" ${todo.isDone ? "checked" : ""}" >${
        todo.text
      }</span>
        <button class="edit" style="background-color:#007bff !important;">Bearbeiten</button>
        <button class="delete" style="background-color:#dc3545 !important;">Entfernen</button>
      `;
      //Eventlistener für den Delete-Button
      todoEl.querySelector(".delete").addEventListener("click", () => {        
        deleteFromLocalStorage(todo.id);
      });

      todoEl.querySelector(".task-check").addEventListener("click", () => {
        checkTask(todo.id);
      });

      todoEl.querySelector(".edit").addEventListener("click", () => {
        editTask(todo.id);
      });

      todoList.appendChild(todoEl); //Todo Element wird im HTML hinzugefügt
    });
  }
}
