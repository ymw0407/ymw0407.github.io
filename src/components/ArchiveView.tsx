import React, { useEffect, useState } from 'react';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiAwardLine,
  RiBookOpenLine,
  RiCameraLensLine,
  RiCloseLine,
  RiExternalLinkLine,
  RiFullscreenLine,
  RiShieldCheckLine,
} from 'react-icons/ri';
import {
  ESSAY_PUBLICATIONS,
  Language,
  OTHER_ARCHIVE_ACTIVITIES,
  PHOTO_ARCHIVE,
  PhotoArchiveItem,
} from '../data/careerData';
import { SpotlightCard } from './SpotlightCard';
import { LoadingImage } from './LoadingImage';
import { desktopOnly } from '../styles/mobile.css';
import {
  awardBadge,
  cardBodyGrow,
  cardFooterPinned,
  cardPadding,
  carouselArrowBtn,
  carouselArrowGroup,
  carouselDot,
  carouselDotActive,
  carouselDotsRow,
  carouselFooterBar,
  carouselTrack,
  carouselWrap,
  inlineExternalLink,
  labTitle,
  modalBackdrop,
  modalCard,
  paragraphText,
  periodBadge,
  photoGrid,
  photoImageWrap,
  photoImg,
  pubTitle,
  sectionBlock,
  sectionDesc,
  sectionEyebrow,
  sectionHeader,
  sectionTitle,
  sectionTitleGroup,
  stackList,
  topicItem,
  topicTopRow,
} from '../styles/components.css';
import { iconControlBtn } from '../styles/layout.css';
import { vars } from '../styles/theme.css';

interface ArchiveViewProps {
  lang: Language;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ lang }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoArchiveItem | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % PHOTO_ARCHIVE.length);
    }, 5000);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <div>
      {/* 1. AWARD-WINNING PHOTOGRAPHY CAROUSEL + GALLERY */}
      <section className={sectionBlock}>
        <div className={sectionHeader}>
          <div className={sectionTitleGroup}>
            <span className={sectionEyebrow}>Archive · Award-Winning Photography</span>
            <h2 className={sectionTitle}>
              <RiCameraLensLine size={22} color={vars.color.accent} />
              {lang === 'ko'
                ? '사진 공모전 수상작 아카이브 (Photography Gallery)'
                : 'Award-Winning Photography Archive'}
            </h2>
            <p className={sectionDesc}>
              {lang === 'ko'
                ? '기술·연구 중심 학술 포트폴리오와 분리하여 보존 중인 사진 공모전 수상작 5점입니다.'
                : 'Five award-winning photographs preserved in this personal archive, kept separate from the main academic CV.'}
            </p>
          </div>
        </div>

        <div className={desktopOnly}>
        {/* Interactive Photo Showcase Carousel */}
        <div
          className={carouselWrap}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className={carouselTrack}
            style={{ transform: `translateX(-${slideIdx * 100}%)` }}
          >
            {PHOTO_ARCHIVE.map((photo) => (
              <div
                key={photo.id}
                style={{
                  minWidth: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    height: '320px',
                    backgroundColor: '#0f172a',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <LoadingImage
                    lang={lang}
                    src={photo.imagePath}
                    alt={photo.titleKo}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                <div style={{ padding: '1.75rem 1.85rem' }}>
                  <div style={{ marginBottom: '0.85rem' }}>
                    <span className={awardBadge}>
                      <RiAwardLine size={14} />
                      {photo.award[lang]}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(1.2rem, 2.3vw, 1.5rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      margin: '0 0 0.45rem 0',
                      wordBreak: 'keep-all',
                    }}
                  >
                    {lang === 'ko' ? `「${photo.titleKo}」` : `“${photo.titleEn}”`}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: vars.color.textSecondary,
                      margin: '0 0 1.2rem 0',
                    }}
                  >
                    {photo.issuer[lang]} · {photo.date}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className={iconControlBtn}
                  >
                    <RiFullscreenLine size={14} />
                    {lang === 'ko' ? '원본 비율 크게 보기' : 'View Full Resolution'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={carouselFooterBar}>
            <div className={carouselDotsRow}>
              {PHOTO_ARCHIVE.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSlideIdx(i)}
                  className={`${carouselDot} ${slideIdx === i ? carouselDotActive : ''}`}
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
                0{slideIdx + 1} / 0{PHOTO_ARCHIVE.length}
              </span>
            </div>

            <div className={carouselArrowGroup}>
              <button
                type="button"
                onClick={() =>
                  setSlideIdx((prev) => (prev - 1 + PHOTO_ARCHIVE.length) % PHOTO_ARCHIVE.length)
                }
                className={carouselArrowBtn}
              >
                <RiArrowLeftSLine size={18} />
              </button>
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev + 1) % PHOTO_ARCHIVE.length)}
                className={carouselArrowBtn}
              >
                <RiArrowRightSLine size={18} />
              </button>
            </div>
          </div>
        </div>

        </div>
        {/* Equal-Height Grid View Below */}
        <div className={photoGrid}>
          {PHOTO_ARCHIVE.map((photo) => (
            <SpotlightCard
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className={photoImageWrap}>
                <LoadingImage
                  lang={lang}
                  src={photo.imagePath}
                  alt={lang === 'ko' ? photo.titleKo : photo.titleEn}
                  className={photoImg}
                  loading="lazy"
                />
              </div>
              <div className={cardPadding} style={{ padding: '1.25rem' }}>
                <div className={cardBodyGrow}>
                  <div style={{ marginBottom: '0.55rem' }}>
                    <span className={awardBadge}>
                      <RiAwardLine size={13} />
                      {photo.award[lang]}
                    </span>
                  </div>

                  <h3 className={pubTitle} style={{ marginTop: '0.2rem', fontSize: '1.06rem' }}>
                    {lang === 'ko' ? `「${photo.titleKo}」` : `“${photo.titleEn}”`}
                  </h3>
                </div>

                <div className={cardFooterPinned} style={{ paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: vars.color.textMuted }}>
                    {photo.issuer[lang]}
                  </span>
                  <span className={periodBadge}>{photo.date}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 2. ESSAY & OTHER ARCHIVAL RECORDS */}
      <section className={sectionBlock}>
        <div className={sectionHeader}>
          <div className={sectionTitleGroup}>
            <span className={sectionEyebrow}>Archive · Essays & Service Activities</span>
            <h2 className={sectionTitle}>
              <RiBookOpenLine size={22} color={vars.color.accent} />
              {lang === 'ko'
                ? '수필 기고 및 기타 활동 기록'
                : 'Personal Essays & Other Archival Records'}
            </h2>
            <p className={sectionDesc}>
              {lang === 'ko'
                ? '비학술 출판물(수필) 및 기타 봉사·모니터단 활동 기록입니다.'
                : 'Non-academic essay contributions and service records.'}
            </p>
          </div>
        </div>

        <div className={stackList}>
          {ESSAY_PUBLICATIONS.map((essay) => (
            <SpotlightCard key={essay.titleEn}>
              <div className={cardPadding}>
                <div className={topicTopRow}>
                  <span className={periodBadge}>Magazine Essay</span>
                  <span className={periodBadge}>{essay.date}</span>
                </div>
                <h3 className={pubTitle}>
                  {lang === 'ko' ? `“${essay.titleKo}”` : `“${essay.titleEn}”`}
                </h3>
                <p className={paragraphText} style={{ marginBottom: '0.5rem' }}>
                  {essay.author} · <em>{essay.venue[lang]}</em>
                </p>
                <p style={{ fontSize: '0.82rem', color: vars.color.textMuted, marginBottom: '0.85rem' }}>
                  {essay.note[lang]}
                </p>
                <div className={cardFooterPinned}>
                  <a
                    href={essay.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={inlineExternalLink}
                  >
                    {lang === 'ko' ? '해군 웹진 공식 원문 PDF 보기' : 'View Official Webzine PDF'}
                    <RiExternalLinkLine size={14} />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}

          <SpotlightCard>
            <div className={cardPadding}>
              <h3 className={labTitle} style={{ marginBottom: '0.85rem' }}>
                <RiShieldCheckLine size={19} color={vars.color.emerald} />
                {lang === 'ko' ? '기타 활동 (Other Service Records)' : 'Other Service Activities'}
              </h3>
              {OTHER_ARCHIVE_ACTIVITIES.map((act) => (
                <div key={act.period} className={topicItem}>
                  <div className={topicTopRow}>
                    <strong>{act.title[lang]}</strong>
                    <span className={periodBadge}>{act.period}</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: vars.color.textSecondary, marginTop: '0.25rem' }}>
                    {act.note[lang]}
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Lightbox Modal for Selected Photo */}
      {selectedPhoto && (
        <div className={modalBackdrop} onClick={() => setSelectedPhoto(null)}>
          <div className={modalCard} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>
                  {lang === 'ko'
                    ? `「${selectedPhoto.titleKo}」`
                    : `“${selectedPhoto.titleEn}”`}
                </h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.83rem', color: vars.color.textSecondary }}>
                  {selectedPhoto.award[lang]} · {selectedPhoto.issuer[lang]} ({selectedPhoto.date})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className={iconControlBtn}
              >
                <RiCloseLine size={16} />
              </button>
            </div>
            <div
              style={{
                borderRadius: '0.75rem',
                overflow: 'hidden',
                backgroundColor: '#020617',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <LoadingImage
                lang={lang}
                src={selectedPhoto.imagePath}
                alt={selectedPhoto.titleKo}
                style={{
                  maxWidth: '100%',
                  maxHeight: '72vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
