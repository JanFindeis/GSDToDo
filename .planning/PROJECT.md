# Todo CLI

## What This Is

A Node.js command-line tool for managing to-do items locally. Users run `todo add`, `todo list`, and `todo done` to create, view, and complete tasks. Items are persisted to a `todos.json` file in the current directory. No external npm dependencies — Node built-ins only.

## Core Value

Three commands that just work: add a task, list tasks, mark one done — all backed by a local JSON file.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can add a to-do item via `todo add "text"`
- [ ] User can list all to-do items via `todo list`, with completed items shown using strikethrough text
- [ ] User can mark an item done via `todo done <id>`, keeping it visible in the list with strikethrough
- [ ] Items persist across sessions in `todos.json` in the current working directory

### Out of Scope

- Global task list (home directory) — each directory has its own todos.json
- Delete, edit, or undo commands — not in v1
- Priority, due dates, tags — not needed for v1
- External dependencies — Node built-ins only

## Context

- Greenfield CLI tool; no existing codebase
- Target runtime: Node.js (current LTS)
- Entry point will be a single executable script invoked as `todo`
- Strikethrough rendering via Unicode combining characters (`̶`) since no terminal library

## Constraints

- **Tech stack**: Node.js built-ins only — no npm dependencies
- **Storage**: `todos.json` in the current working directory (not global)
- **Interface**: CLI only — no web UI, no daemon

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| todos.json in current directory | Per-project task lists; simpler than global config | — Pending |
| Strikethrough display for completed items | User explicitly chose this over [x] or hiding | — Pending |
| No external deps | User requirement | — Pending |

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-25 after initialization*
