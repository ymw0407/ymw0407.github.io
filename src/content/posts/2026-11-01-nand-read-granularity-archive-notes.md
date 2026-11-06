---
rssGuid: "https://ymw0407.github.io/posts/2026-11-01-nand-read-granularity-archive-notes"
title: "[Research Archive] NAND 플래시 읽기 단위 불일치 분석과 탐색 종료 회고"
titleEn: "[Research Archive] Analyzing NAND Read Granularity Mismatch & Lessons from a Discontinued Exploration"
date: "2026-11-01"
category: "Systems & Storage"
tags: ["NAND Flash", "Storage Architecture", "Research Archive", "SSD"]
summary: "호스트 읽기 요청 크기와 NAND 플래시 센싱 단위 간의 불일치 및 잔여 데이터 재사용 가능성을 분석했던 탐색 연구의 실험 과정, 한계점, 그리고 주제를 접으며 남긴 아카이브 기록을 공유합니다."
summaryEn: "Documenting a discontinued research exploration on the mismatch between host read granularity and NAND flash sensing units, including experimental methodology, limitations, and why negative/archived results matter."
featured: true
---

## 1. 탐구 배경: 호스트 읽기 단위와 NAND 센싱 단위의 불일치

호스트 운영체제(File System / Block Layer)에서 내려오는 일반적인 작은 읽기 요청(예: 4KB 단위)과, 실제 NAND 플래시 메모리 칩 내부에서 셀 배열로부터 페이지 레지스터(Page Register / Cache Register)로 데이터를 읽어들이는 **센싱 단위(Sensing Granularity, 예: 16KB 페이지)** 사이에는 구조적인 크기 불일치가 존재합니다.

이 탐색에서는 다음과 같은 질문을 던졌습니다:

> *"호스트가 4KB만 요청했더라도 NAND 내부 페이지 레지스터에는 더 큰 단위의 데이터가 이미 센싱되어 올라오는데, 이때 버려지는 잔여 센싱 데이터(Residual Sensed Data)를 유지하고 후속 인접 요청에서 재사용할 수 있을까?"*

$$
\text{Sensing Amplification} = \frac{S_{\text{NAND\_sense}}}{S_{\text{host\_request}}}
$$

---

## 2. 분석 결과 및 주제를 접게 된 이유 (Limitations)

트레이스 기반 분석과 초기 실험을 진행하면서, 이 아이디어가 실제 일반 워크로드에서 유의미한 성능 이득이나 하드웨어적 타당성으로 이어지기 어려운 명확한 한계점들을 확인했습니다:

| 검토 항목 | 분석 내용 및 한계점 |
| :--- | :--- |
| **레지스터 점유 및 후속 명령 충돌** | 다이(Die)/플레인(Plane) 내 페이지 레지스터는 다음 읽기·프로그램 연산이 들어오면 즉시 덮어써지므로 잔여 데이터의 생존 시간(Lifetime)이 극히 짧음 |
| **호스트 페이지 캐시와의 역할 중복** | 공간 지역성이 높은 인접 데이터는 이미 호스트 커널의 Read-Ahead나 SSD 컨트롤러 DRAM 캐시 수준에서 흡수되는 비중이 큼 |
| **일반적 성능 이득 미성립** | 특정 조건 외에는 레지스터 재사용 히트율이 제한적이어서, 일반적인 성능 향상이나 하드웨어 결과로 주장하기 어려움을 확인 |

---

## 3. 연구 아카이브 및 회고 (Research Archive Note)

비록 본 연구 주제로는 발전시키지 않고 **탐색을 종료(Discontinued)** 했지만, 실험에 사용된 코드와 입력 조건, 분석 결과, 그리고 왜 이 접근이 한계를 가졌는지에 대한 기록은 내부 연구 아카이브에 체계적으로 정리·보존하여 이후 스토리지 시스템 연구 주제를 설계하는 밑거름으로 삼았습니다.
