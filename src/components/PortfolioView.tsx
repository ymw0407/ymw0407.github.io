import React, { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpSLine,
  RiAwardLine,
  RiBookOpenLine,
  RiBriefcase4Line,
  RiCheckLine,
  RiCodeSSlashLine,
  RiCpuLine,
  RiDatabase2Line,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiFileTextLine,
  RiGitBranchLine,
  RiGraduationCapLine,
  RiShieldKeyholeLine,
  RiStackLine,
  RiTerminalBoxLine,
  RiTrophyLine,
  RiUserStarLine,
} from 'react-icons/ri';
import {
  CAREER_TIMELINE,
  CERTIFICATIONS,
  LAB_EXPERIENCES,
  Language,
  PAPER_READING_LIST,
  PROFILE_DATA,
  PROGRAMS_AND_ACTIVITIES,
  PUBLICATIONS,
  SOFTWARE_PROJECTS,
  TECHNICAL_AWARDS,
  WORK_EXPERIENCE,
} from '../data/careerData';
import { BlogPost } from '../utils/blogLoader';
import { SpotlightCard } from './SpotlightCard';
import { SinavLogo } from './SinavLogo';
import {
  authorMe,
  awardBadge,
  bibtexPre,
  bulletList,
  cardBodyGrow,
  cardFooterPinned,
  cardPadding,
  clampThreeLines,
  clampTwoLines,
  cvHeroGrid,
  gridThreeCol,
  gridTwoCol,
  inlineExternalLink,
  labHeader,
  labMeta,
  labTitle,
  lineageBanner,
  miniTag,
  pageIntroHero,
  paragraphText,
  periodBadge,
  pillarNumberBadge,
  projectExpandBtn,
  projectExpandedBox,
  pubSubTitle,
  pubTitle,
  referenceBox,
  referenceList,
  referenceTitleLink,
  sectionBlock,
  sectionDesc,
  sectionDockItem,
  sectionEyebrow,
  sectionHeader,
  sectionQuickDock,
  sectionTitle,
  sectionTitleGroup,
  stackList,
  statBentoCard,
  statBentoGrid,
  statNumber,
  statusVariants,
  tagRow,
  timelineCompactItem,
  timelineCompactList,
  timelineItemHeader,
  topicGrid,
  topicItem,
  topicTitle,
  topicTopRow,
  verticalTimelineCard,
  verticalTimelineDot,
  verticalTimelineRow,
  verticalTimelineWrap,
} from '../styles/components.css';
import {
  iconControlBtn,
  liveBadge,
  navTab,
  navTabActive,
  primaryActionBtn,
  pulseDot,
  socialLinkBtn,
} from '../styles/layout.css';
import { vars } from '../styles/theme.css';
import { MobileDetails } from './MobileDetails';
import { desktopOnly, mobileMetricGrid } from '../styles/mobile.css';

interface PortfolioViewProps {
  lang: Language;
  recentPosts: BlogPost[];
  onSelectPost: (slug: string) => void;
  onNavigateBlog: () => void;
  onNavigateResearch?: () => void;
  onNavigatePublications?: () => void;
  filterSection?: 'all' | 'research' | 'publications' | 'projects';
}

const RESEARCH_PILLARS = [
  {
    num: '01',
    layer: { ko: 'OS Kernel & I/O Layer', en: 'OS Kernel & I/O Layer' },
    title: {
      ko: '리눅스 커널 비동기 I/O 및 완료 경로',
      en: 'Linux Kernel Async I/O & Completion Path',
    },
    desc: {
      ko: 'io_uring의 Submission/Completion Ring 아키텍처, 폴링(Polling)과 인터럽트 기반 동적 완료(DPAS), 시스템 콜 및 컨텍스트 전환 오버헤드를 심층 분석합니다.',
      en: 'Analyzing io_uring SQ/CQ ring buffer mechanics, dynamic polling vs. interrupt completion (DPAS), and syscall/context-switch overhead.',
    },
    tags: ['Linux Kernel', 'io_uring', 'DPAS', 'Block I/O'],
  },
  {
    num: '02',
    layer: { ko: 'Flash & Storage Layer', en: 'Flash & Storage Layer' },
    title: {
      ko: '플래시 메모리 물리적 특성 및 읽기 단위 분석',
      en: 'Flash Storage Characteristics & Read Granularity',
    },
    desc: {
      ko: '호스트 I/O 요청 크기와 NAND 플래시 내부 센싱 단위 간의 불일치를 분석하고, 페이지 레지스터 잔여 데이터의 재사용 가능성 및 구조적 한계를 규명합니다.',
      en: 'Investigating mismatches between host read sizes and NAND flash sensing granularity, evaluating page-register residual data reuse and trade-offs.',
    },
    tags: ['NAND Flash', 'Read Granularity', 'Page Register', 'Storage Systems'],
  },
  {
    num: '03',
    layer: { ko: 'Architecture & Security', en: 'Architecture & Security' },
    title: {
      ko: '완전동형암호(FHE) 추론 및 메모리 중심 아키텍처',
      en: 'FHE Encrypted Inference & Memory-Centric ML',
    },
    desc: {
      ko: '암호화된 데이터 상에서의 딥러닝 추론 연산 병목을 줄이기 위한 Product Keys 메모리 레이어 구조와 GPU 기반 FHE 가속 문헌을 탐구했습니다.',
      en: 'Explored memory-centric model structures (Product Keys) and GPU-accelerated FHE libraries to mitigate encrypted deep-learning inference bottlenecks.',
    },
    tags: ['FHE', 'GPU Acceleration', 'Product Keys', 'Memory-Centric ML'],
  },
];

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  lang,
  recentPosts,
  onSelectPost,
  onNavigateBlog,
  onNavigateResearch,
  onNavigatePublications,
  filterSection = 'all',
}) => {
  const [openBibtexId, setOpenBibtexId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [timelineFilter, setTimelineFilter] = useState<
    'all' | 'research' | 'engineering' | 'publication'
  >('all');
  const [paperFilter, setPaperFilter] = useState<'all' | 'reading' | 'completed'>('all');
  const [openSlidesTopicId, setOpenSlidesTopicId] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleProjectExpand = (projId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projId]: !prev[projId],
    }));
  };

  const allProjectsExpanded = SOFTWARE_PROJECTS.every((p) => expandedProjects[p.id]);
  const toggleAllProjects = () => {
    if (allProjectsExpanded) {
      setExpandedProjects({});
    } else {
      const next: Record<string, boolean> = {};
      SOFTWARE_PROJECTS.forEach((p) => {
        next[p.id] = true;
      });
      setExpandedProjects(next);
    }
  };

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isPortfolioMain = filterSection === 'all';
  const isResearchDedicated = filterSection === 'research';
  const isPublicationsDedicated = filterSection === 'publications';
  const isProjectsDedicated = filterSection === 'projects';

  return (
    <div>
      {/* =====================================================================
          A. PORTFOLIO / CV EXCLUSIVE TOP HERO (Only on /portfolio)
         ===================================================================== */}
      {isPortfolioMain && (
        <section className={pageIntroHero}>
          <div className={cvHeroGrid}>
            {/* Left Column: Researcher CV Profile & Career Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className={desktopOnly}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className={liveBadge}>
                      <span className={pulseDot} />
                      <RiUserStarLine size={13} />
                      {lang === 'ko'
                        ? 'Curriculum Vitae · 연구자 및 시스템 엔지니어 포트폴리오'
                        : 'Curriculum Vitae · Researcher & Systems Portfolio'}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    gap: '0.6rem',
                    margin: '0 0 0.35rem',
                  }}
                >
                  <h1
                    style={{
                      fontSize: 'clamp(1.6rem, 3vw, 2.05rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      margin: 0,
                      color: vars.color.textPrimary,
                    }}
                  >
                    {lang === 'ko' ? '윤민우' : 'Minwoo Yun'}
                  </h1>
                  <span
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: vars.color.textMuted,
                    }}
                  >
                    {lang === 'ko' ? 'Minwoo Yun' : '윤민우'}
                  </span>
                  <span
                    className={periodBadge}
                    style={{
                      fontFamily: vars.font.mono,
                      color: vars.color.accent,
                      borderColor: vars.color.borderAccent,
                      backgroundColor: vars.color.accentSoft,
                      transform: 'translateY(-2px)',
                    }}
                  >
                    {lang === 'ko' ? '@sinav · 시나브' : '@sinav'}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: vars.color.accent,
                    margin: '0 0 0.65rem',
                  }}
                >
                  {PROFILE_DATA.headline[lang]}
                </p>
                <MobileDetails label={lang === 'ko' ? '소개와 경력 요약' : 'About & career summary'}>
                <div
                  style={{
                    marginBottom: '0.55rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.15rem',
                  }}
                >
                  {lang === 'ko' && (
                    <span
                      style={{
                        fontFamily: vars.font.mono,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: vars.color.textMuted,
                      }}
                    >
                      {PROFILE_DATA.slogan.en}
                    </span>
                  )}
                  <div
                    style={{
                      fontSize: '1.06rem',
                      fontWeight: 800,
                      letterSpacing: '-0.025em',
                      color: vars.color.textPrimary,
                    }}
                  >
                    {lang === 'ko' ? (
                      <>
                        익숙한 답보다,{' '}
                        <span style={{ color: vars.color.accent }}>
                          더 나은 가능성
                        </span>
                        을 탐구합니다.
                      </>
                    ) : (
                      <>
                        Exploring{' '}
                        <span style={{ color: vars.color.accent }}>
                          Beyond the Expected.
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <p className={paragraphText} style={{ margin: '0 0 0.9rem', wordBreak: 'keep-all' }}>
                  {PROFILE_DATA.bio[lang]}
                </p>

                {/* Compact Career & Academic Timeline */}
                <div className={timelineCompactList}>
                  <div className={timelineCompactItem}>
                    <div className={timelineItemHeader}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: vars.color.textPrimary }}>
                        {lang === 'ko'
                          ? '국민대학교 Memory & Storage Lab'
                          : 'Memory & Storage Lab, Kookmin Univ.'}
                      </div>
                      <span className={periodBadge}>
                        {lang === 'ko' ? '2026.09 – 현재' : 'Fall 2026 – Present'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: vars.color.textSecondary }}>
                      {lang === 'ko'
                        ? '학부연구생 · Linux Kernel I/O (io_uring, DPAS) & Flash Storage'
                        : 'Undergrad Researcher · Linux Kernel I/O (io_uring, DPAS) & Flash Storage'}
                    </div>
                  </div>

                  <div className={timelineCompactItem}>
                    <div className={timelineItemHeader}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: vars.color.textPrimary }}>
                        {lang === 'ko'
                          ? 'UC Irvine BIAS Lab (GREAT Program)'
                          : 'UC Irvine BIAS Lab (GREAT Program)'}
                      </div>
                      <span className={periodBadge}>2026.05 – 2026.08</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: vars.color.textSecondary }}>
                      {lang === 'ko'
                        ? '학부 방문연구 · 완전동형암호(FHE) 추론 및 메모리 중심 아키텍처'
                        : 'Visiting Researcher · FHE Encrypted Inference & Memory-Centric ML'}
                    </div>
                  </div>

                  <div className={timelineCompactItem}>
                    <div className={timelineItemHeader}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: vars.color.textPrimary }}>
                        {lang === 'ko'
                          ? '대한민국 해군본부 (SW개발병 복무)'
                          : 'Republic of Korea Navy, HQ (SW Developer)'}
                      </div>
                      <span className={periodBadge}>2024.04 – 2025.12</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: vars.color.textSecondary }}>
                      {lang === 'ko'
                        ? '해군본부 SW개발병 · 구체계 분석/신체계 개발 및 KTCP 2024 제1저자 출판'
                        : 'ROK Navy HQ SW Developer · Intranet Systems Dev & KTCP 2024 Published'}
                    </div>
                  </div>

                  <div className={timelineCompactItem}>
                    <div className={timelineItemHeader}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: vars.color.textPrimary }}>
                        {lang === 'ko'
                          ? '콘캣 주식회사 (CONCAT Inc.)'
                          : 'CONCAT Inc.'}
                      </div>
                      <span className={periodBadge}>2023.06 – 2024.03</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: vars.color.textSecondary }}>
                      {lang === 'ko'
                        ? 'Backend Developer / Intern · Go · gRPC · Protobuf 및 MongoDB 쿼리 튜닝'
                        : 'Backend Developer / Intern · Go · gRPC · Protobuf & MongoDB Optimization'}
                    </div>
                  </div>
                </div>
                </MobileDetails>
              </div>

              {/* Tech Stack Tags */}
              <MobileDetails label={lang === 'ko' ? '기술 스택' : 'Technical skills'}>
              <div className={tagRow} style={{ marginTop: '0.35rem' }}>
                {[
                  'C / C++',
                  'Linux Kernel I/O',
                  'io_uring',
                  'Go (gRPC / Protobuf)',
                  'TypeScript',
                  'Spring Boot',
                  'MongoDB / PostgreSQL',
                  'GCP / AWS',
                ].map((skill) => (
                  <span key={skill} className={miniTag}>
                    {skill}
                  </span>
                ))}
              </div>
              </MobileDetails>
            </div>

            {/* Right Column: Key Metrics 2x2 Bento Grid & Quick Navigation */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
              <div className={`${statBentoGrid} ${mobileMetricGrid}`}>
                <div
                  className={statBentoCard}
                  style={{ cursor: onNavigatePublications ? 'pointer' : 'default' }}
                  onClick={onNavigatePublications}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={statNumber}>{PUBLICATIONS.length}</span>
                    <RiBookOpenLine size={20} color={vars.color.accent} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: vars.color.textPrimary }}>
                    {lang === 'ko' ? '제1저자 학술 논문' : 'First-Author Papers'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: vars.color.textMuted }}>
                    {lang === 'ko'
                      ? 'KTCP 2024 학술지 · KSC 2023 최우수논문'
                      : 'KTCP 2024 Journal · KSC 2023 Best Paper'}
                  </div>
                </div>

                <div className={statBentoCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={statNumber} style={{ color: vars.color.amber }}>
                      {TECHNICAL_AWARDS.length}
                    </span>
                    <RiTrophyLine size={20} color={vars.color.amber} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: vars.color.textPrimary }}>
                    {lang === 'ko' ? '장관상·학회장상 수상' : 'Major Tech Honors'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: vars.color.textMuted }}>
                    {lang === 'ko'
                      ? '산자부 장관상(대상) · 정보과학회장상 2회'
                      : 'Minister Grand Prize · 2× KIISE Awards'}
                  </div>
                </div>

                <div className={statBentoCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={statNumber}>{SOFTWARE_PROJECTS.length}</span>
                    <RiTerminalBoxLine size={20} color={vars.color.accentSecondary} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: vars.color.textPrimary }}>
                    {lang === 'ko' ? '주요 SW·시스템 프로젝트' : 'Core SW Projects'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: vars.color.textMuted }}>
                    {lang === 'ko'
                      ? 'MCP 서버 · 오픈소스 거버넌스 · 임베디드'
                      : 'MCP Server, Open-Source & Embedded'}
                  </div>
                </div>

                <div
                  className={statBentoCard}
                  style={{ cursor: onNavigateResearch ? 'pointer' : 'default' }}
                  onClick={onNavigateResearch}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={statNumber} style={{ color: vars.color.emerald }}>
                      {LAB_EXPERIENCES.length}
                    </span>
                    <RiCpuLine size={20} color={vars.color.emerald} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: vars.color.textPrimary }}>
                    {lang === 'ko' ? '소속 및 방문 연구실' : 'Research Laboratories'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: vars.color.textMuted }}>
                    {lang === 'ko'
                      ? '국민대 MSL · UC Irvine BIAS Lab'
                      : 'Kookmin Univ. MSL · UC Irvine BIAS Lab'}
                  </div>
                </div>
              </div>

              <div className={desktopOnly}>
              {/* Quick Jump Buttons */}
              <div
                style={{
                  padding: '0.95rem 1.1rem',
                  borderRadius: '0.9rem',
                  backgroundColor: vars.color.bgSubtle,
                  border: `1px solid ${vars.color.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: vars.color.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {lang === 'ko' ? '전용 페이지 바로가기 (Quick Navigation)' : 'Dedicated Sections'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {onNavigateResearch && (
                    <button
                      type="button"
                      onClick={onNavigateResearch}
                      className={socialLinkBtn}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <RiCpuLine size={14} color={vars.color.accent} />
                      {lang === 'ko' ? '연구실 · 주제 탭' : 'Research Labs Tab'}
                      <RiArrowRightLine size={13} />
                    </button>
                  )}
                  {onNavigatePublications && (
                    <button
                      type="button"
                      onClick={onNavigatePublications}
                      className={socialLinkBtn}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <RiBookOpenLine size={14} color={vars.color.accent} />
                      {lang === 'ko' ? '학술 논문 · BibTeX' : 'Publications Tab'}
                      <RiArrowRightLine size={13} />
                    </button>
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Section Jump Dock on /portfolio */}
      {isPortfolioMain && (
        <div className={desktopOnly}>
        <nav className={sectionQuickDock} aria-label="Portfolio Section Quick Jump">
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: vars.color.accent,
              padding: '0 0.4rem',
              letterSpacing: '0.03em',
            }}
          >
            {lang === 'ko' ? '섹션 이동:' : 'Jump to:'}
          </span>
          {[
            { href: '#about', ko: '01 · 소개 & 철학', en: '01 · About & Philosophy' },
            { href: '#timeline', ko: '02 · 연구·개발 타임라인', en: '02 · Career Timeline' },
            { href: '#projects', ko: '03 · 실무 & 프로젝트', en: '03 · Work & Projects' },
            { href: '#honors', ko: '04 · 수상 & 자격증', en: '04 · Honors & Certs' },
            { href: '#research', ko: '05 · 연구실 & 주제', en: '05 · Research Labs' },
            { href: '#publications', ko: '06 · 학술 논문 & 서재', en: '06 · Publications & Papers' },
          ].map((sec) => (
            <a key={sec.href} href={sec.href} className={sectionDockItem}>
              {sec[lang]}
            </a>
          ))}
        </nav>
        </div>
      )}

      {/* =====================================================================
          B. RESEARCH EXCLUSIVE TOP HERO (Only on /research)
         ===================================================================== */}
      {isResearchDedicated && (
        <section className={pageIntroHero}>
          <div style={{ marginBottom: '1.35rem' }}>
            <div className={desktopOnly}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span className={liveBadge}>
                  <span className={pulseDot} />
                  <RiCpuLine size={13} />
                  {lang === 'ko'
                    ? 'Systems & Architecture Research · 연구 분야 및 연구실 아카이브'
                    : 'Systems & Architecture Research · Research Pillars & Labs'}
                </span>
              </div>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 1.95rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: '0 0 0.45rem',
                color: vars.color.textPrimary,
              }}
            >
              {lang === 'ko'
                ? '연구실 및 시스템 아키텍처 탐구 (Research & Laboratories)'
                : 'Research Laboratories & Systems Focus Pillars'}
            </h1>
            <p className={paragraphText} style={{ margin: 0, maxWidth: '820px' }}>
              {lang === 'ko'
                ? '리눅스 운영체제 커널의 비동기 I/O 경로, 플래시 스토리지 디바이스의 물리적 읽기 특성, 그리고 메모리 중심·개인정보 보호 딥러닝 아키텍처의 경계를 탐구합니다.'
                : 'Investigating the boundary between OS kernel asynchronous I/O paths, flash storage hardware characteristics, and memory-centric privacy-preserving architectures.'}
            </p>
          </div>

          <MobileDetails label={lang === 'ko' ? '연구 관심 분야' : 'Research interests'}>
          {/* 3-Column Research Architecture Pillars */}
          <div className={gridThreeCol} style={{ marginBottom: '1.1rem' }}>
            {RESEARCH_PILLARS.map((pillar) => (
              <div key={pillar.num} className={topicItem}>
                <div className={cardBodyGrow}>
                  <div className={topicTopRow}>
                    <span className={pillarNumberBadge}>{pillar.num}</span>
                    <span className={periodBadge}>{pillar.layer[lang]}</span>
                  </div>
                  <h3 className={topicTitle} style={{ marginTop: '0.35rem' }}>
                    {pillar.title[lang]}
                  </h3>
                  <p className={paragraphText} style={{ fontSize: '0.86rem', marginBottom: '0.65rem' }}>
                    {pillar.desc[lang]}
                  </p>
                </div>
                <div className={tagRow}>
                  {pillar.tags.map((t) => (
                    <span key={t} className={miniTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          </MobileDetails>
          {/* Confidentiality & Open Archive Policy Banner */}
          <div className={lineageBanner} style={{ marginBottom: 0 }}>
            <RiShieldKeyholeLine size={18} color={vars.color.accent} style={{ flexShrink: 0 }} />
            <span>
              {lang === 'ko'
                ? '연구 보안 안내: 현재 투고 및 진행 중인 연구 주제는 아이디어 보호를 위해 비공개로 관리하며, 탐색을 종료하고 아카이브한 연구( 접은 연구 )와 공개 커널 스터디만 아래에 상세히 공개합니다.'
                : 'Research Confidentiality Note: Ongoing unpublished research topics remain confidential prior to submission; only concluded/archived explorations and public technical studies are documented below.'}
            </span>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION: RESEARCHER PHILOSOPHY, NARRATIVE & EDUCATION (Shown on /portfolio)
         ===================================================================== */}
      {isPortfolioMain && (
        <MobileDetails label={lang === 'ko' ? '소개와 철학' : 'About & philosophy'} anchor="about">
        <section className={sectionBlock} id="about">
          <div className={sectionHeader}>
            <div className={sectionTitleGroup}>
              <span className={sectionEyebrow}>01 · Philosophy, Narrative & Education</span>
              <h2 className={sectionTitle}>
                <RiUserStarLine size={22} color={vars.color.accent} />
                {lang === 'ko'
                  ? '나의 이야기 & 엔지니어링 철학 (About Me)'
                  : 'Researcher Narrative & Engineering Philosophy'}
              </h2>
              <p className={sectionDesc}>
                {lang === 'ko'
                  ? '단순 기능 구현에서 출발해 플랫폼과 시스템의 구조적 제약을 파고드는 연구자로 확장된 과정입니다.'
                  : 'How my focus evolved from building product features to investigating underlying system structures and constraints.'}
              </p>
            </div>
          </div>

          {/* Open Compass Logo Philosophy Banner */}
          <div style={{ marginBottom: '1rem' }}>
            <SpotlightCard>
              <div
                className={cardPadding}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: vars.color.bgSubtle,
                    border: `1px solid ${vars.color.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <SinavLogo size={36} />
                </div>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      marginBottom: '0.25rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: vars.font.mono,
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        color: vars.color.accent,
                      }}
                    >
                      Find My Way. Leave a Trace.
                    </span>
                    <span className={periodBadge}>
                      {lang === 'ko' ? '열린 나침반 (Open Compass)' : 'The Open Compass'}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.88rem',
                      lineHeight: 1.65,
                      color: vars.color.textSecondary,
                      wordBreak: 'keep-all',
                    }}
                  >
                    {lang === 'ko'
                      ? '정해진 북쪽만을 가리키는 닫힌 원 대신, 원의 경계를 열어 두고 스스로 납득할 수 있는 방향을 찾아 나아가는 나침반을 상징합니다. 기술적 성취에 머무르지 않고 함께하는 사람들에게 긍정적인 흔적을 남기고자 합니다.'
                      : 'Rather than a closed circle pointing to a predetermined North, the open compass breaks through its boundary toward a self-convinced direction, striving to leave a positive trace beyond technical achievement alone.'}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* 2-Column Philosophy & Ethics Callout Cards */}
          <div className={gridTwoCol} style={{ marginBottom: '1.15rem' }}>
            <SpotlightCard>
              <div className={cardPadding}>
                <div className={topicTopRow}>
                  <span className={statusVariants.exploring}>Core Perspective</span>
                  <span className={periodBadge}>Abstraction & Structure</span>
                </div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    lineHeight: 1.75,
                    color: vars.color.textPrimary,
                    whiteSpace: 'pre-line',
                    margin: '0.5rem 0 0',
                    wordBreak: 'keep-all',
                  }}
                >
                  {PROFILE_DATA.philosophy.summary[lang]}
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div className={cardPadding}>
                <div className={topicTopRow}>
                  <span className={statusVariants.prior}>Engineering Ethics</span>
                  <span className={periodBadge}>Controllable Complexity</span>
                </div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    lineHeight: 1.75,
                    color: vars.color.textPrimary,
                    whiteSpace: 'pre-line',
                    margin: '0.5rem 0 0',
                    wordBreak: 'keep-all',
                  }}
                >
                  {PROFILE_DATA.philosophy.ethics[lang]}
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Full Narrative Story Card + Education */}
          <div className={stackList}>
            <SpotlightCard>
              <div className={cardPadding}>
                <h3 className={labTitle} style={{ marginBottom: '0.85rem' }}>
                  {PROFILE_DATA.narrative.title[lang]}
                </h3>

                {PROFILE_DATA.narrative.paragraphs[lang].map((p, idx) => (
                  <p key={idx} className={paragraphText} style={{ marginTop: 0 }}>
                    {p}
                  </p>
                ))}

                <div className={referenceBox} style={{ margin: '0.5rem 0 1rem' }}>
                  <div style={{ fontWeight: 700, color: vars.color.textPrimary, marginBottom: '0.35rem' }}>
                    {PROFILE_DATA.narrative.questionsIntro[lang]}
                  </div>
                  <ul className={referenceList}>
                    {PROFILE_DATA.narrative.questions[lang].map((q, i) => (
                      <li key={i} style={{ fontWeight: 600, color: vars.color.accent }}>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className={paragraphText} style={{ marginBottom: 0 }}>
                  {PROFILE_DATA.narrative.closing[lang]}
                </p>

                {/* Education Footer Block */}
                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1.1rem',
                    borderTop: `1px solid ${vars.color.border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div className={timelineItemHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.96rem' }}>
                      <RiGraduationCapLine size={18} color={vars.color.accent} />
                      {PROFILE_DATA.education.school[lang]} · {PROFILE_DATA.education.degree[lang]}
                    </div>
                    <span className={periodBadge}>{PROFILE_DATA.education.period[lang]}</span>
                  </div>
                  <p className={paragraphText} style={{ margin: 0, fontSize: '0.86rem' }}>
                    {PROFILE_DATA.education.description[lang]}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>
        </MobileDetails>
      )}

      {/* =====================================================================
          SECTION: CHRONOLOGICAL CAREER & RESEARCH TIMELINE (Shown on /portfolio)
         ===================================================================== */}
      {isPortfolioMain && (
        <MobileDetails label={lang === 'ko' ? '경력 타임라인' : 'Career timeline'} anchor="timeline">
        <section className={sectionBlock} id="timeline">
          <div className={sectionHeader}>
            <div className={sectionTitleGroup}>
              <span className={sectionEyebrow}>02 · Chronological Career & Research Journey</span>
              <h2 className={sectionTitle}>
                <RiGitBranchLine size={22} color={vars.color.accent} />
                {lang === 'ko'
                  ? '연구 · 개발 · 군 복무 타임라인 (2022 – 2026)'
                  : 'Research, Engineering & Military Service Timeline'}
              </h2>
              <p className={sectionDesc}>
                {lang === 'ko'
                  ? '임베디드SW 대상 수상부터 스타트업 백엔드 개발, 해군 SW개발병 복무 및 학술지 출판, UC Irvine 방문연구와 현재 국민대 MSL 학부연구까지의 여정입니다.'
                  : 'Chronological progression from Embedded SW Grand Prize and startup backend engineering to ROK Navy SW Developer service, UCI visiting research, and Kookmin Univ. MSL.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {(
                [
                  { id: 'all', ko: '전체', en: 'All' },
                  { id: 'research', ko: '연구실 · 방문연구', en: 'Research' },
                  { id: 'engineering', ko: '해군 개발병 · 오픈소스', en: 'Military & SW' },
                  { id: 'publication', ko: '논문 · 수상', en: 'Papers & Honors' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTimelineFilter(tab.id)}
                  className={`${navTab} ${timelineFilter === tab.id ? navTabActive : ''}`}
                >
                  {tab[lang]}
                </button>
              ))}
            </div>
          </div>

          <div className={verticalTimelineWrap}>
            {CAREER_TIMELINE.filter((item) => {
              if (timelineFilter === 'all') return true;
              if (timelineFilter === 'publication') {
                return item.category === 'publication' || item.category === 'honor';
              }
              return item.category === timelineFilter;
            }).map((milestone) => (
              <div key={milestone.id} className={verticalTimelineRow}>
                <span className={verticalTimelineDot} />
                <div className={verticalTimelineCard}>
                  <div className={topicTopRow}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                      <span
                        className={
                          milestone.category === 'research'
                            ? statusVariants.exploring
                            : milestone.category === 'engineering'
                            ? statusVariants.study
                            : statusVariants.prior
                        }
                      >
                        {milestone.categoryLabel[lang]}
                      </span>
                      {milestone.highlightBadge && (
                        <span className={awardBadge}>
                          <RiTrophyLine size={12} />
                          {milestone.highlightBadge[lang]}
                        </span>
                      )}
                    </div>
                    <span className={periodBadge}>{milestone.period[lang]}</span>
                  </div>

                  <h3 className={labTitle} style={{ margin: '0.3rem 0 0.15rem' }}>
                    {milestone.title[lang]}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: vars.color.accent,
                      marginBottom: '0.45rem',
                    }}
                  >
                    {milestone.organization[lang]}
                  </div>

                  <p className={paragraphText} style={{ margin: '0 0 0.75rem' }}>
                    {milestone.description[lang]}
                  </p>

                  <div className={tagRow}>
                    {milestone.tags.map((tag) => (
                      <span key={tag} className={miniTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        </MobileDetails>
      )}

      {/* =====================================================================
          SECTION: WORK EXPERIENCE & SOFTWARE PROJECTS
          (Shown on /portfolio or /projects)
         ===================================================================== */}
      {(isPortfolioMain || isProjectsDedicated) && (
        <MobileDetails label={lang === 'ko' ? '실무와 프로젝트' : 'Work & projects'} anchor="projects" enabled={isPortfolioMain}>
        <section className={sectionBlock} id="projects">
          <div className={sectionHeader}>
            <div className={sectionTitleGroup}>
              <span className={sectionEyebrow}>
                {isPortfolioMain
                  ? '03 · Work Experience, Military SW Service & Projects'
                  : 'Systems & Software Engineering'}
              </span>
              <h2 className={sectionTitle}>
                <RiBriefcase4Line size={22} color={vars.color.accent} />
                {lang === 'ko'
                  ? '실무 · 해군 개발병 경력 및 주요 소프트웨어 프로젝트'
                  : 'Work Experience, Military SW Service & Software Projects'}
              </h2>
              <p className={sectionDesc}>
                {lang === 'ko'
                  ? '대한민국 해군 SW개발병 복무, 스타트업 백엔드 엔지니어링 실무 경력, 그리고 직접 주도한 오픈소스·임베디드 프로젝트입니다.'
                  : 'ROK Navy SW Developer service, startup backend engineering experience, and key open-source/embedded software projects.'}
              </p>
            </div>
          </div>

          {/* Work Experience */}
          <div className={stackList} style={{ marginBottom: '1.25rem' }}>
            {WORK_EXPERIENCE.map((exp) => (
              <SpotlightCard key={exp.company.en}>
                <div className={cardPadding}>
                  <div className={labHeader}>
                    <div>
                      <span
                        className={statusVariants.study}
                        style={{ marginBottom: '0.45rem', display: 'inline-block' }}
                      >
                        {exp.badgeLabel ? exp.badgeLabel[lang] : 'Work Experience'}
                      </span>
                      <h3 className={labTitle}>{exp.company[lang]}</h3>
                      <div className={labMeta}>
                        <strong>{exp.role[lang]}</strong>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                      }}
                    >
                      {exp.periods.map((p) => (
                        <span key={p.en} className={periodBadge}>
                          {p[lang]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className={paragraphText} style={{ marginTop: 0 }}>
                    {exp.summary[lang]}
                  </p>

                  <ul className={bulletList}>
                    {exp.bullets[lang].map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  <div className={cardFooterPinned}>
                    <div className={tagRow}>
                      {exp.techStack.map((tech) => (
                        <span key={tech} className={miniTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Software Projects Subheader with Expand/Collapse All */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '1.65rem',
              marginBottom: '0.9rem',
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.08rem',
                  fontWeight: 800,
                  color: vars.color.textPrimary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <RiCodeSSlashLine size={18} color={vars.color.accent} />
                {lang === 'ko'
                  ? '주요 소프트웨어 · 시스템 프로젝트 (Key Software Projects)'
                  : 'Key Software & Systems Projects'}
              </h3>
              <p
                style={{
                  margin: '0.2rem 0 0',
                  fontSize: '0.82rem',
                  color: vars.color.textMuted,
                }}
              >
                {lang === 'ko'
                  ? '각 카드의 [상세 기여 내역 펼쳐보기]를 눌러 아키텍처 설계와 발표 슬라이드(PDF)를 확인하실 수 있습니다.'
                  : 'Click [Expand Architecture & Contributions] on any project card to view detailed engineering highlights and slides.'}
              </p>
            </div>

            <button
              type="button"
              onClick={toggleAllProjects}
              className={iconControlBtn}
              style={{ fontSize: '0.78rem' }}
            >
              {allProjectsExpanded ? (
                <>
                  <RiArrowUpSLine size={15} />
                  {lang === 'ko' ? '프로젝트 상세 모두 접기' : 'Collapse All Projects'}
                </>
              ) : (
                <>
                  <RiArrowDownSLine size={15} />
                  {lang === 'ko' ? '프로젝트 상세 모두 펼치기' : 'Expand All Projects'}
                </>
              )}
            </button>
          </div>

          {/* Software Projects Equal-Height Grid */}
          <div className={gridTwoCol}>
            {SOFTWARE_PROJECTS.map((proj) => {
              const isExpanded = !!expandedProjects[proj.id];
              const bulletCount = proj.highlights[lang].length;

              return (
                <SpotlightCard key={proj.id}>
                  <div className={cardPadding}>
                    <div className={cardBodyGrow}>
                      <div className={topicTopRow}>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            color: vars.color.accent,
                            fontWeight: 700,
                          }}
                        >
                          {proj.role[lang]}
                        </span>
                        <span className={periodBadge}>{proj.period}</span>
                      </div>

                      <h3 className={labTitle} style={{ margin: '0.15rem 0 0.2rem' }}>
                        {proj.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: vars.color.textMuted,
                          margin: '0 0 0.65rem',
                          lineHeight: 1.45,
                        }}
                      >
                        {proj.subtitle[lang]}
                      </p>

                      {proj.relatedBadge && (
                        <div style={{ marginBottom: '0.65rem' }}>
                          <span className={awardBadge}>
                            <RiTrophyLine size={13} />
                            {proj.relatedBadge[lang]}
                          </span>
                        </div>
                      )}

                      <p
                        className={`${paragraphText} ${!isExpanded ? clampThreeLines : ''}`}
                        style={{ marginBottom: '0.6rem' }}
                      >
                        {proj.description[lang]}
                      </p>

                      {/* Collapsible Trigger Button */}
                      <button
                        type="button"
                        onClick={() => toggleProjectExpand(proj.id)}
                        className={projectExpandBtn}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span>
                            {isExpanded
                              ? lang === 'ko'
                                ? '상세 아키텍처 · 기여 내역 접기'
                                : 'Hide Architecture & Contributions'
                              : lang === 'ko'
                              ? `상세 아키텍처 · 기여 내역 펼쳐보기 (${bulletCount}개 항목)`
                              : `Expand Architecture & Contributions (${bulletCount} items)`}
                          </span>
                          {proj.presentationPdfUrl && !isExpanded && (
                            <span
                              style={{
                                fontSize: '0.7rem',
                                padding: '0.1rem 0.45rem',
                                borderRadius: '999px',
                                backgroundColor: vars.color.accentSoft,
                                color: vars.color.accent,
                                fontWeight: 700,
                              }}
                            >
                              {lang === 'ko' ? '+ 발표 PDF' : '+ Slides PDF'}
                            </span>
                          )}
                        </span>
                        {isExpanded ? (
                          <RiArrowUpSLine size={17} />
                        ) : (
                          <RiArrowDownSLine size={17} />
                        )}
                      </button>

                      {/* Expandable Details Panel */}
                      {isExpanded && (
                        <div className={projectExpandedBox}>
                          <ul
                            className={bulletList}
                            style={{ margin: 0, fontSize: '0.85rem' }}
                          >
                            {proj.highlights[lang].map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>

                          {proj.presentationPdfUrl && (
                            <div
                              style={{
                                marginTop: '0.85rem',
                                padding: '0.75rem 0.9rem',
                                borderRadius: '0.75rem',
                                backgroundColor: vars.color.bgElevated,
                                border: `1px solid ${vars.color.border}`,
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  flexWrap: 'wrap',
                                  gap: '0.5rem',
                                  marginBottom:
                                    openSlidesTopicId === proj.id ? '0.65rem' : 0,
                                }}
                              >
                                <div
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    fontSize: '0.79rem',
                                    fontWeight: 700,
                                    color: vars.color.textPrimary,
                                  }}
                                >
                                  <RiFileTextLine size={15} color={vars.color.accent} />
                                  <span>
                                    {proj.presentationTitle
                                      ? proj.presentationTitle[lang]
                                      : lang === 'ko'
                                      ? '서비스 기획 및 아키텍처 발표 슬라이드 (PDF)'
                                      : 'Presentation Slides (PDF)'}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenSlidesTopicId((prev) =>
                                        prev === proj.id ? null : proj.id
                                      )
                                    }
                                    className={iconControlBtn}
                                    style={{
                                      padding: '0.26rem 0.62rem',
                                      fontSize: '0.74rem',
                                    }}
                                  >
                                    <RiFileTextLine
                                      size={13}
                                      color={vars.color.accent}
                                    />
                                    {openSlidesTopicId === proj.id
                                      ? lang === 'ko'
                                        ? '슬라이드 닫기'
                                        : 'Hide Slides'
                                      : lang === 'ko'
                                      ? '슬라이드 미리보기 열기'
                                      : 'Preview Slides'}
                                  </button>
                                  <a
                                    href={proj.presentationPdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={inlineExternalLink}
                                    style={{ fontSize: '0.74rem' }}
                                  >
                                    {lang === 'ko' ? '새 탭에서 PDF 열기' : 'Open PDF'}
                                    <RiExternalLinkLine size={13} />
                                  </a>
                                </div>
                              </div>

                              {openSlidesTopicId === proj.id && (
                                <div
                                  style={{
                                    position: 'relative',
                                    width: '100%',
                                    aspectRatio: '16 / 9',
                                    minHeight: '240px',
                                    borderRadius: '0.6rem',
                                    overflow: 'hidden',
                                    border: `1px solid ${vars.color.border}`,
                                    backgroundColor: '#0f172a',
                                  }}
                                >
                                  <iframe
                                    src={`${proj.presentationPdfUrl}#view=FitH`}
                                    title={
                                      proj.presentationTitle
                                        ? proj.presentationTitle[lang]
                                        : proj.name
                                    }
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      border: 'none',
                                      display: 'block',
                                    }}
                                    loading="lazy"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Pinned Footer so every Project Card aligns horizontally */}
                    <div className={cardFooterPinned}>
                      <div className={tagRow}>
                        {proj.techStack.map((t) => (
                          <span key={t} className={miniTag}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
                        {proj.presentationPdfUrl && (
                          <a
                            href={proj.presentationPdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={inlineExternalLink}
                          >
                            {lang === 'ko' ? '발표 PDF' : 'Deck (PDF)'}
                            <RiExternalLinkLine size={14} />
                          </a>
                        )}
                        {proj.repoUrl && (
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={inlineExternalLink}
                          >
                            {proj.isArchivedRepo ? 'GitHub (Archived)' : 'GitHub'}
                            <RiExternalLinkLine size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>
        </MobileDetails>
      )}

      {/* =====================================================================
          SECTION: HONORS, ACADEMIC PROGRAMS & CERTIFICATIONS
          (Shown SECOND on /portfolio)
         ===================================================================== */}
      {isPortfolioMain && (
        <MobileDetails label={lang === 'ko' ? '수상과 활동' : 'Honors & activities'} anchor="honors">
        <section className={sectionBlock} id="honors">
          <div className={sectionHeader}>
            <div className={sectionTitleGroup}>
              <span className={sectionEyebrow}>04 · Honors, Programs & Credentials</span>
              <h2 className={sectionTitle}>
                <RiAwardLine size={22} color={vars.color.accent} />
                {lang === 'ko'
                  ? '학술·SW 수상, 연구 프로그램 및 자격증'
                  : 'Honors & Awards, Programs, and Certifications'}
              </h2>
              <p className={sectionDesc}>
                {lang === 'ko'
                  ? '공식 수상(Awards)과 선발·연구 프로그램 수료(Activities) 및 자격증(Certifications)을 엄격히 분리하여 표기합니다.'
                  : 'Strictly separating formal Awards from Selections/Research Programs and Technical Certifications.'}
              </p>
            </div>
          </div>

          <div className={stackList}>
            {/* Honors & Awards (3-Column Bento Grid) */}
            <SpotlightCard>
              <div className={cardPadding}>
                <h3 className={labTitle} style={{ marginBottom: '1rem' }}>
                  <RiTrophyLine size={19} color={vars.color.amber} />
                  {lang === 'ko'
                    ? '주요 소프트웨어·학술 수상 (Honors & Awards)'
                    : 'Academic & Software Honors'}
                </h3>
                <div className={gridThreeCol}>
                  {TECHNICAL_AWARDS.map((aw) => (
                    <div key={aw.date + aw.project} className={topicItem}>
                      <div className={cardBodyGrow}>
                        <div className={topicTopRow}>
                          <span className={awardBadge}>
                            <RiTrophyLine size={12} />
                            {aw.project}
                          </span>
                          <span className={periodBadge}>{aw.date}</span>
                        </div>
                        <h4 className={topicTitle} style={{ marginTop: '0.35rem' }}>
                          {aw.title[lang]}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.84rem',
                            color: vars.color.textSecondary,
                            margin: '0.35rem 0 0',
                            lineHeight: 1.5,
                          }}
                        >
                          {aw.organization[lang]}
                        </p>
                      </div>

                      <div
                        style={{
                          marginTop: '0.85rem',
                          paddingTop: '0.65rem',
                          borderTop: `1px solid ${vars.color.border}`,
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: vars.color.accent,
                        }}
                      >
                        {aw.roleOrNote[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Selections, Research Programs & Activities (2-Column Balanced Grid) */}
            <SpotlightCard>
              <div className={cardPadding}>
                <h3 className={labTitle} style={{ marginBottom: '1rem' }}>
                  <RiGraduationCapLine size={19} color={vars.color.accent} />
                  {lang === 'ko'
                    ? '선발 · 연구 프로그램 · 대외활동 (Selections & Programs)'
                    : 'Selections, Research Programs & Activities'}
                </h3>
                <div className={topicGrid}>
                  {PROGRAMS_AND_ACTIVITIES.map((act) => (
                    <div key={act.title.en} className={topicItem}>
                      <div className={cardBodyGrow}>
                        <div style={{ marginBottom: '0.45rem' }}>
                          <span className={periodBadge}>{act.period}</span>
                        </div>
                        <h4 className={topicTitle}>
                          {act.link ? (
                            <a
                              href={act.link}
                              target="_blank"
                              rel="noreferrer"
                              className={inlineExternalLink}
                              style={{ fontSize: '0.98rem', whiteSpace: 'normal' }}
                            >
                              {act.title[lang]} <RiExternalLinkLine size={14} />
                            </a>
                          ) : (
                            act.title[lang]
                          )}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.85rem',
                            color: vars.color.textSecondary,
                            margin: '0.25rem 0 0',
                            lineHeight: 1.55,
                          }}
                        >
                          {act.roleOrNote[lang]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Technical Certifications (3-Column Credential Grid) */}
            <SpotlightCard>
              <div className={cardPadding}>
                <h3 className={labTitle} style={{ marginBottom: '1rem' }}>
                  <RiStackLine size={19} color={vars.color.emerald} />
                  {lang === 'ko' ? '기술 자격증 (Certifications)' : 'Technical Certifications'}
                </h3>
                <div className={gridThreeCol}>
                  {CERTIFICATIONS.map((cert) => (
                    <div
                      key={cert.name.en}
                      className={topicItem}
                      style={{ padding: '0.95rem 1.05rem' }}
                    >
                      <div className={cardBodyGrow}>
                        <div style={{ marginBottom: '0.4rem' }}>
                          <span className={periodBadge}>{cert.date}</span>
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            lineHeight: 1.4,
                            color: vars.color.textPrimary,
                            wordBreak: 'keep-all',
                          }}
                        >
                          {cert.name[lang]}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: vars.color.textMuted,
                          marginTop: '0.5rem',
                        }}
                      >
                        {cert.issuer[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>
        </MobileDetails>
      )}

      {/* =====================================================================
          SECTION: RESEARCH & LABORATORIES (Detailed view on /research, or after Honors on /portfolio)
         ===================================================================== */}
      {(isResearchDedicated || isPortfolioMain) && (
        <MobileDetails label={lang === 'ko' ? '연구실과 연구 주제' : 'Research labs & topics'} anchor="research" enabled={isPortfolioMain}>
        <section className={sectionBlock} id="research">
          <div className={sectionHeader}>
            <div className={sectionTitleGroup}>
              <span className={sectionEyebrow}>
                {isResearchDedicated
                  ? '01 · Affiliated Laboratories & Archived Explorations'
                  : '05 · Research Laboratories & Archived Studies'}
              </span>
              <h2 className={sectionTitle}>
                <RiDatabase2Line size={22} color={vars.color.accent} />
                {lang === 'ko'
                  ? '소속 연구실 및 공개 연구·스터디 기록'
                  : 'Affiliated Laboratories & Public Research Archive'}
              </h2>
              <p className={sectionDesc}>
                {lang === 'ko'
                  ? '학부연구생 및 방문연구원으로서 수행한 공개 아카이브 연구(접은 연구)와 시스템 커널 스터디입니다.'
                  : 'Publicly archived explorations and kernel system studies conducted across affiliated research labs.'}
              </p>
            </div>
          </div>

          <div className={stackList}>
            {LAB_EXPERIENCES.map((lab) => (
              <SpotlightCard key={lab.id}>
                <div className={cardPadding}>
                  <div className={labHeader}>
                    <div>
                      <h3 className={labTitle}>
                        <a
                          href={lab.labUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                        >
                          {lab.labName[lang]}
                          <RiExternalLinkLine size={16} color={vars.color.accent} />
                        </a>
                      </h3>
                      <div className={labMeta}>
                        <strong>{lab.institution[lang]}</strong>
                        <span>·</span>
                        <span>{lab.role[lang]}</span>
                        <span>·</span>
                        <span>{lab.location[lang]}</span>
                      </div>
                    </div>
                    <span className={periodBadge}>{lab.period[lang]}</span>
                  </div>

                  <p className={paragraphText} style={{ marginTop: 0, marginBottom: '1.15rem' }}>
                    {lab.overview[lang]}
                  </p>

                  <MobileDetails label={lang === 'ko' ? '연구 주제와 자료 보기' : 'Research topics & resources'}>
                  {/* 2-Column Balanced Bento Grid for Research Topics */}
                  <div className={topicGrid}>
                    {lab.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className={topicItem}
                        style={
                          lab.topics.length === 1
                            ? { gridColumn: '1 / -1' }
                            : undefined
                        }
                      >
                        <div className={cardBodyGrow} style={{ minWidth: 0 }}>
                          <div style={{ marginBottom: '0.55rem' }}>
                            <span className={statusVariants[topic.status]}>
                              {topic.statusLabel[lang]}
                            </span>
                          </div>

                          <h4 className={topicTitle}>{topic.title[lang]}</h4>

                          <p className={paragraphText}>{topic.summary[lang]}</p>

                          {topic.presentationPdfUrl && (
                            <div
                              style={{
                                marginBottom: '0.85rem',
                                padding: '0.85rem 1rem',
                                borderRadius: '0.75rem',
                                backgroundColor: vars.color.bgElevated,
                                border: `1px solid ${vars.color.borderAccent}`,
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  flexWrap: 'wrap',
                                  gap: '0.5rem',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    fontWeight: 700,
                                    fontSize: '0.86rem',
                                    color: vars.color.textPrimary,
                                  }}
                                >
                                  <RiFileTextLine size={16} color={vars.color.accent} />
                                  {topic.presentationTitle
                                    ? topic.presentationTitle[lang]
                                    : 'Presentation Slides (PDF)'}
                                </div>

                                <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenSlidesTopicId(
                                        openSlidesTopicId === topic.id ? null : topic.id
                                      )
                                    }
                                    className={iconControlBtn}
                                  >
                                    {openSlidesTopicId === topic.id
                                      ? lang === 'ko'
                                        ? '슬라이드 미리보기 접기'
                                        : 'Hide Slide Preview'
                                      : lang === 'ko'
                                      ? '슬라이드 미리보기 열기'
                                      : 'Preview Slides'}
                                  </button>
                                  <a
                                    href={topic.presentationPdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={iconControlBtn}
                                  >
                                    {lang === 'ko' ? 'PDF 전체화면 열기' : 'Open Full PDF'}
                                    <RiExternalLinkLine size={13} />
                                  </a>
                                </div>
                              </div>

                              {openSlidesTopicId === topic.id && (
                                <div
                                  style={{
                                    marginTop: '0.75rem',
                                    borderRadius: '0.6rem',
                                    overflow: 'hidden',
                                    border: `1px solid ${vars.color.border}`,
                                    backgroundColor: '#0f172a',
                                    aspectRatio: '16 / 9.6',
                                    width: '100%',
                                  }}
                                >
                                  <iframe
                                    src={`${topic.presentationPdfUrl}#view=FitH`}
                                    title={
                                      topic.presentationTitle
                                        ? topic.presentationTitle[lang]
                                        : topic.title[lang]
                                    }
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      border: 'none',
                                      display: 'block',
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {topic.references && topic.references.length > 0 && (
                            <div className={referenceBox} style={{ marginBottom: '0.85rem' }}>
                              <div style={{ fontWeight: 600 }}>
                                {topic.referencesNote?.[lang]}
                              </div>
                              <ul className={referenceList}>
                                {topic.references.map((ref) => (
                                  <li key={ref.url} style={{ minWidth: 0 }}>
                                    <a
                                      href={ref.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={referenceTitleLink}
                                    >
                                      {ref.title}{' '}
                                      <RiExternalLinkLine
                                        size={13}
                                        style={{
                                          display: 'inline',
                                          verticalAlign: '-2px',
                                        }}
                                      />
                                    </a>{' '}
                                    · <span>{ref.venueOrNote}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Pinned Bottom Row inside Topic Card */}
                        <div
                          className={cardFooterPinned}
                          style={{ paddingTop: '0.75rem' }}
                        >
                          <div className={tagRow}>
                            {topic.keywords.map((kw) => (
                              <span key={kw} className={miniTag}>
                                {kw}
                              </span>
                            ))}
                          </div>

                          {topic.links && topic.links.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.65rem', flexShrink: 0 }}>
                              {topic.links.map((link) => (
                                <a
                                  key={link.url}
                                  href={link.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={inlineExternalLink}
                                >
                                  {link.label[lang]}
                                  <RiExternalLinkLine size={13} />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  </MobileDetails>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
        </MobileDetails>
      )}

      {/* =====================================================================
          SECTION: PUBLICATIONS (Shown on /publications or /portfolio)
         ===================================================================== */}
      {(isPublicationsDedicated || isPortfolioMain) && (
        <MobileDetails label={lang === 'ko' ? '학술 논문' : 'Publications'} anchor="publications" enabled={isPortfolioMain}>
        <section className={sectionBlock} id="publications">
          <div className={sectionHeader}>
            <div className={sectionTitleGroup}>
              <span className={sectionEyebrow}>
                {isPublicationsDedicated ? '01 · Academic Publications' : '06 · Academic Publications'}
              </span>
              <h2 className={sectionTitle}>
                <RiBookOpenLine size={22} color={vars.color.accent} />
                {lang === 'ko' ? '학술 논문 (Publications)' : 'Publications'}
              </h2>
              <p className={sectionDesc}>
                {lang === 'ko'
                  ? '학술대회 발표 및 확장 학술지 출판 실적 2건 (동일 연구 계보 연결)'
                  : 'Peer-reviewed journal and conference publications (2 published works connected across 1 research lineage).'}
              </p>
            </div>
          </div>

          <div className={lineageBanner}>
            <RiGitBranchLine size={18} color={vars.color.accent} style={{ flexShrink: 0 }} />
            <span>
              {lang === 'ko'
                ? '연구 계보 안내: 아래 KTCP 2024 학술지 논문은 KSC 2023 최우수논문상 수상 학술대회 논문의 확장판으로, 단일 연구 계보에서 도출된 2건의 출판물입니다.'
                : 'Research Lineage Note: The KTCP 2024 journal article below is the extended journal edition of the KSC 2023 Best Paper Award conference paper (2 publications connected under 1 research stream).'}
            </span>
          </div>

          <div className={stackList}>
            {PUBLICATIONS.map((pub) => {
              const isBibOpen = openBibtexId === pub.id;
              const isCopied = copiedId === pub.id;

              return (
                <SpotlightCard key={pub.id}>
                  <div className={cardPadding}>
                    <div className={topicTopRow}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                        <span
                          className={
                            pub.type === 'journal'
                              ? statusVariants.exploring
                              : statusVariants.prior
                          }
                        >
                          {pub.badge[lang]}
                        </span>
                        {pub.award && (
                          <span className={awardBadge}>
                            <RiTrophyLine size={13} />
                            {pub.award[lang]}
                          </span>
                        )}
                      </div>
                      <span className={periodBadge}>{pub.date}</span>
                    </div>

                    <h3 className={pubTitle}>
                      {lang === 'ko' ? pub.titleKo : pub.titleEn}
                    </h3>
                    <p className={pubSubTitle}>
                      {lang === 'ko' ? pub.titleEn : pub.titleKo}
                    </p>

                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: vars.color.textSecondary,
                        marginBottom: '0.45rem',
                      }}
                    >
                      {pub.authors.map((a, idx) => (
                        <React.Fragment key={a.name}>
                          <span className={a.isMe ? authorMe : undefined}>{a.name}</span>
                          {idx < pub.authors.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    </div>

                    <div
                      style={{
                        fontSize: '0.88rem',
                        color: vars.color.textSecondary,
                        fontStyle: 'italic',
                        marginBottom: '0.65rem',
                      }}
                    >
                      {pub.venue}, {pub.volumePages} ({pub.date})
                    </div>

                    <div
                      style={{
                        fontSize: '0.82rem',
                        color: vars.color.textMuted,
                        marginBottom: '0.85rem',
                      }}
                    >
                      ↳ {pub.lineageNote[lang]}
                    </div>

                    <div className={cardFooterPinned}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {pub.doi && (
                          <a
                            href={pub.doi}
                            target="_blank"
                            rel="noreferrer"
                            className={iconControlBtn}
                          >
                            <RiExternalLinkLine size={14} />
                            DOI: 10.5626/KTCP.2024.30.10.499
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setOpenBibtexId(isBibOpen ? null : pub.id)}
                          className={iconControlBtn}
                        >
                          <RiCodeSSlashLine size={14} />
                          {isBibOpen ? 'Hide BibTeX' : 'BibTeX'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyBibtex(pub.id, pub.bibtex)}
                          className={iconControlBtn}
                        >
                          {isCopied ? <RiCheckLine size={14} /> : <RiFileCopyLine size={14} />}
                          {isCopied
                            ? lang === 'ko'
                              ? '복사됨'
                              : 'Copied'
                            : lang === 'ko'
                            ? 'BibTeX 복사'
                            : 'Copy BibTeX'}
                        </button>
                      </div>
                    </div>

                    {isBibOpen && <pre className={bibtexPre}>{pub.bibtex}</pre>}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>
        </MobileDetails>
      )}

      {/* =====================================================================
          SECTION: PAPER READING LOG (Reading Now & Completed Papers)
          (Shown on /research, /publications, and /portfolio)
         ===================================================================== */}
      {(isResearchDedicated || isPublicationsDedicated || isPortfolioMain) && (
        <MobileDetails label={lang === 'ko' ? '논문 리딩 로그' : 'Paper reading log'} anchor="reading-list">
        <section className={sectionBlock} id="reading-list">
          <div className={sectionHeader}>
            <div className={sectionTitleGroup}>
              <span className={sectionEyebrow}>
                {isResearchDedicated || isPublicationsDedicated
                  ? '02 · Literature Tracker & Reading Shelf'
                  : '07 · Literature Tracker & Paper Reading Log'}
              </span>
              <h2 className={sectionTitle}>
                <RiBookOpenLine size={22} color={vars.color.accent} />
                {lang === 'ko'
                  ? '읽고 있는 논문 & 읽은 논문 (Paper Reading Log)'
                  : 'Papers Currently Reading & Read'}
              </h2>
              <p className={sectionDesc}>
                {lang === 'ko'
                  ? '커널 I/O, 플래시 스토리지 시스템, 메모리 중심 아키텍처 및 FHE 연구를 위해 현재 읽고 있거나 분석을 마친 주요 논문과 기술 문헌입니다.'
                  : 'Tracking foundational and recent papers I am currently reading or have summarized across storage systems, kernel I/O, and computer architecture.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {(
                [
                  { id: 'all', ko: `전체 (${PAPER_READING_LIST.length})`, en: `All (${PAPER_READING_LIST.length})` },
                  {
                    id: 'reading',
                    ko: `읽는 중 (${PAPER_READING_LIST.filter((p) => p.status === 'reading').length})`,
                    en: `Reading Now (${PAPER_READING_LIST.filter((p) => p.status === 'reading').length})`,
                  },
                  {
                    id: 'completed',
                    ko: `완독 · 정리 완료 (${PAPER_READING_LIST.filter((p) => p.status === 'completed').length})`,
                    en: `Completed (${PAPER_READING_LIST.filter((p) => p.status === 'completed').length})`,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPaperFilter(tab.id)}
                  className={`${navTab} ${paperFilter === tab.id ? navTabActive : ''}`}
                >
                  {tab[lang]}
                </button>
              ))}
            </div>
          </div>

          <div className={gridTwoCol}>
            {PAPER_READING_LIST.filter(
              (item) => paperFilter === 'all' || item.status === paperFilter
            ).map((paper) => (
              <SpotlightCard key={paper.id}>
                <div className={cardPadding}>
                  <div className={cardBodyGrow} style={{ minWidth: 0 }}>
                    <div className={topicTopRow}>
                      <span
                        className={
                          paper.status === 'reading'
                            ? statusVariants.study
                            : statusVariants.exploring
                        }
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        {paper.status === 'reading' && <span className={pulseDot} />}
                        {paper.statusLabel[lang]}
                      </span>
                      <span className={periodBadge}>{paper.year}</span>
                    </div>

                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: vars.color.accent,
                        marginTop: '0.15rem',
                      }}
                    >
                      {paper.category}
                    </div>

                    <h3 className={pubTitle} style={{ marginTop: '0.2rem', fontSize: '1.04rem' }}>
                      {paper.title}
                    </h3>

                    <div
                      style={{
                        fontSize: '0.83rem',
                        color: vars.color.textMuted,
                        marginBottom: '0.65rem',
                        lineHeight: 1.45,
                      }}
                    >
                      <strong>{paper.authorsOrGroup}</strong> · <em>{paper.venue}</em>
                    </div>

                    <div className={referenceBox} style={{ marginTop: 'auto', marginBottom: '0.85rem' }}>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: vars.color.accent,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {lang === 'ko' ? '핵심 분석 · Takeaway' : 'Key Takeaway'}
                      </div>
                      <div style={{ lineHeight: 1.6 }}>{paper.takeaway[lang]}</div>
                    </div>
                  </div>

                  <div className={cardFooterPinned}>
                    <div className={tagRow}>
                      {paper.tags.map((t) => (
                        <span key={t} className={miniTag}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.65rem', alignItems: 'center', flexShrink: 0 }}>
                      {paper.paperUrl && (
                        <a
                          href={paper.paperUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={inlineExternalLink}
                        >
                          {lang === 'ko' ? '원문' : 'Paper'}
                          <RiExternalLinkLine size={13} />
                        </a>
                      )}
                      {paper.relatedPostSlug && (
                        <button
                          type="button"
                          onClick={() => onSelectPost(paper.relatedPostSlug!)}
                          className={inlineExternalLink}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                          }}
                        >
                          {lang === 'ko' ? '연구 노트' : 'Read Note'}
                          <RiArrowRightLine size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
        </MobileDetails>
      )}

      {/* =====================================================================
          SECTION: RELATED RESEARCH NOTES & BLOG POSTS
          (Shown on /research and at the bottom of /portfolio)
         ===================================================================== */}
      {(isResearchDedicated || isPortfolioMain) && (
        <section className={sectionBlock}>
          <div className={sectionHeader}>
            <div className={sectionTitleGroup}>
              <span className={sectionEyebrow}>
                {isResearchDedicated
                  ? '03 · Related Research Notes & Deep Dives'
                  : '08 · Research Notes & Technical Blog'}
              </span>
              <h2 className={sectionTitle}>
                <RiFileTextLine size={22} color={vars.color.accent} />
                {lang === 'ko'
                  ? '연관 연구 노트 & 기술 블로그 포스트'
                  : 'Related Research Notes & Technical Blog'}
              </h2>
              <p className={sectionDesc}>
                {lang === 'ko'
                  ? '커널 I/O, NAND 플래시 읽기 단위 아카이브, FHE 선행 문헌 분석 노트를 독립 페이지에서 읽으실 수 있습니다.'
                  : 'Read standalone technical notes on Linux kernel I/O, NAND flash read granularity, and FHE literature.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateBlog}
              className={primaryActionBtn}
            >
              {lang === 'ko' ? '블로그 홈으로 이동' : 'Go to Blog Home'}
              <RiArrowRightLine size={15} />
            </button>
          </div>

          <div className={gridThreeCol}>
            {recentPosts.slice(0, 3).map((post) => (
              <SpotlightCard
                key={post.slug}
                onClick={() => onSelectPost(post.slug)}
              >
                <div className={cardPadding}>
                  <div className={cardBodyGrow}>
                    <div className={topicTopRow}>
                      <span className={statusVariants.exploring}>{post.category}</span>
                      <span className={periodBadge}>{post.date}</span>
                    </div>
                    <h3
                      className={`${pubTitle} ${clampTwoLines}`}
                      style={{ marginTop: '0.45rem', fontSize: '1.06rem' }}
                    >
                      {lang === 'en' && post.titleEn ? post.titleEn : post.title}
                    </h3>
                    <p className={`${paragraphText} ${clampThreeLines}`}>
                      {lang === 'en' && post.summaryEn ? post.summaryEn : post.summary}
                    </p>
                  </div>

                  <div className={cardFooterPinned}>
                    <div className={tagRow}>
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className={miniTag}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
