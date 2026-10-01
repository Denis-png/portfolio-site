---
title: BreathIn v2
summary: A rework of my bachelor-thesis air-quality application, starting with a cleaner structure for the data pipeline and a containerised database.
date: 2026-07-07
tags: [python, postgresql, docker, uv, air-quality]
repo: https://github.com/Denis-png/breathin_v2
status: planned
featured: false
---

## Problem

[BreathIn](/projects/breathin_project/) collects near-live air-pollution measurements for Czech cities and tells residents how today's air compares with each city's own history. I wrote it as a bachelor thesis in 2022. It works, but it shows its age: no automated tests, a database set up by hand, and a pipeline whose stages are separate scripts rather than a package.

## Where it stands

The rework is at the start. The repository holds a clean skeleton and the first move of existing code:

- A `uv` workspace with the data pipeline as its own package, `breathin-pipeline`, separate from the web application.
- The collection, daily and monthly aggregation, and summary code from the original, about 700 lines, moved into that package.
- PostgreSQL running as a Docker Compose service, with its credentials read from the environment instead of a file in the repository.
- A locked set of dependencies.

## Not started yet

The web application, tests and deployment have not been rebuilt, and the repository's README is still empty.
