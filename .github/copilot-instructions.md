# Copilot / AI Agent Instructions for Inorta CMS

Purpose: Give AI coding agents concise, actionable, and repo-specific guidance so they can be immediately productive when authoring code, tests, migrations and docs in this monorepo.

---

## Quick architecture summary
- Monorepo with two apps:
  - `apps/backend` — FastAPI + SQLAlchemy (ORM), Pydantic v2 for schemas, Alembic for migrations (entry: `src/inorta_backend/main.py`). API is mounted under `/api`.
  - `apps/cms-react` — Vite + React + TypeScript + Tailwind CSS frontend (entry: `src/main.tsx`). Uses `axios` and service modules under `src/services/`.
- Backend pattern: thin `api/routes.py` → service classes in `services/` (e.g., `UserService`) → models in `models/` and schemas in `schemas/`.
- Tests use pytest and override `get_db` with an in-memory/SQLite test DB (see `src/inorta_backend/tests/test_api.py`).

## Key conventions & patterns (do these, not alternatives)
- Service classes are static-method containers (e.g. `UserService`) and perform DB commits/refreshes. Add new CRUDs in `services/` following this shape.
- Routes sometimes import services dynamically using `__import__` and use string `response_model` qualifiers to avoid circular imports (see `api/routes.py`). Preserve that pattern when adding related endpoints.
- Settings use Pydantic v2 (`pydantic_settings.BaseSettings`) and read `.env` (see `core/config.py`). Use env var names like `DATABASE_URL` / `DATABASE_URL` (case-insensitive mapping).
- DB session: `get_db()` dependency yields `Session` from `db/session.py`. Tests override this via `app.dependency_overrides`.
- Use Alembic for migrations located in `alembic/` and include `alembic revision --autogenerate -m "msg"` then `alembic upgrade head` when models change.
- Frontend: env variable `VITE_API_URL` (from `.env`) points to backend; admin UI routes live under `/admin` and demo login uses `localStorage` token (see `src/pages/Login.tsx`).

## How to run & test (developer commands)
- Backend (dev):
  - cp `.env.example` -> `.env` and set DB URL
  - Install/Run: `cd apps/backend && pip install -e .`
  - Migrate: `alembic upgrade head`
  - Run server: `uvicorn inorta_backend.main:app --reload --host 0.0.0.0 --port 8000`
  - Interactive API docs: `http://localhost:8000/docs`
- Backend tests & quality checks:
  - `pip install -e '.[dev]'`
  - `pytest` (tests create/drop an SQLite test DB automatically)
  - `black src/` (format), `ruff check src/` (lint), `mypy src/` (types)
- Frontend:
  - `cd apps/cms-react && npm install && cp .env.example .env` (set `VITE_API_URL`)
  - `npm run dev` (open http://localhost:3000)
  - `npm run build` / `npm run preview`
  - `npm run lint` and `npm run type-check` for CI / PR checks

## Adding features or fixes — practical checklist for agents
1. Update/extend `models/`, `schemas/` and create/augment a `Service` in `services/`.
2. Add routes to `api/routes.py`. If your new route imports a schema/service that creates a circular import, use the repo's dynamic pattern (string `response_model` or `__import__` usage) as a pragmatic workaround—document why you did so in your PR.
3. Add tests in `src/inorta_backend/tests/` that use the existing `override_get_db` pattern and table lifecycle fixture.
4. If models changed, run `alembic revision --autogenerate -m "describe"` then `alembic upgrade head` and include the migration file in the PR.
5. Run `pytest`, `black`, `ruff`, and `mypy` locally and ensure CI passes.

## Common pitfalls & notes
- The project uses Pydantic v2; use `model_dump()` / `model_validate()` instead of v1 APIs.
- Routes may use string-qualified model names (`"inorta_backend.schemas.tag.TagResponse"`) — keep this form for lazy evaluation.
- CORS is currently permissive (`allow_origins=['*']`) — mention this in security-related PRs.
- Tests rely on `app.dependency_overrides` to swap DB. Keep the fixture style consistent to avoid cross-test interference.

## Where to look for examples
- Backend CRUD + tests: `apps/backend/src/inorta_backend/services/user_service.py` and `apps/backend/src/inorta_backend/tests/test_api.py` (create/read/update/delete flow)
- Dynamic import / circular import examples: `apps/backend/src/inorta_backend/api/routes.py` (categories/tags use `__import__`)
- Frontend services + API usage: `apps/cms-react/src/services/api.ts` and `apps/cms-react/src/services/userService.ts`
- Config & env: `apps/backend/src/inorta_backend/core/config.py` and `apps/cms-react/.env.example`

## PR checklist for AI agents
- Code compiles & tests pass locally
- Add/adjust migrations when models change
- Add tests that demonstrate the fix/feature
- Run linters & formatters (Black, Ruff, ESLint, TypeScript checks)
- Keep commit messages and PR title concise and reference related issue

---

If anything in this file is unclear or you want more coverage (e.g., detailed test patterns, CI steps, or example migrations), tell me what to add and I’ll iterate.  

(Generated with a quick scan of `apps/backend` & `apps/cms-react`.)