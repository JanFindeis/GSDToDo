#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TODOS_FILE = path.join(process.cwd(), 'todos.json');

function loadTodos() {
  if (!fs.existsSync(TODOS_FILE)) return [];
  return JSON.parse(fs.readFileSync(TODOS_FILE, 'utf8'));
}

function saveTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

function cmdAdd(args) {
  const text = args.join(' ');
  const todos = loadTodos();
  const id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  todos.push({ id, text, done: false });
  saveTodos(todos);
  console.log(`Added [${id}]: ${text}`);
}

function strikethrough(str) {
  return str.split('').map(c => c + '̶').join('');
}

function cmdList() {
  const todos = loadTodos();
  for (const t of todos) {
    const label = `[${t.id}]: ${t.text}`;
    console.log(t.done ? strikethrough(label) : label);
  }
}

function cmdDone(args) {
  const id = parseInt(args[0], 10);
  const todos = loadTodos();
  const item = todos.find(t => t.id === id);
  if (!item) {
    console.error(`No todo with id ${id}`);
    process.exit(1);
  }
  item.done = true;
  saveTodos(todos);
  console.log(`Done: ${item.text}`);
}

const [,, command, ...args] = process.argv;

switch (command) {
  case 'add':
    cmdAdd(args);
    break;
  case 'list':
    cmdList();
    break;
  case 'done':
    cmdDone(args);
    break;
  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
