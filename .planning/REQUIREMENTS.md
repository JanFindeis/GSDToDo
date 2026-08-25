# Requirements: Todo CLI

**Defined:** 2026-08-25
**Core Value:** Three commands that just work: add a task, list tasks, mark one done — all backed by a local JSON file.

## v1 Requirements

### Core Commands

- [ ] **CMD-01**: User can add a to-do item via `todo add "text"`
- [ ] **CMD-02**: User can list all to-do items via `todo list`, with each item showing its ID and text
- [ ] **CMD-03**: Completed items appear in `todo list` with strikethrough text
- [ ] **CMD-04**: User can mark an item done via `todo done <id>`

### Storage

- [ ] **STOR-01**: Items persist across sessions in `todos.json` in the current working directory
- [ ] **STOR-02**: `todos.json` is created automatically on first `todo add`

### CLI UX

- [ ] **UX-01**: Command shows a helpful error if the item ID passed to `todo done` doesn't exist
- [ ] **UX-02**: `todo list` shows a friendly message when there are no items

## v2 Requirements

### Extended Commands

- **EXT-01**: User can delete a to-do item via `todo delete <id>`
- **EXT-02**: User can clear all completed items via `todo clear`
- **EXT-03**: User can undo the last action via `todo undo`

## Out of Scope

| Feature | Reason |
|---------|--------|
| Global task list (~/.todos.json) | User chose per-directory approach |
| External npm dependencies | User requirement — built-ins only |
| Priority, due dates, tags | Not in v1 scope |
| Delete/edit commands | Not in v1 scope |
| Web UI or daemon | CLI only |
| Sync or remote storage | Local only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CMD-01 | Phase 1 | Pending |
| CMD-02 | Phase 1 | Pending |
| CMD-03 | Phase 1 | Pending |
| CMD-04 | Phase 1 | Pending |
| STOR-01 | Phase 1 | Pending |
| STOR-02 | Phase 1 | Pending |
| UX-01 | Phase 2 | Pending |
| UX-02 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 8 total
- Mapped to phases: 8
- Unmapped: 0 ✓

---
*Requirements defined: 2026-08-25*
*Last updated: 2026-08-25 after roadmap creation*
