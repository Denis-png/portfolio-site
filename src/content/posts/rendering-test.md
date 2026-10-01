---
title: Rendering test
summary: Math, code and a wide table, to check how long content behaves on a phone.
date: 2026-09-20
tags: [test]
draft: true
---

Inline math such as $a^2 + b^2 = c^2$ sits in a sentence, and a display equation stands alone:

$$
\frac{\partial L}{\partial W_2} = \frac{1}{N}\, h^\top \left(\hat{y} - y\right) + \lambda W_2 + \sum_{i=1}^{N} \alpha_i \beta_i \gamma_i \delta_i \epsilon_i
$$

```python
def forward(x, w1, b1, w2, b2):
    hidden = np.maximum(0, x @ w1 + b1)  # a deliberately long line that is far wider than any phone screen so it has to scroll sideways
    return hidden @ w2 + b2
```

| a | b | c | d | e | f | g | h |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
