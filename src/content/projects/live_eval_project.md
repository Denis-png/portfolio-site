---
title: Live evaluation, with benchmarks generated fresh on every run
summary: A framework that generates new synthetic test data for each evaluation run, and an ablation study of when that data is a realistic stand-in for a real benchmark.
date: 2026-09-28
tags: [llm, evaluation, benchmark-contamination, python, ablation]
repo: https://github.com/Denis-png/live-eval
status: completed
links:
  - label: Cookbook
    href: https://github.com/Denis-png/live-eval/blob/main/docs/COOKBOOK.md
  - label: Progress reports
    href: https://github.com/Denis-png/live-eval/tree/main/docs
featured: true
---

University of Mannheim, six-month team project. A team of three.

## Problem

Models may have seen public benchmarks during training, so a good score can mean memorisation. Our framework follows a Generate, Evaluate, Trash method: it creates fresh synthetic data for every run, evaluates on it and discards it, so nothing can have been memorised. The research question is whether such data is a realistic stand-in for the real benchmark, and under which configuration.

## My part

I built most of the framework and its test suite: I authored 312 of the repository's 358 commits. That covers the pipeline, the generators, benchmark profiling, the calibration phase, the evaluators and plotting, and the taxonomy task, along with the tests (more than 1,000 test functions) and the helper scripts. The framework is about 11,000 lines of Python. 

## Approach

- **Task-based framework.** A task declares what a generated sample looks like (a corrupted sentence, a labelled message or a whole taxonomy), its evaluators and its models, and one shared pipeline does the rest. Four tasks are implemented: grammatical error correction, spam detection, sentiment analysis and taxonomy induction.
- **Four generation cells.** Every task can generate in four ways. Forward or inverse decides whether the annotation is inherited from a real example or imposed on it. Seeded or seedless decides whether a real example ever reaches the generation prompt, or whether a profile sampled from the benchmark drives generation instead.
- **Profiling and calibration.** A profile of the real benchmark (lengths, style, topics, error mix) steers seedless generation. Calibration is a separate unscored phase that measures the gap between the distribution requested and the one delivered, using Jensen-Shannon divergence, and corrects the request numerically. Keeping it outside scored runs keeps the repeated runs independent.
- **Independent stages.** Profiling, calibration, generation, scoring, plotting and cross-model comparison are separate entry points that share one on-disk format, so any stage can be re-run alone.
- **A real baseline and a judge.** Every run can be compared against the real benchmark, and an optional LLM judge filters low-quality samples and archives what it rejects.
- **Ablation design.** Four phases: all four cells per task, then calibration on the best cell, then six different generation models, then the judge. Each session repeats three runs of 150 samples, or ten whole taxonomies per run.

## Results

Generated score against the real benchmark's score, for the best cell of each task:

| Task | Best cell | Generated | Real |
| --- | --- | --- | --- |
| Grammatical error correction (ERRANT F0.5) | inverse, seeded | 0.33 | 0.23 |
| Spam detection (F1) | forward, seeded | 0.98 | 0.97 |
| Sentiment analysis (macro-F1) | inverse, seedless | 0.52 | 0.54 |
| Taxonomy induction (F1) | inverse, seedless | 0.65 | 0.82 |

- **Realism depends on the cell, and the right cell differs by task.** For spam, inheriting a real message's label gets within one point of the real benchmark. For grammatical error correction, only the seeded inverse cell comes close, while the other cells inflate scores by 0.44 to 0.56.
- **Calibration helped only a little.** Two tasks did not need it. For spam it nearly halved the divergence of the signal-count distribution (0.30 to 0.16), but the model would not write as many single-signal messages as the controller asked for, so more rounds could not help.
- **The generation model mattered most for taxonomies.** The LLM scored 0.64 F1 on taxonomies it generated itself and only 0.06 to 0.51 on those from other models. A simple lexical baseline with no model behind it showed the same ranking, so the cause is how informatively each generator names its classes, not the evaluator recognising its own style.
- **The judge removed 19% to 74% of samples**, depending on how open-ended the task is.

## What I'd do differently

- **Anonymise class names** before comparing generation models on taxonomies. As it stands that comparison measures naming style at least as much as generation quality.
- **Run the judged experiments at a larger scale.** The judged taxonomy score came from only two to five surviving taxonomies per run, so I treat it as preliminary, and the weaker sentiment classifier was scored on about 50 items.
- **Investigate the spam ceiling directly**, by loosening the requested class balance or signal mix, instead of adding calibration rounds.
- Treat calibration as a fix for a diagnosed bias, and not as a default step.

Following the report's AI-tool declaration, the code was written with Claude Code.

## How to run it

Python and an API key for at least one model provider are needed. From the [repository](https://github.com/Denis-png/live-eval), install `framework/requirements.txt`, download the spaCy model, build the benchmark files with the `scripts.benchmarks.prepare_*` scripts, copy `example.env` to `.env`, and run:

```bash
python -m framework.main --config framework/configs/gec/config.yaml
```

The [Cookbook](https://github.com/Denis-png/live-eval/blob/main/docs/COOKBOOK.md) covers every setting, the four generation cells, calibration, the judge and how to add a task.
