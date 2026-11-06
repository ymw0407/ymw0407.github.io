---
title: "Linux io_uring 아키텍처와 폴링/인터럽트 기반 동적 I/O 완료(DPAS) 스터디"
titleEn: "Deep Dive into Linux io_uring Architecture and Dynamic I/O Completion (DPAS)"
date: "2026-10-18"
category: "Systems & Storage"
tags: ["io_uring", "Linux Kernel", "Asynchronous I/O", "DPAS", "Storage"]
summary: "유저 공간과 커널 공간이 공유 링 버퍼(SQ/CQ)를 통해 시스템 콜 오버헤드를 줄이는 io_uring의 내부 구조와, 인터럽트 및 폴링 완료 메커니즘의 트레이드오프를 분석합니다."
summaryEn: "Analyzing how Linux io_uring amortizes syscall overhead via shared Submission/Completion Rings and exploring the tradeoffs between interrupt-driven and polled I/O completions."
featured: true
---

## 1. 왜 전통적인 비동기 I/O(`epoll`, `libaio`)를 넘어 `io_uring`인가?

초고속 NVMe SSD가 등장하면서 스토리지 디바이스 자체의 지연 시간(Latency)이 수 마이크로초($\mu\text{s}$) 단위로 줄어들었습니다. 이에 따라 기존의 시스템 콜(`read`, `write`, `io_submit`) 전환 비용과 컨텍스트 스위칭 오버헤드가 전체 I/O 경로에서 무시할 수 없는 비중을 차지하게 되었습니다.

`io_uring`은 유저 공간(User Space)과 커널 공간(Kernel Space) 사이에 `mmap`으로 공유되는 두 개의 링 버퍼를 두어 이 문제를 해결합니다:

- **Submission Queue (SQ):** 애플리케이션이 I/O 요청(SQE, Submission Queue Entry)을 적재하는 링 버퍼
- **Completion Queue (CQ):** 커널이 완료된 I/O 결과(CQE, Completion Queue Entry)를 기록하는 링 버퍼

$$
\text{Effective Cost per I/O} = \frac{T_{\text{syscall}(\text{io\_uring\_enter})}}{N_{\text{batched SQEs}}} + T_{\text{ring\_memory\_barrier}}
$$

---

## 2. SQ/CQ 메모리 배리어와 무락(Lock-Free) 동기화

링 버퍼의 Head와 Tail 포인터를 업데이트할 때 락(Lock)을 사용하지 않고 원자적(Atomic) 메모리 배리어(`smp_store_release`, `smp_load_acquire`)만으로 동기화합니다.

```c
/* 유저 공간에서 SQE를 추가할 때의 개념적 흐름 */
unsigned tail = sq->tail;
struct io_uring_sqe *sqe = &sq->sqes[tail & sq->ring_mask];

prep_read_request(sqe, fd, buf, len, offset);

/* SQE 기록이 완료된 후 커널이 새 tail을 볼 수 있도록 release 배리어 적용 */
smp_store_release(sq->ktail, tail + 1);
```

직접 구현한 대화형 시각화 자료와 벤치마크 스크립트는 [io_uring Interactive Study Website](https://ymw0407.github.io/system_io_uring_study/) 및 [GitHub 저장소](https://github.com/ymw0407/system_io_uring_study)에서 확인할 수 있습니다.

---

## 3. 인터럽트(Interrupt) vs 폴링(Polling), 그리고 동적 I/O 완료

고성능 NVMe 환경에서는 완료 통지 방식 또한 중요한 연구 주제입니다:

- **Interrupt-based Completion:** CPU 사용량은 효율적이지만, 컨텍스트 전환 및 인터럽트 핸들링 지연이 발생합니다.
- **Polling (`IORING_SETUP_IOPOLL`):** NVMe Completion Queue를 지속적으로 확인하여 최저 지연 시간을 달성하지만, 유휴 상태에서 CPU 코어를 과도하게 점유할 수 있습니다.

국민대학교 Memory & Storage Lab의 선행 연구인 **DPAS** 스터디를 통해 I/O 부하와 지연 특성에 따라 폴링과 인터럽트를 동적으로 조율하는 메커니즘을 깊이 학습할 수 있었습니다.
