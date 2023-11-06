class Aufgabe {
    constructor(id, title, done) {
        this.id = id;
        this.title = title;
        this.done = done;
    }

    delete(id) {
        console.log(`Task with ID ${id} has been deleted.`);
    }
}

var aufgaben = [];


let todoForm = document.getElementById('todo-form');
let todoList = document.getElementById('')

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.getElementById('todo-titel');
    
    let aufgabe = new Aufgabe(Math.round(Math.random()*100000), title.value, false);

    aufgaben.push(aufgabe);

    console.log(aufgaben);

    aufgaben.forEach(aufgabe => {
        let li = document.createElement('li');

    })
    
    }
)


