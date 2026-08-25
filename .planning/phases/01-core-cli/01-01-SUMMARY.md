---
phase: 01-core-cli
plan: "01"
subsystem: cli
status: complete
tags:
  - cli
  - file-io
  - node-builtins
  - tracer

dependency_graph:
  requires: []
  provides:
    - todo.js (entry point, add command, file I/O)
    - package.json (npm link registration)
  affects:
    - todos.json (runtime artifact, per-directory)

tech_stack:
  added:
    - Node.js built-ins: fs, path
  patterns:
    - Command dispatch via switch on process.argv
    - JSON file persistence with loadTodos/saveTodos
    - Sequential ID assignment via Math.max over existing IDs
    - Shebang entry point for npm link

key_files:
  created:
    - todo.js
    - package.json
    - .gitignore
  modified: []

decisions:
  - "D-01: npm link via package.json bin entry — registered todo as global command"
  - "D-02: Single-file entry point at project root with shebang"
  - "D-03: Output format Added [id]: text — confirmed working"
  - "D-05: TODOS_FILE = path.join(process.cwd(), 'todos.json') — per-directory storage"
  - "D-07: Zero npm dependencies — fs and path only"

metrics:
  duration_minutes: 1
  completed_date: "2026-08-25"
  tasks_completed: 1
  commits: 1

estimate:
  tokens: 28000
  tasks: 2

actuals:
  tokens: 3200
  tasks: 1
  commits: 1
---

# Phase 01 Plan 01: Core CLI Walking Skeleton — Summary

**One-liner:** Node.js CLI walking skeleton with `todo add` backed by real JSON file I/O, registered via npm link using zero external dependencies.

## What Was Built

Created the complete walking skeleton for the `todo` CLI tool:

- `todo.js`: Entry point with shebang (`#!/usr/bin/env node`), `TODOS_FILE` constant anchored to `process.cwd()`, `loadTodos()`/`saveTodos()` for JSON persistence, `cmdAdd()` implementing the `Added [id]: text` confirmation format, and command dispatch switch with stderr error + exit(1) for unknown commands.
- `package.json`: Minimal config with `name: gsdtodo`, `version: 1.0.0`, and `bin.todo: ./todo.js` for npm link registration.
- `.gitignore`: Excludes `todos.json` (runtime artifact) from source control.

## Verification Results

All acceptance criteria passed:

| Check | Result |
|-------|--------|
| `node todo.js add "buy milk"` → `Added [1]: buy milk` | PASS |
| `todos.json` created with `[{"id":1,"text":"buy milk","done":false}]` | PASS |
| Second add → `Added [2]: write tests`, two items in file | PASS |
| `node todo.js unknowncmd` → stderr + exit code 1 | PASS |
| `npm link` succeeds | PASS |
| `todo add "linked test"` → `Added [3]: linked test` | PASS |

## Deviations from Plan

### Auto-added Critical Functionality

**1. [Rule 2 - Missing] Added .gitignore for todos.json**
- **Found during:** Task implementation
- **Issue:** `todos.json` is a runtime artifact that appears as untracked after running the verify steps. Without `.gitignore`, it would be accidentally committed.
- **Fix:** Created `.gitignore` at project root with `todos.json` entry.
- **Files modified:** `.gitignore` (new)
- **Commit:** 26ef239

All other aspects executed exactly as planned.

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 26ef239 | feat | scaffold todo.js and package.json with working add command |

## Self-Check

- [x] `todo.js` exists at project root
- [x] `package.json` exists with `bin.todo` entry
- [x] `.gitignore` excludes `todos.json`
- [x] Commit 26ef239 verified in git log

## Self-Check: PASSED
