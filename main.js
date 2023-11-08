function addTodo(text) {
    const todo = {
      text,
      done: false,
      id: Date.now(),
    }; //Funktion um todo Objekt zu erstellen
  
    var todos = [];
  
    
  
    todos.push(todo); //Objekte werden in ein Array gepusht
    localStorage.setItem("savedTodos", JSON.stringify(todos)); //Das Array mit den Todo Objekten wird in den LocalStorage gespeichert
    readTodos(); //Funktion um Objekte abzurufen und anzuzeigen wird aufgerufen
  
    console.log(todos);
  }
  
  const todoForm = document.getElementById("todo-form");
  const todoList = document.getElementById("todo-liste");
  
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
    const savedTodos = JSON.parse(localStorage.getItem("savedTodos")); //Gespeicherte Objekte werden aus den localStorage gefetcht
  
    savedTodos.forEach((todo) => {
      //Template für die HTML Listen-Elemente
      const todoEl = `<li class="task" id="${todo.id}"> 
          <input type="checkbox" class="task-check" id="check">
          <span id="todoname">${todo.text}</span>
              <button class="edit" id="edit">
                  Bearbeiten
              </button>
              <button class="delete" id="del">
                  Entfernen
              </button>
          </li>`;
  
      todoList.insertAdjacentHTML("beforeend", todoEl); //Element wird immer am Ende des Listenelementes eingefügt
    });
  }
  
  
  