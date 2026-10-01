---
title: Blokus engine built with LLM coding agents
summary: A Blokus game engine with a CLI and a web GUI, built by a team of four with LLM agents, and a record of which prompting guidelines held up and which failed.
date: 2026-05-25
tags: [software-engineering, llm-agents, python, hexagonal-architecture, testing]
repo: https://github.com/ivbeck/gse-project-impl
links:
  - label: Coding guidelines
    href: https://github.com/ivbeck/gse-project
featured: true
---

University of Mannheim, Generative Software Engineering course. A team of four.

## Problem

The course asked how well published advice on LLM-assisted software engineering survives a real build. We had two jobs. First, write a guideline package for the Coding topic, five guidelines drawn from the literature and our own experiments. Second, build a Blokus game engine with LLM agents, applying other teams' guidelines for requirements, design, testing and review, and document every case where a guideline failed.

The engine had to run classic Blokus (4 players, 20×20 board), and then, as a change request late in the project, the Duo variant (2 players, 14×14 board, interior starting cells), without forking the code.

## My part

- **Architecture decision.** With Richard Plummer I wrote a three-persona prompt that takes a decision through to a validated ADR, and the ADR it produced.
- **Blokus Duo.** I designed and implemented the Duo variant end to end, test-first, from a written plan of small steps.
- **Context file.** I wrote `AGENTS.md`, the file every coding agent read first, which carried the architecture's rules into later sessions.
- **Guidelines.** I co-wrote the Coding guideline package with the rest of the team.

## Approach

- **Choosing the architecture.** The prompt forced three roles, with one named output per phase, so the model could not just rationalise its first idea. It generated three candidates and kept all of them through an eight-criterion comparison: Hexagonal scored 36, Layered 31 and Plugin 26. A critique pass then produced seven drift risks, each with a tripwire. The result was Hexagonal (ports and adapters) with Strategy, Command, Builder and Memento.
- **Tripwires as tests.** Two drift risks became real tests: a scan that fails if `Core` hard-codes the board size or player count, and a determinism test on AI move choice. The first one is what protected the Duo work.
- **Duo as data.** Duo is a config value plus one swapped scoring strategy. `Core` never mentions Duo. The saved game state carries the full config, so a restored Duo game scores identically.
- **Stack.** Python with `uv`, a FastAPI web GUI, a CLI, JSON save and load, and a deterministic AI player. CI runs ruff, a format check, mypy and pytest with a coverage gate.
- **How the code was written.** All code was written with LLM agents under test-first discipline and a human reading every diff before commit. The prompt logs are committed in the repository.

## Results

| Measure | Result |
| --- | --- |
| Tests passing | 180, up from 65 late in the first milestone |
| Line coverage | 90.7%, against a required 85% |
| CI | ruff, ruff format, mypy and pytest on every push |
| Duo rules pinned by tests | Bonus only with no squares left, ties give co-winners, AI-vs-AI games are deterministic |

- **Adding Duo cost configuration data and one strategy**, not a second engine. About 17 commits in a day.
- **A separate review step on the diff caught what passing tests missed.** Three defects in the game session, the memento and the state repository survived all 45 tests written by the same author. A later review of the Duo scoring found an inverted leaderboard from a double negation.

## What I'd do differently

Three of the guidelines we applied failed in ways worth recording:

- **Our own context file went stale.** `AGENTS.md` still said Duo was out of scope after Duo shipped, which would have made an agent refuse work already merged. A hand-written constraint needs either a test that fails when it becomes false, or deletion in the same change that invalidates it.
- **A language-neutral ADR leaked a live ambiguity.** The ADR left Java or Python open, and that copied straight into the agent context file as two toolchains. A deferred decision should be recorded as pending with an owner, and the review gate should close it before it reaches operational documents.
- **Static GUI tests proved the wrong thing.** They check that the script mentions the right symbol, not that a button is unclickable, so a green test did not prove the Duo seat limit worked. I verified the data contract with an API probe instead; a browser-level test is still missing.

## How to run it

Python 3.12 and `uv` are needed. From the [implementation repository](https://github.com/ivbeck/gse-project-impl):

```bash
uv sync
uv run pytest
uv run python -m app --gui          # web GUI at http://127.0.0.1:8000
uv run python -m app --gui --duo    # Blokus Duo
```

Without `--gui` it plays in the terminal. The [guideline package](https://github.com/ivbeck/gse-project) is in a separate repository.
