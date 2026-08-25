# Phase 1: Core CLI - Pattern Map

**Mapped:** 2026-08-25
**Files analyzed:** 3 new files
**Analogs found:** 0 / 3 (greenfield project)

## File Classification

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `todo.js` | entry-point / controller | request-response (CLI args in, stdout out) | none | no analog |
| `package.json` | config | n/a | none | no analog |
| `todos.json` | data store | file-I/O (read/write JSON) | none | no analog (runtime artifact) |

## Pattern Assignments

### `todo.js` (entry-point, request-response)

**Analog:** none — greenfield. Use the patterns below, derived from Node.js CLI conventions and the decisions in CONTEXT.md.

**Shebang + imports pattern:**
```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
```

**Command dispatch pattern:**
```javascript
const [,, command, ...args] = process.argv;

switch (command) {
  case 'add':  return cmdAdd(args);
  case 'list': return cmdList();
  case 'done': return cmdDone(args);
  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
```

**JSON persistence pattern (load/save):**
```javascript
const TODOS_FILE = path.join(process.cwd(), 'todos.json');

function loadTodos() {
  if (!fs.existsSync(TODOS_FILE)) return [];
  return JSON.parse(fs.readFileSync(TODOS_FILE, 'utf8'));
}

function saveTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}
```

**Add command pattern** (D-03: `Added [<id>]: <text>`):
```javascript
function cmdAdd([...textParts]) {
  const text = textParts.join(' ');
  const todos = loadTodos();
  const id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  todos.push({ id, text, done: false });
  saveTodos(todos);
  console.log(`Added [${id}]: ${text}`);
}
```

**List command pattern with strikethrough** (D-06: Unicode combining character `̶` per character):
```javascript
function strikethrough(text) {
  return text.split('').map(c => c + '̶').join('');
}

function cmdList() {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log('No todos yet. Run: todo add "your task"');
    return;
  }
  for (const t of todos) {
    const label = t.done ? strikethrough(`[${t.id}]: ${t.text}`) : `[${t.id}]: ${t.text}`;
    console.log(label);
  }
}
```

**Done command pattern** (D-04: `Done: <text>`):
```javascript
function cmdDone([idArg]) {
  const id = parseInt(idArg, 10);
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
```

---

### `package.json` (config)

**Analog:** none — standard Node.js convention.

**Required shape:**
```json
{
  "name": "gsdtodo",
  "version": "1.0.0",
  "bin": {
    "todo": "./todo.js"
  }
}
```

Key constraint: `"bin"` entry is required for `npm link` to register the `todo` command globally (D-01).

---

### `todos.json` (runtime data, file-I/O)

**Analog:** none — runtime artifact, not committed to source.

**Schema (planner discretion from CONTEXT.md):**
```json
[
  { "id": 1, "text": "buy milk", "done": false },
  { "id": 2, "text": "write tests", "done": true }
]
```

- Array at top level for simple iteration.
- `id`: sequential integer; next ID = `max(existing ids) + 1` to survive future deletions.
- `text`: raw string as entered.
- `done`: boolean.

---

## Shared Patterns

### File path resolution
**Apply to:** all functions that read or write `todos.json`
```javascript
const TODOS_FILE = path.join(process.cwd(), 'todos.json');
```
`process.cwd()` ensures per-directory storage (D-05, STOR-01).

### Strikethrough rendering
**Apply to:** `cmdList` only
```javascript
// Unicode combining long stroke overlay (U+0336) applied per character
function strikethrough(str) {
  return str.split('').map(c => c + '̶').join('');
}
```
No ANSI, no terminal library — explicit project decision (D-06, D-07).

### Error exit
**Apply to:** `cmdDone` (invalid ID), `default` branch (unknown command)
```javascript
console.error('<message>');
process.exit(1);
```

---

## No Analog Found

All three files have no codebase analog (greenfield). The patterns above are derived from:
- Node.js built-in CLI conventions (`process.argv`, `fs`, `path`)
- Decisions locked in CONTEXT.md (D-01 through D-07)
- Requirements CMD-01 through STOR-02 in REQUIREMENTS.md

The planner should use the patterns in this file as the authoritative copy-from source.

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `todo.js` | entry-point | request-response | No existing application code in repo |
| `package.json` | config | n/a | No existing package.json with bin entry |
| `todos.json` | data store | file-I/O | Runtime artifact, not pre-existing |

## Metadata

**Analog search scope:** entire repository (`**/*.js`, `.planning/`)
**Files scanned:** 27 (all are GSD tooling hooks, not application code)
**Pattern extraction date:** 2026-08-25
