import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const spotlightCard = style({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '1.1rem',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgCard,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: vars.shadow.card,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition:
    'border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease, background-color 0.22s ease',
  ':hover': {
    borderColor: vars.color.borderAccent,
    boxShadow: vars.shadow.cardHover,
    backgroundColor: vars.color.bgCardHover,
  },
});

export const spotlightOverlay = style({
  pointerEvents: 'none',
  position: 'absolute',
  inset: '-1px',
  borderRadius: '1.1rem',
  transition: 'opacity 0.25s ease',
});

export const spotlightContent = style({
  position: 'relative',
  zIndex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

/* Card Flex Structure so headers, bodies, and footers align across all cards */
export const cardPadding = style({
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '1.2rem',
    },
  },
});

export const cardBodyGrow = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const cardFooterPinned = style({
  marginTop: 'auto',
  paddingTop: '1rem',
  borderTop: `1px solid ${vars.color.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  gap: '0.75rem',
  minWidth: 0,
  '@media': {
    'screen and (max-width: 540px)': {
      flexWrap: 'wrap',
    },
  },
});

export const clampTwoLines = style({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const clampThreeLines = style({
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

/* Interactive Showcase Carousel Styles */
export const carouselWrap = style({
  position: 'relative',
  borderRadius: '1.35rem',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgElevated,
  boxShadow: vars.shadow.carousel,
  overflow: 'hidden',
  marginBottom: '2.5rem',
  '@media': {
    'screen and (max-width: 640px)': {
      borderRadius: '1.05rem',
      marginBottom: '1.85rem',
    },
  },
});

export const carouselTrack = style({
  display: 'flex',
  alignItems: 'stretch',
  transition: 'transform 0.52s cubic-bezier(0.22, 1, 0.36, 1)',
  willChange: 'transform',
});

export const carouselSlide = style({
  minWidth: '100%',
  minHeight: '260px',
  padding: '2rem 2.25rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '1.15rem',
  position: 'relative',
  '@media': {
    'screen and (max-width: 640px)': {
      minHeight: '240px',
      padding: '1.35rem 1.2rem',
      gap: '0.9rem',
    },
  },
});

export const carouselFooterBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.8rem 2.25rem',
  borderTop: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgSubtle,
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '0.7rem 1.2rem',
    },
  },
});

export const carouselDotsRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
});

export const carouselDot = style({
  width: '0.5rem',
  height: '0.5rem',
  borderRadius: '999px',
  border: 'none',
  padding: 0,
  backgroundColor: vars.color.borderStrong,
  transition: 'all 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)',
  ':hover': {
    transform: 'scale(1.35)',
    backgroundColor: vars.color.accent,
  },
  ':active': {
    transform: 'scale(0.85)',
  },
});

export const carouselDotActive = style({
  width: '1.75rem',
  backgroundColor: vars.color.accent,
});

export const carouselArrowGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const carouselArrowBtn = style({
  width: '2rem',
  height: '2rem',
  borderRadius: '999px',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgElevated,
  color: vars.color.textSecondary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition:
    'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
  ':hover': {
    borderColor: vars.color.accent,
    color: vars.color.accent,
    transform: 'translateY(-1.5px) scale(1.1)',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.16)',
  },
  ':active': {
    transform: 'scale(0.86)',
  },
});

export const sectionBlock = style({
  marginBottom: '3.25rem',
  scrollMarginTop: '5.8rem',
  '@media': {
    'screen and (max-width: 640px)': {
      marginBottom: '2.4rem',
    },
  },
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '0.75rem',
  marginBottom: '1.35rem',
});

export const sectionTitleGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
});

export const sectionEyebrow = style({
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: vars.color.accent,
  fontWeight: 700,
});

export const sectionTitle = style({
  fontSize: 'clamp(1.2rem, 2.5vw, 1.42rem)',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const sectionDesc = style({
  fontSize: '0.9rem',
  color: vars.color.textMuted,
  margin: 0,
  lineHeight: 1.55,
});

/* Portfolio CV Overview Hero & Research Pillar Styles */
export const pageIntroHero = style({
  borderRadius: '1.25rem',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgElevated,
  boxShadow: vars.shadow.card,
  padding: '1.95rem 2.1rem',
  marginBottom: '2.25rem',
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${vars.color.accent} 0%, ${vars.color.accentSecondary} 55%, transparent 100%)`,
    opacity: 0.85,
  },
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '1.35rem 1.2rem',
      marginBottom: '1.85rem',
    },
  },
});

export const cvHeroGrid = style({
  display: 'grid',
  gridTemplateColumns: '1.25fr 1fr',
  gap: '1.5rem',
  alignItems: 'stretch',
  '@media': {
    'screen and (max-width: 860px)': {
      gridTemplateColumns: '1fr',
      gap: '1.2rem',
    },
  },
});

export const statBentoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '0.85rem',
  '@media': {
    'screen and (max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const statBentoCard = style({
  padding: '1.05rem 1.15rem',
  borderRadius: '0.9rem',
  backgroundColor: vars.color.bgSubtle,
  border: `1px solid ${vars.color.border}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '0.3rem',
  transition:
    'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.22s ease, box-shadow 0.25s ease, background-color 0.22s ease',
  ':hover': {
    borderColor: vars.color.borderAccent,
    backgroundColor: vars.color.bgElevated,
    transform: 'translateY(-3.5px) scale(1.022)',
    boxShadow: '0 10px 24px -8px rgba(37, 99, 235, 0.14)',
  },
  ':active': {
    transform: 'translateY(1px) scale(0.965)',
  },
});

export const statNumber = style({
  fontSize: '1.65rem',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  color: vars.color.accent,
  lineHeight: 1.1,
});

export const timelineCompactList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.65rem',
  margin: '1rem 0',
});

export const timelineCompactItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.28rem',
  padding: '0.8rem 0.95rem',
  borderRadius: '0.75rem',
  backgroundColor: vars.color.bgSubtle,
  border: `1px solid ${vars.color.border}`,
  transition:
    'transform 0.36s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, background-color 0.2s ease',
  ':hover': {
    borderColor: vars.color.borderAccent,
    backgroundColor: vars.color.bgElevated,
    transform: 'translateX(4px) scale(1.008)',
  },
});

export const timelineItemHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.65rem',
  width: '100%',
  '@media': {
    'screen and (max-width: 520px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.35rem',
    },
  },
});

export const pillarNumberBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.8rem',
  height: '1.8rem',
  borderRadius: '0.55rem',
  backgroundColor: vars.color.accentSoft,
  color: vars.color.accent,
  fontWeight: 800,
  fontSize: '0.8rem',
  fontFamily: vars.font.mono,
  flexShrink: 0,
});

/* Interactive Vertical Career & Research Timeline */
export const verticalTimelineWrap = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.15rem',
  paddingLeft: '2.1rem',
  '::before': {
    content: '""',
    position: 'absolute',
    left: '0.68rem',
    top: '0.75rem',
    bottom: '0.75rem',
    width: '2px',
    background: `linear-gradient(180deg, ${vars.color.accent} 0%, ${vars.color.accentSecondary} 55%, ${vars.color.borderStrong} 100%)`,
    borderRadius: '999px',
  },
  '@media': {
    'screen and (max-width: 640px)': {
      paddingLeft: '1.65rem',
      '::before': {
        left: '0.5rem',
      },
    },
  },
});

export const verticalTimelineRow = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

export const verticalTimelineDot = style({
  position: 'absolute',
  left: '-1.85rem',
  top: '1.25rem',
  width: '0.92rem',
  height: '0.92rem',
  borderRadius: '999px',
  backgroundColor: vars.color.bgElevated,
  border: `3px solid ${vars.color.accent}`,
  boxShadow: `0 0 0 4px ${vars.color.accentSoft}`,
  zIndex: 2,
  transition:
    'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.25s ease, box-shadow 0.25s ease',
  selectors: {
    [`${verticalTimelineRow}:hover &`]: {
      transform: 'scale(1.32)',
      backgroundColor: vars.color.accent,
      boxShadow: '0 0 0 6px rgba(37, 99, 235, 0.22)',
    },
  },
  '@media': {
    'screen and (max-width: 640px)': {
      left: '-1.55rem',
      width: '0.82rem',
      height: '0.82rem',
    },
  },
});

export const verticalTimelineCard = style({
  padding: '1.25rem 1.4rem',
  borderRadius: '1rem',
  backgroundColor: vars.color.bgCard,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.card,
  transition:
    'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.22s ease, box-shadow 0.25s ease, background-color 0.22s ease',
  ':hover': {
    borderColor: vars.color.borderAccent,
    backgroundColor: vars.color.bgCardHover,
    transform: 'translateX(5px) translateY(-2px) scale(1.006)',
    boxShadow: vars.shadow.cardHover,
  },
  ':active': {
    transform: 'translateX(2px) scale(0.99)',
  },
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '1.05rem 1.1rem',
    },
  },
});

export const gridTwoCol = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1.15rem',
  alignItems: 'stretch',
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '0.95rem',
    },
  },
});

export const gridThreeCol = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '0.9rem',
  alignItems: 'stretch',
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    'screen and (max-width: 580px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const stackList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const labHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '0.75rem',
  paddingBottom: '1.1rem',
  marginBottom: '1.15rem',
  borderBottom: `1px solid ${vars.color.border}`,
});

export const labTitle = style({
  fontSize: '1.14rem',
  fontWeight: 700,
  lineHeight: 1.38,
  margin: '0 0 0.25rem 0',
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
});

export const labMeta = style({
  fontSize: '0.86rem',
  color: vars.color.textSecondary,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.45rem',
});

export const periodBadge = style({
  fontSize: '0.75rem',
  fontWeight: 600,
  padding: '0.22rem 0.65rem',
  borderRadius: '999px',
  backgroundColor: vars.color.bgSubtle,
  color: vars.color.textSecondary,
  border: `1px solid ${vars.color.border}`,
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export const topicGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '0.95rem',
  alignItems: 'stretch',
  '@media': {
    'screen and (max-width: 820px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const topicItem = style({
  padding: '1.15rem 1.2rem',
  borderRadius: '0.9rem',
  backgroundColor: vars.color.bgSubtle,
  border: `1px solid ${vars.color.border}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  minWidth: 0,
  maxWidth: '100%',
  boxSizing: 'border-box',
  transition:
    'transform 0.36s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.22s ease, box-shadow 0.25s ease',
  ':hover': {
    borderColor: vars.color.borderAccent,
    transform: 'translateY(-2.5px) scale(1.008)',
    boxShadow: '0 8px 20px -8px rgba(37, 99, 235, 0.1)',
  },
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '1rem',
    },
  },
});

export const topicTopRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  gap: '0.5rem',
  marginBottom: '0.5rem',
  minWidth: 0,
  width: '100%',
});

export const topicTitle = style({
  fontSize: '1.01rem',
  fontWeight: 700,
  lineHeight: 1.42,
  margin: '0 0 0.4rem 0',
  color: vars.color.textPrimary,
  wordBreak: 'keep-all',
});

export const statusVariants = styleVariants({
  exploring: {
    fontSize: '0.73rem',
    fontWeight: 600,
    padding: '0.2rem 0.62rem',
    borderRadius: '999px',
    backgroundColor: vars.color.accentSoft,
    color: vars.color.accent,
    border: `1px solid ${vars.color.borderAccent}`,
    whiteSpace: 'nowrap',
  },
  prior: {
    fontSize: '0.73rem',
    fontWeight: 600,
    padding: '0.2rem 0.62rem',
    borderRadius: '999px',
    backgroundColor: vars.color.accentSecondarySoft,
    color: vars.color.accentSecondary,
    border: `1px solid rgba(79, 70, 229, 0.25)`,
    whiteSpace: 'nowrap',
  },
  study: {
    fontSize: '0.73rem',
    fontWeight: 600,
    padding: '0.2rem 0.62rem',
    borderRadius: '999px',
    backgroundColor: vars.color.emeraldSoft,
    color: vars.color.emerald,
    border: `1px solid rgba(5, 150, 105, 0.25)`,
    whiteSpace: 'nowrap',
  },
  archived: {
    fontSize: '0.73rem',
    fontWeight: 600,
    padding: '0.2rem 0.62rem',
    borderRadius: '999px',
    backgroundColor: vars.color.amberSoft,
    color: vars.color.amber,
    border: `1px solid rgba(217, 119, 6, 0.25)`,
    whiteSpace: 'nowrap',
  },
});

export const paragraphText = style({
  fontSize: '0.92rem',
  lineHeight: 1.68,
  color: vars.color.textSecondary,
  margin: '0.35rem 0 0.85rem',
  wordBreak: 'keep-all',
});

export const tagRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.36rem',
  alignItems: 'center',
  minWidth: 0,
  flex: '1 1 auto',
});

export const miniTag = style({
  fontSize: '0.74rem',
  fontWeight: 500,
  padding: '0.18rem 0.54rem',
  borderRadius: '0.4rem',
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  color: vars.color.textSecondary,
  whiteSpace: 'nowrap',
  transition:
    'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, color 0.2s ease',
  ':hover': {
    borderColor: vars.color.borderAccent,
    color: vars.color.accent,
    transform: 'translateY(-1.5px) scale(1.05)',
  },
});

export const referenceBox = style({
  marginTop: '0.75rem',
  padding: '0.85rem 1rem',
  borderRadius: '0.65rem',
  backgroundColor: vars.color.bgElevated,
  borderLeft: `3px solid ${vars.color.accentSecondary}`,
  fontSize: '0.82rem',
  color: vars.color.textSecondary,
  minWidth: 0,
  maxWidth: '100%',
  boxSizing: 'border-box',
  overflowWrap: 'anywhere',
  wordBreak: 'keep-all',
});

export const referenceList = style({
  margin: '0.45rem 0 0',
  paddingLeft: '1.1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.42rem',
  lineHeight: 1.55,
});

export const referenceTitleLink = style({
  display: 'inline',
  color: vars.color.accent,
  fontSize: '0.83rem',
  fontWeight: 600,
  whiteSpace: 'normal',
  overflowWrap: 'anywhere',
  wordBreak: 'keep-all',
  lineHeight: 1.5,
  ':hover': {
    textDecoration: 'underline',
  },
});

export const inlineExternalLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.28rem',
  color: vars.color.accent,
  fontSize: '0.82rem',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  flexShrink: 0,
  lineHeight: 1.45,
  ':hover': {
    textDecoration: 'underline',
  },
});

export const lineageBanner = style({
  padding: '0.85rem 1.05rem',
  borderRadius: '0.8rem',
  backgroundColor: vars.color.accentSoft,
  border: `1px solid ${vars.color.borderAccent}`,
  color: vars.color.textSecondary,
  fontSize: '0.85rem',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
});

export const pubTitle = style({
  fontSize: 'clamp(1.04rem, 1.9vw, 1.15rem)',
  fontWeight: 700,
  lineHeight: 1.44,
  margin: '0.35rem 0 0.25rem',
  color: vars.color.textPrimary,
  wordBreak: 'keep-all',
});

export const pubSubTitle = style({
  fontSize: '0.88rem',
  color: vars.color.textMuted,
  margin: '0 0 0.65rem',
  lineHeight: 1.5,
});

export const authorMe = style({
  fontWeight: 700,
  color: vars.color.accent,
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
});

export const bibtexPre = style({
  marginTop: '0.85rem',
  padding: '0.9rem 1rem',
  borderRadius: '0.65rem',
  backgroundColor: vars.color.bgCode,
  border: `1px solid ${vars.color.border}`,
  color: '#e2e8f0',
  fontFamily: vars.font.mono,
  fontSize: '0.78rem',
  overflowX: 'auto',
  lineHeight: 1.6,
});

export const awardBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.32rem',
  padding: '0.24rem 0.62rem',
  borderRadius: '0.6rem',
  fontSize: '0.74rem',
  fontWeight: 600,
  lineHeight: 1.4,
  backgroundColor: vars.color.amberSoft,
  color: vars.color.amber,
  border: `1px solid rgba(217, 119, 6, 0.28)`,
  whiteSpace: 'normal',
  wordBreak: 'keep-all',
  overflowWrap: 'anywhere',
  maxWidth: '100%',
  boxSizing: 'border-box',
});

export const bulletList = style({
  margin: '0.5rem 0 0.85rem',
  paddingLeft: '1.15rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
  fontSize: '0.88rem',
  lineHeight: 1.62,
  color: vars.color.textSecondary,
  wordBreak: 'keep-all',
});

export const photoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  gap: '1.15rem',
  alignItems: 'stretch',
  '@media': {
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const photoImageWrap = style({
  width: '100%',
  height: '220px',
  overflow: 'hidden',
  backgroundColor: vars.color.bgSubtle,
  position: 'relative',
  flexShrink: 0,
});

export const photoImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.45s ease',
  selectors: {
    [`${spotlightCard}:hover &`]: {
      transform: 'scale(1.04)',
    },
  },
});

export const modalBackdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 80,
  backgroundColor: 'rgba(15, 23, 42, 0.55)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
});

export const modalCard = style({
  maxWidth: '920px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  borderRadius: '1.2rem',
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.modal,
  padding: '1.5rem',
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '1.1rem',
    },
  },
});

/* Collapsible Project / Work Details Trigger & Panel */
export const projectExpandBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: '0.5rem',
  padding: '0.55rem 0.85rem',
  marginTop: '0.35rem',
  marginBottom: '0.5rem',
  borderRadius: '0.75rem',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgSubtle,
  color: vars.color.textPrimary,
  fontSize: '0.8rem',
  fontWeight: 650,
  cursor: 'pointer',
  transition:
    'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
  ':hover': {
    borderColor: vars.color.accent,
    backgroundColor: vars.color.accentSoft,
    color: vars.color.accent,
    transform: 'translateY(-1px)',
  },
  ':active': {
    transform: 'scale(0.98)',
  },
});

export const projectExpandedBox = style({
  marginTop: '0.35rem',
  marginBottom: '0.65rem',
  padding: '0.85rem 1rem',
  borderRadius: '0.85rem',
  backgroundColor: vars.color.bgSubtle,
  border: `1px solid ${vars.color.border}`,
});

/* Sticky Portfolio Quick-Jump Section Dock */
export const sectionQuickDock = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
  flexWrap: 'wrap',
  padding: '0.6rem 0.85rem',
  marginBottom: '2.25rem',
  borderRadius: '0.95rem',
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.card,
});

export const sectionDockItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  padding: '0.36rem 0.72rem',
  borderRadius: '999px',
  border: `1px solid transparent`,
  backgroundColor: vars.color.bgSubtle,
  color: vars.color.textSecondary,
  fontSize: '0.78rem',
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
  transition:
    'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
  ':hover': {
    borderColor: vars.color.accent,
    backgroundColor: vars.color.accentSoft,
    color: vars.color.accent,
    transform: 'translateY(-1.5px)',
  },
});

export const scrollTopFab = style({
  position: 'fixed',
  right: '1.5rem',
  bottom: '1.5rem',
  zIndex: 60,
  width: '2.65rem',
  height: '2.65rem',
  borderRadius: '999px',
  border: `1px solid ${vars.color.borderStrong}`,
  backgroundColor: vars.color.bgElevated,
  color: vars.color.accent,
  boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.18)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition:
    'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, border-color 0.2s ease',
  ':hover': {
    transform: 'translateY(-3px) scale(1.08)',
    borderColor: vars.color.accent,
    backgroundColor: vars.color.accentSoft,
  },
  ':active': {
    transform: 'scale(0.92)',
  },
});
