# Roadmap: Todo CLI

## Overview

A two-phase build: Phase 1 delivers a fully working CLI tool (add, list, done commands backed by JSON persistence), and Phase 2 hardens the user experience with error handling and empty-state feedback. Both phases together ship the complete v1 MVP.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Core CLI** - Implement add, list, and done commands with JSON persistence
- [ ] **Phase 2: UX Polish** - Add error handling and empty-state messaging

## Phase Details

### Phase 1: Core CLI
**Goal**: Users can add tasks, list them with strikethrough for completed items, and mark tasks done — all persisted to todos.json
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: CMD-01, CMD-02, CMD-03, CMD-04, STOR-01, STOR-02
**Success Criteria** (what must be TRUE):
  1. Running `todo add "buy milk"` adds the item and it appears in subsequent `todo list` output
  2. Running `todo list` shows each item with its ID and text; completed items render with strikethrough
  3. Running `todo done <id>` marks the item done and it appears with strikethrough on the next `todo list`
  4. Items added in one terminal session are still present when running `todo list` in a new session
  5. A `todos.json` file is created automatically in the current directory on the first `todo add`
**Plans**: TBD

### Phase 2: UX Polish
**Goal**: Users receive clear feedback when something goes wrong or when there is nothing to show
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: UX-01, UX-02
**Success Criteria** (what must be TRUE):
  1. Running `todo done 999` (non-existent ID) prints a helpful error message rather than crashing or silently doing nothing
  2. Running `todo list` on an empty todo list prints a friendly "no items" message rather than blank output
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Core CLI | 0/TBD | Not started | - |
| 2. UX Polish | 0/TBD | Not started | - |
