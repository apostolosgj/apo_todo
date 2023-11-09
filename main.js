const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-liste");

const todos = [];

readTodos();

function addTodo(text) {
    const todo = {
      text,
      done: false,
      id: Date.now(),
    }; //Funktion um todo Objekt zu erstellen
  
    todos.push(todo); //Objekte werden in ein Array gepusht
    writeToLocalStorage(); //Objekte im LocalSotrage speichern
    readTodos(); //Funktion um Objekte abzurufen und anzuzeigen wird aufgerufen
  
    console.log(todos);
  }

function writeToLocalStorage(){
    localStorage.setItem("savedTodos", JSON.stringify(todos)); //Das Array mit den Todo Objekten wird in den LocalStorage gespeichert
    readTodos();
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
    todos.length = 0;
    todos.push(...savedTodos);
  
    todoList.innerHTML = "";
  
    todos.forEach((todo) => {
      const todoEl = document.createElement("li");
      todoEl.className = "task";
      todoEl.id = todo.id;
      todoEl.innerHTML = `
        <input type="checkbox" class="task-check" ${todo.done ? 'checked' : ''}>
        <span id="todoname" class=" ${todo.done ? 'checked' : ''}">${todo.text}</span>
        <button class="edit">Bearbeiten</button>
        <button class="delete">Entfernen</button>
      `;
  
      const deleteBtn = todoEl.querySelector('.delete');
      deleteBtn.addEventListener('click', () => {
        const todoId = todo.id;
        const indexToDel = todos.findIndex(todo => todo.id === todoId);
        todos.splice(indexToDel, 1);
        writeToLocalStorage();
        readTodos();
      });
  
      const checkBox = todoEl.querySelector('.task-check');
      checkBox.addEventListener('click', () => {
        const todoId = todo.id;
        const indexToCheck = todos.findIndex(todo => todo.id === todoId);
        todos[indexToCheck].done = !todos[indexToCheck].done;
        writeToLocalStorage();
        readTodos();
      });
  
      const editBtn = todoEl.querySelector('.edit');
      editBtn.addEventListener('click', () => {
        const todoId = todo.id;
        const indexToEdit = todos.findIndex(todo => todo.id === todoId);
        const newTitle = prompt('Bitte gib einen neuen Titel ein: ', todos[indexToEdit].text);
        if (newTitle !== '') {
          todos[indexToEdit].text = newTitle;
          writeToLocalStorage();
          readTodos();
        }else{
            alert('Bitte gib einen gültigen Titel ein')
        }
      });
  
      todoList.appendChild(todoEl);
    });
  }

  
  