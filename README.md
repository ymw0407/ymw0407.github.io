# Minwoo Yun (윤민우) · Researcher Portfolio & Technical Blog

[**`Career_Management`**](https://github.com/ymw0407/Career_Management) 저장소의 원칙과 데이터를 바탕으로 제작된 **연구자 포트폴리오 겸 기술 블로그**입니다.

## ✨ 주요 특징 (Features)

1. **연구자 중심 설계 & `Career_Management` 편집 원칙 엄수**
   - **Research & Laboratories:** 현재 진행 중인 미발표 연구 아이디어는 비공개로 보호하고, 공개 아카이브된 탐색 완료 연구(`NAND Read Granularity`), 시스템 심층 스터디(`io_uring`, `DPAS`) 및 **UC Irvine BIAS Lab** 방문·후속 공동연구(공개 발표 완료된 GREAT Symposium FHE 추론 연구)만 명확히 구분해 표시합니다.
   - **Publications:** `KSC 2023` 최우수논문상 수상 학술대회 논문과 확장 학술지 논문인 `KTCP 2024`를 **출판물 2건 · 연결된 연구 계보 1개**로 명확히 표현하며, 원클릭 **BibTeX 복사**와 공식 DOI 링크를 제공합니다.
   - **Honors, Programs & Certifications:** 공식 수상(Awards)과 선발·교육·연구 프로그램 수료(Activities), 자격증(Certifications)이 혼동되지 않도록 섹션을 분리했습니다.
   - **Archive & Photography 분리:** 기본 연구·기술 포트폴리오와 분리된 `Archive & Photo` 탭에서 사진 공모전 수상작 5점(라이트박스 뷰어 포함)과 월간 「해군」 기고 수필 등을 감상할 수 있습니다.
   - **개인정보 및 저작권 보호:** 상장 스캔본, 시험 등록번호, 저작권 제한 논문 PDF 원본은 공개 사이트에 직접 호스팅하지 않습니다.

2. **마우스 인터랙티브 배경 & 스포트라이트 카드 (`InteractiveBackground.tsx`)**
   - 마우스 커서 움직임에 반응하는 스프링 보간 스포트라이트, 패럴랙스 좌표 그리드, 시스템 토폴로지 노드·엣지 및 데이터 패킷 펄스 애니메이션이 60fps HTML5 Canvas로 동작합니다.
   - 상단 바의 `BG: Interactive / Subtle` 버튼으로 독서 집중 모드로 전환할 수 있으며, `Dark / Light` 테마를 모두 지원합니다.

3. **시스템 언어 우선 감지 + 한/영 즉시 전환 (`KO / EN`)**
   - 최초 접속 시 브라우저의 시스템 언어(`navigator.language`)를 우선 감지하여 한국어(`ko`) 또는 영어(`en`)로 표시하며, 상단 토글로 언제든 전환할 수 있습니다.

4. **Vanilla Extract + React + Vite + TypeScript + pnpm**
   - 모든 스타일은 `@vanilla-extract/css` 기반의 타입 안전 `.css.ts` 테마 시스템(`src/styles/theme.css.ts`, `layout.css.ts`, `components.css.ts`, `blog.css.ts`)으로 작성되었습니다.
   - 블로그 글은 `src/content/posts/*.md` 에 마크다운 파일을 추가하면 자동으로 빌드되며, **LaTeX 수식 (`KaTeX`)**, 코드 블록, 표(GFM)를 완벽히 지원합니다.

---

## 🚀 로컬 실행 및 빌드 (pnpm)

```bash
# 의존성 설치
pnpm install

# 로컬 개발 서버 실행
pnpm dev

# 프로덕션 정적 빌드 (dist/ 생성)
pnpm build
```

---

## ✍️ 새 블로그 글 작성 방법

1. 웹 화면의 **Blog** 탭 우측 상단 **`새 포스트 작성 / 미리보기 (.md)`** 버튼을 눌러 브라우저에서 실시간으로 마크다운과 LaTeX 수식을 미리보며 작성한 뒤 `.md` 파일을 다운로드할 수 있습니다.
2. 다운로드한 `.md` 파일을 `src/content/posts/` 폴더에 넣고 `git push` 하면 GitHub Actions가 자동으로 빌드하여 GitHub Pages에 반영합니다.

---

## 🌐 GitHub Pages 배포 방법

`.github/workflows/deploy.yml` 이 이미 구성되어 있습니다 (`base: './'` 설정으로 `username.github.io` 루트 도메인과 `username.github.io/repo-name` 서브패스 모두 수정 없이 호환됩니다).

1. GitHub에서 새 저장소를 생성한 뒤 원격 저장소로 연결하고 푸시합니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Researcher portfolio and blog"
   git branch -M main
   git remote add origin https://github.com/ymw0407/<REPO_NAME>.git
   git push -u origin main
   ```
2. GitHub 저장소의 **Settings → Pages → Build and deployment → Source** 를 **`GitHub Actions`** 로 설정하면 자동 배포됩니다.
