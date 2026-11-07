import React from 'react';
import {
  RiArrowRightLine,
  RiAwardLine,
  RiBookOpenLine,
  RiCameraLensLine,
  RiCodeSSlashLine,
  RiCpuLine,
  RiCupLine,
  RiExternalLinkLine,
  RiFileTextLine,
  RiFlashlightLine,
  RiGobletLine,
  RiQuillPenLine,
} from 'react-icons/ri';
import {
  LAB_EXPERIENCES,
  Language,
  PAPER_READING_LIST,
  PROFILE_DATA,
  PUBLICATIONS,
  TECHNICAL_AWARDS,
} from '../data/careerData';
import { BLOG_CATEGORIES, BlogCategoryId, BlogPost } from '../utils/blogLoader';
import { SpotlightCard } from './SpotlightCard';
import { HighlightCarousel } from './HighlightCarousel';
import {
  cardBodyGrow,
  cardFooterPinned,
  cardPadding,
  clampTwoLines,
  gridThreeCol,
  gridTwoCol,
  inlineExternalLink,
  labTitle,
  miniTag,
  paragraphText,
  periodBadge,
  pubTitle,
  sectionBlock,
  sectionDesc,
  sectionEyebrow,
  sectionHeader,
  sectionTitle,
  sectionTitleGroup,
  statusVariants,
  tagRow,
  topicItem,
  topicTitle,
  topicTopRow,
} from '../styles/components.css';
import {
  heroBio,
  heroLinksRow,
  heroSection,
  heroSubtitle,
  heroTitle,
  interestChip,
  interestChipWrap,
  liveBadge,
  primaryActionBtn,
  pulseDot,
  secondaryStatusPill,
  socialLinkBtn,
  statusBadgeRow,
} from '../styles/layout.css';
import { vars } from '../styles/theme.css';
import { MobileDetails } from './MobileDetails';
import { hideOnMobile, mobileLinks } from '../styles/mobile.css';

interface HomeViewProps {
  lang: Language;
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
  onNavigateBlog: (category?: BlogCategoryId) => void;
  onNavigatePortfolio: () => void;
  onNavigateResearch: () => void;
}

const CATEGORY_ICON_MAP: Record<BlogCategoryId, React.ReactNode> = {
  tldr: <RiFlashlightLine size={18} color={vars.color.amber} />,
  research: <RiCpuLine size={18} color={vars.color.accent} />,
  engineering: <RiCodeSSlashLine size={18} color={vars.color.accentSecondary} />,
  photography: <RiCameraLensLine size={18} color={vars.color.emerald} />,
  coffee: <RiCupLine size={18} color={vars.color.amber} />,
  cocktail: <RiGobletLine size={18} color={vars.color.accentSecondary} />,
  essay: <RiQuillPenLine size={18} color={vars.color.accent} />,
};

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  posts,
  onSelectPost,
  onNavigateBlog,
  onNavigatePortfolio,
  onNavigateResearch,
}) => {
  const readingNowPapers = PAPER_READING_LIST.filter((p) => p.status === 'reading');

  return (
    <div>
      {/* 1. PERSONAL IDENTITY & WELCOME HERO */}
      <section className={heroSection}>
        <div className={statusBadgeRow}>
          <span className={liveBadge}>
            <span className={pulseDot} />
            {lang === 'ko'
              ? 'Memory & Storage Lab @ 국민대학교 학부연구생'
              : 'Undergraduate Researcher @ Memory & Storage Lab, Kookmin Univ.'}
          </span>
          <span className={`${secondaryStatusPill} ${hideOnMobile}`}>
            {lang === 'ko'
              ? 'UC Irvine BIAS Lab 방문 · 공동연구 (2026 – 현재)'
              : 'UC Irvine BIAS Lab Visiting & Ongoing Research'}
          </span>
          <span
            className={`${secondaryStatusPill} ${hideOnMobile}`}
            style={{ fontFamily: vars.font.mono, color: vars.color.accent, fontWeight: 600 }}
          >
            {lang === 'ko'
              ? '@sinav · Find My Way. Leave a Trace.'
              : '@sinav · Find My Way. Leave a Trace.'}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: '0.65rem',
            marginBottom: '0.25rem',
          }}
        >
          <h1 className={heroTitle} style={{ margin: 0 }}>
            {lang === 'ko' ? '윤민우' : 'Minwoo Yun'}
          </h1>
          <span
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: vars.color.textMuted,
            }}
          >
            {lang === 'ko' ? 'Minwoo Yun · 시나브 (sinav)' : '윤민우 · sinav'}
          </span>
        </div>

        <p className={heroSubtitle} style={{ marginBottom: '0.9rem' }}>
          {PROFILE_DATA.headline[lang]}
        </p>

        <div
          style={{
            marginBottom: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
          }}
        >
          {lang === 'ko' ? (
            <>
              <span
                style={{
                  fontFamily: vars.font.mono,
                  fontSize: '0.73rem',
                  fontWeight: 700,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: vars.color.textMuted,
                }}
              >
                {PROFILE_DATA.slogan.en}
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(1.15rem, 2.2vw, 1.38rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.35,
                  color: vars.color.textPrimary,
                  wordBreak: 'keep-all',
                }}
              >
                익숙한 답보다,{' '}
                <span
                  style={{
                    color: vars.color.accent,
                  }}
                >
                  더 나은 가능성
                </span>
                을 탐구합니다.
              </p>
            </>
          ) : (
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(1.15rem, 2.2vw, 1.38rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.35,
                color: vars.color.textPrimary,
              }}
            >
              Exploring{' '}
              <span style={{ color: vars.color.accent }}>
                Beyond the Expected.
              </span>
            </p>
          )}
        </div>

        <MobileDetails label={lang === 'ko' ? '소개와 관심 분야' : 'About & interests'}>
        <p className={heroBio} style={{ wordBreak: 'keep-all' }}>
          {PROFILE_DATA.bio[lang]}
        </p>

        <div className={interestChipWrap}>
          {PROFILE_DATA.interests.map((item) => (
            <span key={item.en} className={interestChip}>
              {item[lang]}
            </span>
          ))}
        </div>

        </MobileDetails>

        <div className={heroLinksRow}>
          <button
            type="button"
            onClick={() => onNavigateBlog()}
            className={primaryActionBtn}
          >
            {lang === 'ko' ? '블로그 탐색하기' : 'Explore Blog'}
            <RiArrowRightLine size={15} />
          </button>

          <button
            type="button"
            onClick={onNavigatePortfolio}
            className={socialLinkBtn}
          >
            {lang === 'ko' ? '포트폴리오 · CV 보기' : 'Portfolio & CV'}
            <RiArrowRightLine size={14} />
          </button>

          <MobileDetails label={lang === 'ko' ? '연구와 외부 링크' : 'Research & links'}>
          <div className={mobileLinks}>
          <button
            type="button"
            onClick={onNavigateResearch}
            className={socialLinkBtn}
          >
            {lang === 'ko' ? '연구실 · 논문 리딩 로그' : 'Research & Reading Log'}
            <RiArrowRightLine size={14} />
          </button>

          <a
            href={PROFILE_DATA.links.ioUringStudy}
            target="_blank"
            rel="noreferrer"
            className={socialLinkBtn}
          >
            io_uring Interactive Study
            <RiExternalLinkLine size={14} />
          </a>

          <a
            href={PROFILE_DATA.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className={socialLinkBtn}
          >
            LinkedIn
            <RiExternalLinkLine size={14} />
          </a>
          </div>
          </MobileDetails>
        </div>
      </section>

      {/* 2. INTERACTIVE HIGHLIGHT CAROUSEL */}
      <HighlightCarousel
        lang={lang}
        posts={posts}
        onSelectPost={(slug) => onSelectPost(slug)}
        onNavigatePortfolio={onNavigatePortfolio}
        onNavigateResearch={onNavigateResearch}
      />

      {/* 3. BLOG TOPIC & LIFESTYLE CHANNELS (TL;DR, Research, Dev, Photo, Coffee, Cocktail, Essay) */}
      <MobileDetails label={lang === 'ko' ? '카테고리별로 둘러보기' : 'Browse categories'}>
      <section className={sectionBlock}>
        <div className={sectionHeader}>
          <div className={sectionTitleGroup}>
            <span className={sectionEyebrow}>Blog Channels & Personal Archive</span>
            <h2 className={sectionTitle}>
              <RiFileTextLine size={22} color={vars.color.accent} />
              {lang === 'ko'
                ? '카테고리별 블로그 탐색 (Topics & Interests)'
                : 'Explore Blog by Category'}
            </h2>
            <p className={sectionDesc}>
              {lang === 'ko'
                ? '짧은 핵심 요약(TL;DR)부터 시스템·아키텍처 연구, 소프트웨어 개발, 사진, 커피, 칵테일까지 다양한 기록을 아카이빙합니다.'
                : 'Archiving everything from quick TL;DRs, systems research, and software engineering to photography, coffee brewing, and cocktails.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateBlog()}
            className={socialLinkBtn}
          >
            {lang === 'ko' ? '블로그 전체 글 보기' : 'View All Blog Posts'}
            <RiArrowRightLine size={14} />
          </button>
        </div>

        <div className={gridThreeCol}>
          {BLOG_CATEGORIES.map((cat) => {
            const count = posts.filter((p) => p.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                className={topicItem}
                style={{ cursor: 'pointer' }}
                onClick={() => onNavigateBlog(cat.id)}
              >
                <div className={cardBodyGrow}>
                  <div className={topicTopRow}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: vars.color.textPrimary,
                      }}
                    >
                      {CATEGORY_ICON_MAP[cat.id]}
                      {cat.label[lang]}
                    </span>
                    <span className={periodBadge}>
                      {count} {lang === 'ko' ? '편' : 'posts'}
                    </span>
                  </div>
                  <p
                    className={paragraphText}
                    style={{ fontSize: '0.84rem', margin: '0.35rem 0 0' }}
                  >
                    {cat.desc[lang]}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '0.75rem',
                    paddingTop: '0.6rem',
                    borderTop: `1px solid ${vars.color.border}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: vars.color.accent,
                  }}
                >
                  <span>#{cat.shortLabel[lang]}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    {lang === 'ko' ? '채널 이동' : 'Browse'} <RiArrowRightLine size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      </MobileDetails>

      {/* 4. TWO-COLUMN LIVE FEED: RECENT BLOG POSTS & CURRENTLY READING PAPERS */}
      <section className={sectionBlock}>
        <div className={gridTwoCol}>
          {/* Left: Recent Blog Posts */}
          <SpotlightCard>
            <div className={cardPadding}>
              <div className={cardBodyGrow}>
                <div className={topicTopRow}>
                  <span className={statusVariants.exploring}>Latest Posts</span>
                  <span className={periodBadge}>{posts.length} Posts</span>
                </div>
                <h3 className={labTitle} style={{ marginTop: '0.35rem', marginBottom: '0.75rem' }}>
                  <RiFileTextLine size={19} color={vars.color.accent} />
                  {lang === 'ko' ? '최근 작성한 블로그 글' : 'Recent Blog Posts'}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {posts.slice(0, 3).map((post) => (
                    <div
                      key={post.slug}
                      onClick={() => onSelectPost(post.slug)}
                      className={topicItem}
                      style={{ padding: '0.9rem 1.05rem', cursor: 'pointer' }}
                    >
                      <div className={topicTopRow} style={{ marginBottom: '0.3rem' }}>
                        <span className={miniTag}>{post.category}</span>
                        <span className={periodBadge}>{post.date}</span>
                      </div>
                      <h4 className={`${topicTitle} ${clampTwoLines}`} style={{ margin: 0, fontSize: '0.94rem' }}>
                        {lang === 'en' && post.titleEn ? post.titleEn : post.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cardFooterPinned}>
                <span style={{ fontSize: '0.8rem', color: vars.color.textMuted }}>
                  {lang === 'ko' ? '연구 · 개발 · 취향 아카이브' : 'Research, Dev & Life Notes'}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateBlog()}
                  className={inlineExternalLink}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {lang === 'ko' ? '블로그 전체 보기' : 'All Blog Posts'} <RiArrowRightLine size={14} />
                </button>
              </div>
            </div>
          </SpotlightCard>

          {/* Right: Papers Currently Reading */}
          <SpotlightCard>
            <div className={cardPadding}>
              <div className={cardBodyGrow}>
                <div className={topicTopRow}>
                  <span
                    className={statusVariants.study}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span className={pulseDot} />
                    {lang === 'ko' ? '읽는 중 (Reading Now)' : 'Reading Now'}
                  </span>
                  <span className={periodBadge}>{readingNowPapers.length} Papers</span>
                </div>
                <h3 className={labTitle} style={{ marginTop: '0.35rem', marginBottom: '0.75rem' }}>
                  <RiBookOpenLine size={19} color={vars.color.emerald} />
                  {lang === 'ko' ? '현재 읽고 있는 논문' : 'Papers Currently Reading'}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {readingNowPapers.map((paper) => (
                    <div
                      key={paper.id}
                      onClick={onNavigateResearch}
                      className={topicItem}
                      style={{ padding: '0.9rem 1.05rem', cursor: 'pointer' }}
                    >
                      <div className={topicTopRow} style={{ marginBottom: '0.25rem' }}>
                        <span className={miniTag}>{paper.venue}</span>
                        <span className={periodBadge}>{paper.year}</span>
                      </div>
                      <h4 className={`${topicTitle} ${clampTwoLines}`} style={{ margin: 0, fontSize: '0.93rem' }}>
                        {paper.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cardFooterPinned}>
                <span style={{ fontSize: '0.8rem', color: vars.color.textMuted }}>
                  {lang === 'ko' ? '전체 7편 논문 리딩 로그' : 'Full Paper Reading Log'}
                </span>
                <button
                  type="button"
                  onClick={onNavigateResearch}
                  className={inlineExternalLink}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {lang === 'ko' ? '논문 리딩 섹션 보기' : 'Reading Log'} <RiArrowRightLine size={14} />
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 5. RESEARCH & PORTFOLIO SNAPSHOT */}
      <section className={sectionBlock}>
        <div className={sectionHeader}>
          <div className={sectionTitleGroup}>
            <span className={sectionEyebrow}>Portfolio & Laboratories Snapshot</span>
            <h2 className={sectionTitle}>
              <RiCpuLine size={22} color={vars.color.accent} />
              {lang === 'ko'
                ? '연구실 · 학술 논문 · 주요 수상 요약'
                : 'Research Labs, Publications & Honors at a Glance'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onNavigatePortfolio}
            className={socialLinkBtn}
          >
            {lang === 'ko' ? '전체 포트폴리오 열기' : 'Open Full Portfolio'}
            <RiArrowRightLine size={14} />
          </button>
        </div>

        <div className={gridTwoCol}>
          <SpotlightCard onClick={onNavigateResearch}>
            <div className={cardPadding}>
              <div className={cardBodyGrow}>
                <div className={topicTopRow}>
                  <span className={statusVariants.exploring}>Research Laboratories</span>
                  <span className={periodBadge}>2 Labs</span>
                </div>
                <h3 className={labTitle} style={{ marginTop: '0.35rem' }}>
                  {lang === 'ko' ? '소속 연구실 및 연구 분야' : 'Affiliated Research Labs'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.65rem' }}>
                  {LAB_EXPERIENCES.map((lab) => (
                    <div
                      key={lab.id}
                      style={{
                        padding: '0.8rem 0.95rem',
                        borderRadius: '0.7rem',
                        backgroundColor: vars.color.bgSubtle,
                        border: `1px solid ${vars.color.border}`,
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        {lab.labName[lang]}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: vars.color.textSecondary, marginTop: '0.2rem' }}>
                        {lab.institution[lang]} · {lab.period[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cardFooterPinned}>
                <span style={{ fontSize: '0.8rem', color: vars.color.textMuted }}>
                  {lang === 'ko' ? '초기 탐색 · 방문연구 · 스터디' : 'Explorations & Studies'}
                </span>
                <span className={inlineExternalLink}>
                  {lang === 'ko' ? '연구 상세 보기' : 'View Research'} <RiArrowRightLine size={14} />
                </span>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard onClick={onNavigatePortfolio}>
            <div className={cardPadding}>
              <div className={cardBodyGrow}>
                <div className={topicTopRow}>
                  <span className={statusVariants.prior}>Publications & Honors</span>
                  <span className={periodBadge}>
                    {PUBLICATIONS.length} Papers · {TECHNICAL_AWARDS.length} Awards
                  </span>
                </div>
                <h3 className={labTitle} style={{ marginTop: '0.35rem' }}>
                  {lang === 'ko' ? '대표 논문 및 학술·SW 수상' : 'Selected Papers & Honors'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.65rem' }}>
                  <div
                    style={{
                      padding: '0.8rem 0.95rem',
                      borderRadius: '0.7rem',
                      backgroundColor: vars.color.bgSubtle,
                      border: `1px solid ${vars.color.border}`,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <RiBookOpenLine size={15} color={vars.color.accent} />
                      KTCP 2024 (Journal) & KSC 2023 (Best Paper)
                    </div>
                    <div style={{ fontSize: '0.8rem', color: vars.color.textSecondary, marginTop: '0.2rem' }}>
                      {lang === 'ko'
                        ? '오픈소스 운영 진입장벽 완화를 위한 프로젝트 생성 및 운영 관리 서비스 (제1저자)'
                        : 'First Author · Open-Source Project Generation & Operating Management Service'}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '0.8rem 0.95rem',
                      borderRadius: '0.7rem',
                      backgroundColor: vars.color.bgSubtle,
                      border: `1px solid ${vars.color.border}`,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <RiAwardLine size={15} color={vars.color.amber} />
                      {lang === 'ko'
                        ? '산업통상자원부 장관상(대상) · 정보과학회 회장상 2회'
                        : 'MOTIE Minister Grand Prize · 2× KIISE President Awards'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: vars.color.textSecondary, marginTop: '0.2rem' }}>
                      {lang === 'ko'
                        ? '2022 임베디드SW경진대회 대상 · KSC 2023 최우수논문상 · 공개SW 은상'
                        : 'Embedded SW Contest Grand Prize · KSC Best Paper · OSS Silver Prize'}
                    </div>
                  </div>
                </div>
              </div>

              <div className={cardFooterPinned}>
                <span style={{ fontSize: '0.8rem', color: vars.color.textMuted }}>
                  {lang === 'ko' ? '논문 · 프로젝트 · 수상 · 자격증' : 'Papers, Projects & Honors'}
                </span>
                <span className={inlineExternalLink}>
                  {lang === 'ko' ? '포트폴리오 보기' : 'View Portfolio'} <RiArrowRightLine size={14} />
                </span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
};
