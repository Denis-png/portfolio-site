---
title: Agentic web question answering, with an ablation study
summary: A multi-agent RAG system that answers factual questions from live web evidence, and what each of its eight components actually contributes.
date: 2026-05-18
tags: [llm, rag, agents, evaluation, ablation]
repo: https://github.com/ivbeck/llms-and-agents-project
report: /Report_Team_4_Question_Answering_Agent.pdf
featured: true
---

University of Mannheim, Large Language Models and Agents course. A team of five.

## Problem

Language models write fluent answers that nothing supports, especially for questions that need an exact name, date or relation. We built a system that answers from live web evidence instead of model memory, and that makes every claim traceable to a cited source. Then we measured whether the extra architecture is worth its cost.

## Approach

- **Baseline.** One pass: web search, chunking, lexical ranking, answer writer, critic. The critic only records its verdict.
- **Advanced pipeline.** A query planner splits the question into focused searches, and a HyDE agent writes a hypothetical passage to improve retrieval. Search results are chunked and ranked by BM25 and dense embeddings combined with reciprocal rank fusion, then reranked by a cross-encoder. An evidence filter and a sufficiency check decide what the answer writer may use and whether to search again. The writer cites evidence IDs, and a critic can trigger another retrieval round or a Self-RAG-style revision.
- **Ablation.** Eight components can be switched off by configuration flags. We ran each one removed, plus the baseline and the full system: ten variants. Leave-one-out was a time constraint, since all combinations would need 256 runs.
- **Evaluation.** 50 questions: 30 from SimpleQA, 10 from TriviaQA and 10 from PopQA. An LLM judge scored correctness, answer relevance and citation accuracy, and we added RAGAS metrics and latency. Predicting and scoring are separate phases that store JSONL, so any run can be re-scored. All ten variants cost about $41 including a few failed runs.

## Results

| | Baseline | Full system |
| --- | --- | --- |
| Correct answers | 74% | 74% |
| Mean latency | 60 s | 348 s |
| Context precision | 58% | 81% |

- **The full pipeline was not more accurate than the baseline**, and was about six times slower. Differences between all ten variants are within the noise of 50 questions, where one answer moves correctness by two points.
- **Only 21 of the 50 questions separate the variants.** 26 were answered correctly by every variant and 3 by none, so the effective sample is smaller than it looks.
- **The evidence filter is the clear win** on context precision, 58% to 81%, without hurting recall. The full system makes most sense when the curated evidence list is itself an output.

## What I'd do differently

- Use several hundred questions and add harder multi-hop ones. At 50 mostly single-lookup questions the components cannot show their effect.
- Replace the citation judge with human labels, or validate it on a much larger human-scored sample.
- Account for benchmark contamination. SimpleQA, PopQA and TriviaQA are old public benchmarks, so the model may answer from memory without using the evidence.
- Spread runs evenly in time. Latency was measured across a week of varying provider speed.

## How to run it

The code and setup instructions are in the [project repository](https://github.com/ivbeck/llms-and-agents-project). The system needs Tavily for web search and OpenRouter for the language models.
