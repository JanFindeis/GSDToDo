# Walking Skeleton — Todo CLI

**Phase:** 1
**Generated:** 2026-08-25

## Capability Proven End-to-End

A developer can run `todo add "buy milk"` in any directory and get back `Added [1]: buy milk`, with the item persisted to `todos.json` in that directory and surviving a new terminal session.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Runtime | Node.js (built-ins only) | Project constraint — no npm dependencies; `fs`, `path`, `process` are sufficient |
| Entry point | `todo.js` at project root with `#!/usr/bin/env node` shebang | Single-file simplicity; no build step; shebang enables direct execution via npm link |
| Command routing | `process.argv` switch statement | No framework needed; three commands fit a plain switch |
| Data layer | `todos.json` in `process.cwd()` | Per-directory storage; plain JSON; human-readable; no DB or library required |
| ID strategy | `max(existing ids) + 1`, stored on each item | Monotonic, survives future deletions; no separate counter file |
| Strikethrough | Unicode combining long stroke overlay U+0336 applied per character | No ANSI escape codes; no terminal library; works in any UTF-8 terminal (D-06) |
| Dev deployment | `npm link` via `bin` entry in `package.json` | Registers `todo` globally without publish; zero config; reversible with `npm unlink` |
| Directory layout | Single file: `todo.js` | No `src/` needed; Phase 2 adds only more branches to the same switch |

## Stack Touched in Phase 1

- [x] Project scaffold — `package.json` with `bin` entry, shebang in `todo.js`
- [x] Routing — command dispatch via `process.argv` switch (`add`, `list`, `done`)
- [x] Database — `loadTodos()` reads `todos.json`; `saveTodos()` writes it (real file I/O)
- [x] UI — `console.log` output for confirmations and list rendering (stdout is the UI)
- [x] Deployment — `npm link` registers `todo` globally; runnable from any directory

## Out of Scope (Deferred to Later Slices)

- Error messaging for non-existent IDs (`todo done 999`) — Phase 2 (UX-01)
- Empty-state message for `todo list` on empty list — Phase 2 (UX-02)
- Delete / clear / undo commands — v2 requirements (EXT-01, EXT-02, EXT-03)
- Global task list (`~/.todos.json`) — explicitly out of scope
- Priority, due dates, tags — not in v1
- Web UI or daemon — CLI only

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:

- Phase 2: Error handling and empty-state messaging (UX polish on top of the same `todo.js`)
