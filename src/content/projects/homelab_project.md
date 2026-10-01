---
title: Homelab as code
summary: Turning a hand-managed home server into Ansible and Docker Compose, with service routes, DNS and documentation generated from one inventory.
date: 2026-08-13
tags: [ansible, docker, infrastructure-as-code, ci, self-hosting]
repo: https://github.com/Denis-png/homelab
status: ongoing
links:
  - label: Architecture notes
    href: https://github.com/Denis-png/homelab/blob/main/docs/architecture.md
featured: false
---

A personal project, built in public. The repository states which parts exist, and so does this page.

## Problem

My home server ran 32 containers across 11 Compose stacks, all hand-edited. It worked, but it drifted: when I started the rebuild, only 13 of the 22 service hostnames matched what the documentation claimed. Server configuration that exists only on the machine cannot be reviewed, repeated or recovered.

## Approach

- **One source of truth.** The plan is a single service inventory from which Traefik routes, DNS rewrites, monitoring targets and the documentation tables are all generated, so adding a service is one data change instead of six edits.
- **Source and runtime kept apart.** The repository is the source of truth and nothing runs from it. Ansible renders each stack's Compose file into the directory the stack already lived in, so every path on the host stays the same during the conversion.
- **Prove a change is a no-op before it is real.** Each role is dry-run against the live host with `--check --diff` and adjusted until the diff is empty, which shows the code describes reality before it is allowed to change anything.
- **A disposable test target.** New roles are developed against a throwaway Incus container running the same Ubuntu release. It has already caught a malformed apt sources file that would have broken package management on the real host, and a templating bug that would have created a user named literally `['name']`. Code review caught neither.
- **Secrets in the repository, encrypted.** SOPS with age, so a clone plus the key reproduces the host. This part is not built yet.
- **Safe by default.** The host sits behind double NAT with no public address and is reached over Tailscale, with no port forwarding. Container images are pinned by digest, and containers get health checks, resource limits and capped logs.

## Where it stands

- **Done:** the repository scaffold, CI, and secret scanning (phase 0 of nine). The Ansible foundation is under way, with an inventory for the home server and the test container, and `common`, `docker` and `ai` roles.
- **The AI stack is deployed by Ansible.** It runs a metasearch engine, a chat frontend and an agent gateway, with image digests pinned, health checks, resource limits and log caps set in the templates.
- **CI on every push:** yamllint in strict mode, ansible-lint at the production profile, and gitleaks over the full history. The latest runs on the main branch pass.

## What's next

The other stacks are still hand-managed, and converting them is the bulk of the work. The roadmap in the repository lists the remaining phases: the service inventory with generated Traefik routes, SOPS-encrypted secrets, documentation generated and checked in CI, alert routing and runbooks, and an automated disaster-recovery drill.

## How to run it

It is written for one specific machine, so it is meant to be read rather than run. The [architecture notes](https://github.com/Denis-png/homelab/blob/main/docs/architecture.md) describe the host, its storage layout and how the repository relates to what runs on it.
