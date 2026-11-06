import React, { useEffect, useState } from 'react';
import {
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiBookOpenLine,
  RiCalendarLine,
  RiCpuLine,
  RiSparkling2Line,
} from 'react-icons/ri';
import { Language } from '../data/careerData';
import { BlogPost } from '../utils/blogLoader';
import {
  carouselArrowBtn,
  carouselArrowGroup,
  carouselDot,
  carouselDotActive,
  carouselDotsRow,
  carouselFooterBar,
  carouselSlide,
  carouselTrack,
  carouselWrap,
  clampTwoLines,
  miniTag,
  periodBadge,
  statusVariants,
  tagRow,
} from '../styles/components.css';
import { primaryActionBtn, socialLinkBtn } from '../styles/layout.css';
import { vars } from '../styles/theme.css';

interface HighlightCarouselProps {
  lang: Language;
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
  onNavigatePortfolio: () => void;
  onNavigateResearch: () => void;
}

export const HighlightCarousel: React.FC<HighlightCarouselProps> = ({
  lang,
  posts,
  onSelectPost,
  onNavigatePortfolio,
  onNavigateResearch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const featuredPosts = posts.slice(0, 3);
  const totalSlides = featuredPosts.length + 1;

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isPaused, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div
      className={carouselWrap}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={carouselTrack}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* Slides 1..3: Featured Blog Posts */}
        {featuredPosts.map((post, idx) => (
          <div key={post.slug} className={carouselSlide}>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  marginBottom: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                  <span className={statusVariants.exploring}>
                    <RiSparkling2Line
                      size={13}
                      style={{ marginRight: '0.28rem', verticalAlign: '-2px' }}
                    />
                    {lang === 'ko' ? `추천 아티클 0${idx + 1}` : `Featured Post 0${idx + 1}`}
                  </span>
                  <span className={periodBadge}>{post.category}</span>
                </div>

                <span
                  style={{
                    fontSize: '0.8rem',
                    color: vars.color.textMuted,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <RiCalendarLine size={14} />
                  {post.date}
                </span>
              </div>

              <h2
                onClick={() => onSelectPost(post.slug)}
                className={clampTwoLines}
                style={{
                  fontSize: 'clamp(1.22rem, 2.3vw, 1.68rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.35,
                  margin: '0 0 0.6rem 0',
                  cursor: 'pointer',
                  color: vars.color.textPrimary,
                  wordBreak: 'keep-all',
                }}
              >
                {lang === 'en' && post.titleEn ? post.titleEn : post.title}
              </h2>

              <p
                className={clampTwoLines}
                style={{
                  fontSize: '0.94rem',
                  lineHeight: 1.68,
                  color: vars.color.textSecondary,
                  margin: 0,
                  maxWidth: '820px',
                  wordBreak: 'keep-all',
                }}
              >
                {lang === 'en' && post.summaryEn ? post.summaryEn : post.summary}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.85rem',
                paddingTop: '0.85rem',
                borderTop: `1px solid ${vars.color.border}`,
              }}
            >
              <div className={tagRow}>
                {post.tags.map((t) => (
                  <span key={t} className={miniTag}>
                    #{t}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSelectPost(post.slug)}
                className={primaryActionBtn}
              >
                {lang === 'ko' ? '아티클 읽기' : 'Read Article'}
                <RiArrowRightLine size={15} />
              </button>
            </div>
          </div>
        ))}

        {/* Slide 4: Researcher Portfolio & Labs Spotlight */}
        <div className={carouselSlide}>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                flexWrap: 'wrap',
                marginBottom: '0.85rem',
              }}
            >
              <span className={statusVariants.prior}>
                <RiCpuLine
                  size={13}
                  style={{ marginRight: '0.28rem', verticalAlign: '-2px' }}
                />
                {lang === 'ko' ? '연구자 포트폴리오 하이라이트' : 'Researcher Profile & Labs'}
              </span>
              <span className={periodBadge}>
                {lang === 'ko'
                  ? '국민대 MSL · UC Irvine BIAS Lab'
                  : 'Kookmin Univ. MSL · UC Irvine BIAS Lab'}
              </span>
            </div>

            <h2
              className={clampTwoLines}
              style={{
                fontSize: 'clamp(1.22rem, 2.3vw, 1.68rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.35,
                margin: '0 0 0.6rem 0',
                color: vars.color.textPrimary,
                wordBreak: 'keep-all',
              }}
            >
              {lang === 'ko'
                ? 'OS 커널 I/O · 차세대 스토리지(NVMe/NAND) · 메모리 중심 아키텍처 연구'
                : 'Exploring OS Kernel I/O, NVMe/NAND Storage & Memory-Centric Architectures'}
            </h2>

            <p
              className={clampTwoLines}
              style={{
                fontSize: '0.94rem',
                lineHeight: 1.68,
                color: vars.color.textSecondary,
                margin: 0,
                maxWidth: '820px',
                wordBreak: 'keep-all',
              }}
            >
              {lang === 'ko'
                ? '국민대학교 Memory & Storage Lab 및 UC Irvine BIAS Lab에서의 연구 아카이브, 커널 비동기 I/O(io_uring) 심층 스터디, 그리고 학술 논문(KTCP 2024, KSC 2023 최우수논문상)을 포트폴리오 페이지에서 확인하실 수 있습니다.'
                : 'Explore research archives, Linux kernel io_uring studies, peer-reviewed publications (KTCP 2024 Journal & KSC 2023 Best Paper Award), and open-source systems projects in the Portfolio page.'}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.85rem',
              paddingTop: '0.85rem',
              borderTop: `1px solid ${vars.color.border}`,
            }}
          >
            <div className={tagRow}>
              <span className={miniTag}>#Memory & Storage Lab</span>
              <span className={miniTag}>#UC Irvine BIAS Lab</span>
              <span className={miniTag}>#KSC Best Paper</span>
              <span className={miniTag}>#KTCP Journal</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onNavigateResearch}
                className={socialLinkBtn}
              >
                <RiBookOpenLine size={15} />
                {lang === 'ko' ? '연구·논문 보기' : 'Research & Papers'}
              </button>
              <button
                type="button"
                onClick={onNavigatePortfolio}
                className={primaryActionBtn}
              >
                {lang === 'ko' ? '전체 포트폴리오 보기' : 'View Full Portfolio'}
                <RiArrowRightLine size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Bottom Control Bar */}
      <div className={carouselFooterBar}>
        <div className={carouselDotsRow}>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`${carouselDot} ${currentIndex === i ? carouselDotActive : ''}`}
            />
          ))}
          <span
            style={{
              fontSize: '0.76rem',
              fontWeight: 600,
              color: vars.color.textMuted,
              marginLeft: '0.4rem',
            }}
          >
            0{currentIndex + 1} / 0{totalSlides}
          </span>
        </div>

        <div className={carouselArrowGroup}>
          <button
            type="button"
            onClick={handlePrev}
            className={carouselArrowBtn}
            aria-label="Previous slide"
          >
            <RiArrowLeftSLine size={18} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={carouselArrowBtn}
            aria-label="Next slide"
          >
            <RiArrowRightSLine size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
