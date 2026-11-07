---
title: "문라이트 30일 논문 읽기, SOML Read로 시작하기"
titleEn: "Starting the Moonlight Reading Challenge with SOML Read"
date: "2026-11-07"
category: "TL;DR"
tags: ["논문 읽기", "Moonlight", "SOML Read", "3D NAND"]
summary: "매일 논문 읽기를 시작했습니다. 같은 용량의 SSD에서 칩 수가 줄면 병렬성도 줄어들 수 있다는 SOML Read의 출발점이 기억에 남았습니다."
summaryEn: "My first reading note from the Moonlight challenge: how fewer NAND chips at the same SSD capacity can reduce chip-level parallelism."
featured: false
---

*2026.11.07 15:59 KST*

문라이트 30일 논문 읽기 챌린지를 계기로 요즘 매일 논문을 읽어보고 있습니다. 처음 읽기 시작한 논문은 ASPLOS 2019에 실린 [SOML Read: Rethinking the Read Operation Granularity of 3D NAND SSDs](https://jbk5155.github.io/publications/ASPLOS-2019.pdf)입니다.

![문라이트 논문 읽기 인증, 6일 연속 기록 | 498px | center](/images/posts/moonlight-reading-6-day-streak.png)

## 같은 512GB인데, 칩이 16개에서 8개로

논문을 읽으며 가장 기억에 남은 것은 문제의 출발점이었습니다. 2D NAND의 용량 확장 한계를 넘어서기 위해 셀을 수직으로 쌓는 3D NAND가 등장했고, 집적도가 높아지면서 칩 하나에 담을 수 있는 데이터도 많아졌습니다.

논문에서는 서로 다른 두 세대의 3D NAND SSD를 예로 듭니다. Samsung 950 Pro는 32GB 칩 16개로 512GB를 구성했는데, Samsung 960 Pro는 64GB 칩 8개로 같은 용량을 만들 수 있었습니다.

그런데 칩 수가 줄어들면 여러 칩에 요청을 나눠 동시에 처리할 수 있는 여지도 줄어듭니다. 같은 용량을 더 적은 칩으로 만들 수 있게 된 변화가 칩 수준의 병렬성 저하로 이어질 수 있습니다.

집적도가 높아졌다는 사실에서 칩 개수와 병렬성의 문제까지 이어서 생각할 수 있다는 점이 신기했습니다. 이런 변화에서도 논문의 출발점을 찾을 수 있구나 싶었습니다.

## 첫 시도로 남은 것

도입부는 재미있게 읽었는데, 본문은 생각보다 훨씬 깊은 하드웨어 수준으로 내려갔습니다. 읽다가 이번에는 다른 논문으로 넘어갔습니다.

그래도 첫 시도로 읽어보기에는 좋은 논문이었던 것 같습니다. 특히 왜 이런 연구를 시작했는지 따라가 보는 과정이 재미있었습니다. 매일 논문을 읽어보는 동안 이런 흥미로운 출발점들을 조금씩 기록해보려고 합니다.
