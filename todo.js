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

const [,, command, ...args] = process.argv;

switch (command) {
  case 'add':
    cmdAdd(args);
    break;
  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
