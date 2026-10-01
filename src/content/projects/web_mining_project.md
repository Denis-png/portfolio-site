---
title: Wine recommendation on 21M ratings
summary: Classical, hybrid and graph-based recommenders compared on the X-Wines dataset, including cold-start users and wines.
date: 2025-05-25
tags: [recommender-systems, pytorch-geometric, lightgbm, graph-neural-networks]
repo: https://github.com/Frederik-Roeckle/xwines_recom
report: /Web_Mining_Project_Report_Group_5.pdf
featured: true
---

University of Mannheim, Web Mining course. A team of five.

## Problem

Recommend wines to users from their past ratings and wine attributes, and predict the rating a user would give. The X-Wines dataset has 21 million ratings from 1 million users on 100,000 wines. It has no train/test split and no information about the users, and most users have rated very few wines, which makes cold start the central difficulty.

## Approach

- **A test set we designed ourselves.** Ratings were split chronologically, so models only predict the future from the past. We built four test segments, from known or new users crossed with known or new wines. With no user metadata, a "cold" user is one with only two ratings in training. Similarity of rating distributions across segments was checked with Earth Mover's Distance and Jensen-Shannon divergence.
- **Models.** A mean-rating baseline; SVD matrix factorisation; a content-based recommender using TF-IDF on grapes and food pairings plus hashed regions; a hybrid that combines collaborative and content features, in three variants built on SVD, LightGBM and XGBoost; GraphSAGE, a graph neural network over the user-wine graph; and LightGCN as a coarse first stage in a two-stage retrieval proof of concept over the full catalogue.
- **Evaluation.** RMSE with bootstrapped means (10,000 resamples), nine-class classification by rounding ratings, and top-k ranking metrics. The graph models trained on L4 and A100 GPUs on Google Colab Pro.

## Results

RMSE for rating prediction on the full test set, lower is better:

| Model | RMSE |
| --- | --- |
| SVD hybrid | 0.5891 |
| XGBoost hybrid | 0.6315 |
| LightGBM hybrid | 0.6350 |
| Mean-rating baseline | 0.7016 |
| GraphSAGE | 0.7416 |
| Content-based | 0.8556 |

- **The hybrids beat the baseline on the full test set.** The SVD hybrid was best on it and in three of the four segments; LightGBM was slightly better for new users with new wines (0.7659 against 0.7735), where the XGBoost hybrid fell behind the baseline. The content-based and GraphSAGE models mostly did not beat the baseline, especially in cold start.
- **Every model dropped significantly on cold-start users and wines.** The ratings also drift upward over time, which explains part of the gap between training and test distributions.
- **The two-stage graph pipeline reached a Recall@20 of 0.0214.** It is a proof of concept and not comparable with the other models, which were evaluated differently.

## What I'd do differently

- Tune the graph models. GraphSAGE trained for only ten epochs with no hyperparameter search, because of compute cost and time, so its weak result says little about the method.
- Train LightGCN with Bayesian Personalized Ranking instead of binary loss.
- Evaluate ranking over the full catalogue. Our ranked-list metric only ranks wines each user is known to have rated, which flatters every model.
- Stratify the test segments by number of users and wines per segment. In two cold segments each user rates about one wine, so recall hits 1.0 by chance.
- Run a feature ablation on the wine metadata.

## How to run it

The code and instructions are in the [project repository](https://github.com/Frederik-Roeckle/xwines_recom). The dataset is public and comes from the [X-Wines project](https://github.com/rogerioxavier/X-Wines).
