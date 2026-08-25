# Phase 1: Core CLI - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-25
**Phase:** 1-Core CLI
**Areas discussed:** CLI invocation, Command feedback

---

## CLI Invocation

| Option | Description | Selected |
|--------|-------------|----------|
| npm link | Add `package.json` with `bin` field, run `npm link` once, `todo` works from any directory | ✓ |
| node todo.js | Users run `node todo.js add "text"` from the project directory — no install step | |

**User's choice:** npm link (Recommended)
**Notes:** Entry point (`todo.js`) lives at the project root, not `src/index.js`. Shebang `#!/usr/bin/env node` included.

---

## Command Feedback

### `todo add` confirmation

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — show the added item | Print `Added [1]: buy milk` so user sees the new ID immediately | ✓ |
| Silent | Exit without output on success (Unix-tool style) | |

**User's choice:** Yes — show the added item (Recommended)

### `todo done` confirmation

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — confirm the completed item | Print `Done: buy milk` so user sees what was marked done | ✓ |
| Silent | Exit without output on success | |

**User's choice:** Yes — confirm the completed item (Recommended)

### Confirmation format for `todo add`

| Option | Description | Selected |
|--------|-------------|----------|
| Added [1]: buy milk | ID in brackets first, then text — matches list display style | ✓ |
| Added: buy milk (id: 1) | More readable English, ID at end | |
| You decide | Let planner pick the cleanest format | |

**User's choice:** `Added [1]: buy milk` format

---

## Claude's Discretion

- File structure (single-file vs. modular layout) — user skipped this area
- List output format (ID style, spacing in `todo list`) — user skipped this area
- JSON schema for `todos.json` — planner decides
- ID assignment strategy — planner decides

## Deferred Ideas

None — discussion stayed within phase scope.
