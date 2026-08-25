# Phase 1: Core CLI - Context

**Gathered:** 2026-08-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement three working CLI commands (`todo add`, `todo list`, `todo done`) with JSON persistence to `todos.json` in the current working directory. The entry point is a single `todo.js` file at the project root, linked globally via `npm link`. Completed items render with strikethrough in `todo list`.

</domain>

<decisions>
## Implementation Decisions

### CLI Invocation
- **D-01:** Use `npm link` with a `package.json` `bin` entry to make `todo` runnable from any directory. — **Reversibility:** reversible — removing `npm link` just unregisters the binary; no migration needed.
- **D-02:** Entry point is `todo.js` at the project root (not `src/index.js`). The file carries a `#!/usr/bin/env node` shebang.

### Command Feedback
- **D-03:** `todo add` prints a confirmation on success: `Added [<id>]: <text>` (e.g., `Added [1]: buy milk`). User sees the new item's ID immediately so they can use it with `todo done`.
- **D-04:** `todo done <id>` prints a confirmation on success: `Done: <text>` (e.g., `Done: buy milk`).

### Carried Forward (from project setup — not re-asked)
- **D-05:** Storage: `todos.json` in the current working directory (per-directory, not global).
- **D-06:** Strikethrough in `todo list` uses Unicode combining characters applied per-character (`̶`) — no terminal library, no ANSI escape codes.
- **D-07:** No external npm dependencies — Node.js built-ins only.

### Claude's Discretion
- File structure (single-file vs. modular): user did not select this area — planner decides based on simplicity and Phase 2 extensibility.
- List output format (ID style, spacing): user did not select this area — planner picks a clean, consistent format that matches the `Added [id]: text` confirmation style.
- JSON schema for `todos.json`: planner decides the object shape (e.g., `{id, text, done}`).
- ID assignment strategy: planner decides (sequential integers, stored in JSON to survive deletions if they're added later).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — All v1 requirements (CMD-01 through CMD-04, STOR-01, STOR-02). Phase 1 covers these six requirements.
- `.planning/ROADMAP.md` — Phase 1 goal, success criteria, and dependency chain.
- `.planning/PROJECT.md` — Core value, constraints, key decisions, and out-of-scope items.

No external specs or ADRs — this is a greenfield project. All requirements are captured in the planning documents above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — completely greenfield. No existing code to reuse.

### Established Patterns
- None yet — this phase sets the conventions for the project.

### Integration Points
- `todos.json` in the current working directory is the sole integration point between commands. Each command reads and/or writes this file.

</code_context>

<specifics>
## Specific Ideas

- The `Added [1]: buy milk` confirmation format was explicitly chosen — ID in brackets, colon separator, then text. The `todo list` display format should mirror this style for consistency.
- Strikethrough is Unicode combining characters, not ANSI — this was an explicit project decision, not an implementation choice.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Core CLI*
*Context gathered: 2026-08-25*
