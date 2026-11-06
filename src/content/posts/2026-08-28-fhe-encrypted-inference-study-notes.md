---
title: "UC Irvine GREAT Symposium 발표 & 방문연구 회고: Accelerating Secure Deep Learning with FHE"
titleEn: "UC Irvine GREAT Symposium & Visiting Research: Accelerating Secure Deep Learning with FHE"
date: "2026-08-28"
category: "Computer Architecture"
tags: ["UC Irvine", "FHE", "Network Folding", "Memory-Centric ML"]
summary: "2026 UC Irvine GREAT Program Symposium에서 발표한 'Accelerating Secure Deep Learning with Fully Homomorphic Encryption' 슬라이드(18p PDF)와, 부트스트래핑 병목 완화를 위한 Network Folding 및 Memory-Centric Architecture(Product Keys) 실험·문헌 분석을 정리합니다."
summaryEn: "Presentation slides and research notes from the 2026 UC Irvine GREAT Program Symposium ('Accelerating Secure Deep Learning with Fully Homomorphic Encryption'): combining Network Folding and Memory-Centric Architecture (Product Keys) to reduce FHE bootstrapping overhead."
featured: true
---

## 1. 2026 UC Irvine GREAT Program Symposium 발표 슬라이드

2026년 여름, **UC Irvine GREAT (Global Research Experience in Artificial inTelligence) 프로그램** 및 **Bio-Inspired Architecture and Systems Lab (BIAS Lab)** 학부 방문연구(지도: Prof. Mohsen Imani, 멘토: Sanggeon Yun)를 수행하며 **GREAT Program Symposium**에서 아래 주제로 발표를 진행했습니다. (해당 FHE 추론 탐색 주제는 심포지엄 발표로 갈무리되었으며, 현재도 BIAS Lab과 별도의 후속 연구 프로젝트를 지속하고 있습니다.)

- **발표 제목:** *Accelerating Secure Deep Learning with Fully Homomorphic Encryption*
- **발표 슬라이드 원문 (18 Pages PDF):** [전체화면으로 PDF 열기 / 다운로드](/presentations/uci-great-2026-fhe-symposium.pdf)

<details style="margin: 1rem 0 1.25rem; padding: 0.85rem 1.05rem; border-radius: 0.75rem; border: 1px solid rgba(37, 99, 235, 0.28); background: rgba(37, 99, 235, 0.04);">
  <summary style="cursor: pointer; font-weight: 700; color: #2563eb; user-select: none;">
    발표 슬라이드 미리보기 열기 / 닫기 (18 Pages PDF)
  </summary>
  <div style="margin-top: 0.85rem; border-radius: 0.65rem; overflow: hidden; border: 1px solid rgba(148, 163, 184, 0.35); background: #0f172a;">
    <iframe src="/presentations/uci-great-2026-fhe-symposium.pdf#view=FitH" title="Accelerating Secure Deep Learning with Fully Homomorphic Encryption - GREAT Program Symposium" style="width: 100%; height: 520px; border: none; display: block;"></iframe>
  </div>
</details>

---

## 2. 문제 정의: 왜 FHE 암호화 추론은 느린가?

완전동형암호(CKKS FHE)는 서버가 평문 데이터를 전혀 보지 못한 채 암호문(`Enc(x)`) 상태에서 직접 연산을 수행할 수 있게 해 주지만(`Dec(f(Enc(x))) = f(x)`), 딥러닝 추론에 적용할 때 구조적인 비용 병목이 발생합니다.

1. **비선형 활성화 함수(ReLU)의 다항식 근사(Polynomial Approximation):** CKKS는 덧셈과 곱셈만 지원하므로 비선형 함수인 ReLU를 다항식으로 근사해야 하며, 이 과정에서 추가 곱셈이 대량으로 발생합니다.
2. **곱셈 깊이(Multiplicative Depth)와 부트스트래핑(Bootstrapping):** 곱셈이 누적될수록 암호문의 잔여 레벨(Level)이 소모됩니다. 레벨이 모두 소진되면 노이즈를 초기화하는 **Bootstrapping** 연산이 필요한데, 이 부트스트래핑이 전체 추론 시간의 지배적인 병목이 됩니다.

$$
\text{More Multiplications} \longrightarrow \text{More Level Consumption} \longrightarrow \text{More Bootstrappings}
$$

---

## 3. 핵심 접근: Network Folding + 병렬 Memory-Centric Architecture

GPU 가속을 통해 개별 부트스트래핑 속도를 높이는 연구들도 있으나, 부트스트래핑 **횟수 자체**가 그대로라면 지연시간 단축에 한계가 있습니다. 반면 단순히 모델 크기를 줄여 곱셈 횟수를 깎으면 정확도(Accuracy)가 급락합니다.

발표에서는 **"곱셈(부트스트래핑) 횟수를 줄이면서도 모델 성능을 유지할 수 있는가?"**라는 질문에 대해 두 가지 기법의 결합을 분석·실험했습니다.

### 3.1 Network Folding (부트스트래핑 횟수 절감)
- 지식 증류(Knowledge Distillation)를 통해 연속된 Teacher 블록들을 단일 Student 블록으로 접어(`1 block = 1 bootstrapping`) 전체 부트스트래핑 횟수를 직접 줄입니다.
- **실험 결과 (CIFAR-100, ResNet-32, 암호문 상 직접 측정):**
  - 6개 블록(6 Bootstrappings)까지 압축했을 때 Teacher 수준의 정확도(71.3% vs 71.6%)를 유지하면서 **12배 빠른 암호화 추론**을 달성했습니다.
  - 그러나 3개·2개 블록으로 더 깊게 압축하면 모델 용량 부족으로 정확도가 급격히 떨어지는 **Performance Cliff**(61.6% → 47.7%)가 나타났습니다.

### 3.2 Memory-Centric Architecture (추가 부트스트래핑 없이 용량 회복)
- 깊게 압축된 모델이 잃어버린 표현력(Capacity)을 복구하기 위해, Lample et al. (NeurIPS 2019)의 **Product Keys 기반 메모리 레이어**를 백본 블록과 **병렬(Parallel)** 경로로 결합했습니다.
- 메모리 경로가 기존 블록과 병렬로 동작한 뒤 덧셈(`+`)으로 합쳐지므로, **전체 곱셈 깊이가 증가하지 않아 추가 부트스트래핑이 0회(Zero Added Bootstrappings)**입니다.
- **실험 결과:** 동일 부트스트래핑 예산에서 모델이 작아질수록 메모리 경로의 기여도가 커졌으며, 가장 깊게 압축된 2개 블록 구간에서 **평균 +4.0%p (3개 블록에서 +2.5%p)의 정확도 회복**을 확인했습니다.

---

## 4. 분석 및 인용한 주요 배경 논문 (Background Literature)

1. **Large Memory Layers with Product Keys** · Lample et al., NeurIPS 2019 ([arXiv:1907.05242](https://arxiv.org/abs/1907.05242))
2. **Homomorphic Encryption for Arithmetic of Approximate Numbers (CKKS)** · Cheon et al., ASIACRYPT 2017 ([IACR ePrint 2016/421](https://eprint.iacr.org/2016/421))
3. **OpenFHE: Open-Source Fully Homomorphic Encryption Library** · Al Badawi et al., WAHC 2022 ([IACR ePrint 2022/915](https://eprint.iacr.org/2022/915))
4. **Cheddar: A Swift Fully Homomorphic Encryption Library for CUDA GPUs** ([arXiv:2407.13055](https://arxiv.org/abs/2407.13055))
5. **EncryptedLLM: GPU-Accelerated FHE for Privacy-Preserving LLM Inference** ([PMLR v267](https://proceedings.mlr.press/v267/de-castro25a.html))
