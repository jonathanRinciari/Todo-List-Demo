const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const statuses = {
  active: 'active',
  complete: 'complete',
  archived: 'archived'
}

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  { id: 1, text: 'Hello, world!', status: statuses.active },
  { id: 2, text: 'Pick up groceries', status: statuses.complete, archive: true}
];

app.get('/', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;
  res.render('index', { bundle });
});

app.get('/todos', (req, res) => {
  res.json(JSON.stringify(todos));
});

app.get('/todos/complete', (req, res) => {
  todos = todos.map((todo) => {
    todo.status = statuses.complete;
    return todo;
  });
  res.status(200).json(JSON.stringify(todos));
});

app.get('/todos/archive', (req, res) => {
  todos = todos.map((todo) => {
   if (todo.status === 'complete') {
     todo.archive = true;
   }
    return todo;
  });
  res.status(200).json(JSON.stringify(todos));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => {
    return todo.id === id;
  });

  res.json(JSON.stringify(todos[index]));
});

app.post('/todos', (req, res) => {
  const text = req.body.data.text;

  if (!text) {
    res.status(400).json({ message: 'text is required' });
    return;
  }

  const id = todos.length + 1;
  const newTodo = { id, text, status: statuses.active };

  todos.push(newTodo);

  res.status(201).json(JSON.stringify(todos));
});

app.delete('/todos/:id', (req, res) => {
  const id = JSON.parse(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  const deletedTodo = todos[index];
  if (index === -1) {
    res.status(400).json({message: 'Todo not found'});
    return;
  }

  todos.splice(index, 1);
  res.status(200).json(JSON.stringify(deletedTodo));
});

app.put('/todos/:id', (req, res) => {
  const id = JSON.parse(req.params.id);
  const todo = req.body.data;
  const index = todos.findIndex((todo) => todo.id === id);
  if(index === -1 | !todo) {
    res.status(400).json({message: 'Todo not found'});
    return;
  }

  todos.splice(index, 1, todo);
  res.status(200).json(JSON.stringify(todo));
});

// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {
  console.log('Application Started')
});
