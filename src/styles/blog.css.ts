import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const blogFilterBar = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.85rem',
  marginBottom: '1.5rem',
});

export const searchInputWrap = style({
  position: 'relative',
  flex: '1 1 260px',
  maxWidth: '380px',
  '@media': {
    'screen and (max-width: 640px)': {
      maxWidth: '100%',
    },
  },
});

export const searchInput = style({
  width: '100%',
  padding: '0.58rem 0.9rem 0.58rem 2.25rem',
  borderRadius: '999px',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgElevated,
  color: vars.color.textPrimary,
  fontSize: '0.86rem',
  fontFamily: vars.font.sans,
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  ':focus': {
    borderColor: vars.color.accent,
    boxShadow: `0 0 0 3px ${vars.color.accentSoft}`,
  },
});

/* Dedicated Standalone Blog Post Page Styles */
export const readingProgressBar = style({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '3px',
  backgroundColor: vars.color.accent,
  zIndex: 90,
  transition: 'width 0.1s ease-out',
});

export const postPageWrapper = style({
  width: '100%',
  paddingTop: '0.5rem',
});

export const postBreadcrumbRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '0.75rem',
  marginBottom: '1.5rem',
});

export const postHeroHeader = style({
  padding: '2.25rem 2.5rem',
  borderRadius: '1.35rem',
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.card,
  marginBottom: '1.75rem',
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '1.35rem 1.15rem',
      borderRadius: '1.05rem',
    },
  },
});

export const articleTitle = style({
  fontSize: 'clamp(1.65rem, 3.6vw, 2.45rem)',
  fontWeight: 800,
  lineHeight: 1.26,
  letterSpacing: '-0.03em',
  margin: '0.85rem 0 0.55rem',
  color: vars.color.textPrimary,
  wordBreak: 'keep-all',
});

export const articleSubtitle = style({
  fontSize: '1.02rem',
  color: vars.color.textMuted,
  lineHeight: 1.6,
  margin: '0 0 1.25rem',
});

export const postPageGrid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 275px',
  gap: '1.6rem',
  alignItems: 'start',
  '@media': {
    'screen and (max-width: 960px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const articleMainCard = style({
  borderRadius: '1.35rem',
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.card,
  padding: '2.6rem 2.75rem',
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '1.4rem 1.15rem',
      borderRadius: '1.05rem',
    },
  },
});

export const postSidebarSticky = style({
  position: 'sticky',
  top: '5.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '@media': {
    'screen and (max-width: 960px)': {
      position: 'static',
    },
  },
});

export const sidebarBox = style({
  borderRadius: '1.1rem',
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.card,
  padding: '1.25rem',
});

export const tocLink = style({
  display: 'block',
  fontSize: '0.82rem',
  lineHeight: 1.48,
  color: vars.color.textSecondary,
  padding: '0.34rem 0.45rem',
  borderRadius: '0.45rem',
  transition: 'color 0.15s ease, background-color 0.15s ease, transform 0.15s ease',
  ':hover': {
    color: vars.color.accent,
    backgroundColor: vars.color.accentSoft,
    transform: 'translateX(2px)',
  },
});

export const prevNextGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '1rem',
  marginTop: '2rem',
});

/* ============================================================================
 * ENHANCED EDITORIAL & TECHNICAL MARKDOWN TYPOGRAPHY
 * ========================================================================== */
export const markdownBody = style({
  fontSize: '1.03rem',
  lineHeight: 1.88,
  color: vars.color.textSecondary,
  overflowWrap: 'break-word',
  wordBreak: 'keep-all',
  '::after': {
    content: '""',
    display: 'table',
    clear: 'both',
  },
  '@media': {
    'screen and (max-width: 640px)': {
      fontSize: '0.96rem',
      lineHeight: 1.8,
    },
  },
});

globalStyle(`${markdownBody} > *:first-child`, {
  marginTop: '0 !important',
});

globalStyle(`${markdownBody} h1, ${markdownBody} h2, ${markdownBody} h3, ${markdownBody} h4`, {
  color: vars.color.textPrimary,
  fontWeight: 800,
  letterSpacing: '-0.025em',
  lineHeight: 1.35,
  scrollMarginTop: '6rem',
  clear: 'both',
});

globalStyle(`${markdownBody} h1`, {
  fontSize: '1.72rem',
  marginTop: '2.6rem',
  marginBottom: '1rem',
});

globalStyle(`${markdownBody} h2`, {
  display: 'block',
  fontSize: '1.38rem',
  marginTop: '2.4rem',
  marginBottom: '0.9rem',
  paddingBottom: '0.5rem',
  borderBottom: `1px solid ${vars.color.border}`,
  lineHeight: 1.4,
});

globalStyle(`${markdownBody} h3`, {
  display: 'block',
  fontSize: '1.15rem',
  marginTop: '1.85rem',
  marginBottom: '0.6rem',
  lineHeight: 1.42,
});

globalStyle(`${markdownBody} h4`, {
  fontSize: '1.02rem',
  marginTop: '1.45rem',
  marginBottom: '0.5rem',
  color: vars.color.textPrimary,
});

globalStyle(`${markdownBody} p`, {
  marginTop: 0,
  marginBottom: '1.2rem',
});

globalStyle(`${markdownBody} ul, ${markdownBody} ol`, {
  paddingLeft: '1.45rem',
  marginTop: '0.2rem',
  marginBottom: '1.3rem',
});

globalStyle(`${markdownBody} li`, {
  marginBottom: '0.48rem',
  lineHeight: 1.78,
});

globalStyle(`${markdownBody} li::marker`, {
  color: vars.color.accent,
  fontWeight: 700,
});

globalStyle(`${markdownBody} strong`, {
  color: vars.color.textPrimary,
  fontWeight: 750,
});

globalStyle(`${markdownBody} em`, {
  color: vars.color.textPrimary,
  fontStyle: 'italic',
});

globalStyle(`${markdownBody} mark`, {
  backgroundColor: vars.color.accentSoft,
  color: vars.color.accent,
  padding: '0.1rem 0.38rem',
  borderRadius: '0.32rem',
  fontWeight: 600,
});

globalStyle(`${markdownBody} kbd`, {
  fontFamily: vars.font.mono,
  fontSize: '0.78em',
  padding: '0.15rem 0.45rem',
  borderRadius: '0.35rem',
  border: `1px solid ${vars.color.borderStrong}`,
  backgroundColor: vars.color.bgSubtle,
  color: vars.color.textPrimary,
  boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
});

globalStyle(`${markdownBody} a`, {
  color: vars.color.accent,
  fontWeight: 600,
  textDecoration: 'underline',
  textDecorationColor: 'rgba(37, 99, 235, 0.35)',
  textUnderlineOffset: '3px',
  transition: 'text-decoration-color 0.15s ease, color 0.15s ease',
});

globalStyle(`${markdownBody} a:hover`, {
  textDecorationColor: vars.color.accent,
});

globalStyle(`${markdownBody} hr`, {
  border: 'none',
  height: '1px',
  background: `linear-gradient(90deg, transparent, ${vars.color.borderStrong}, transparent)`,
  margin: '2.4rem 0',
  clear: 'both',
});

/* Editorial Blockquote */
globalStyle(`${markdownBody} blockquote`, {
  margin: '1.5rem 0',
  padding: '1rem 1.3rem',
  borderLeft: `4px solid ${vars.color.accent}`,
  backgroundColor: vars.color.bgSubtle,
  borderRadius: '0 0.85rem 0.85rem 0',
  color: vars.color.textPrimary,
  fontSize: '0.98rem',
  lineHeight: 1.78,
  boxShadow: 'inset 0 0 0 1px rgba(148, 163, 184, 0.12)',
});

globalStyle(`${markdownBody} blockquote p:last-child`, {
  marginBottom: 0,
});

/* Inline Code */
globalStyle(`${markdownBody} :not(pre) > code`, {
  fontFamily: vars.font.mono,
  fontSize: '0.84em',
  fontWeight: 600,
  padding: '0.18rem 0.46rem',
  borderRadius: '0.4rem',
  backgroundColor: vars.color.bgSubtle,
  border: `1px solid ${vars.color.border}`,
  color: vars.color.accent,
});

/* Code Block Container with Header Bar */
export const mdCodeBlockWrap = style({
  margin: '1.5rem 0',
  borderRadius: '0.95rem',
  overflow: 'hidden',
  backgroundColor: vars.color.bgCode,
  border: `1px solid ${vars.color.border}`,
  boxShadow: '0 10px 26px -10px rgba(15, 23, 42, 0.25)',
  clear: 'both',
});

export const mdCodeBlockHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.55rem 1rem',
  backgroundColor: 'rgba(15, 23, 42, 0.65)',
  borderBottom: '1px solid rgba(148, 163, 184, 0.16)',
  color: '#94a3b8',
  fontFamily: vars.font.mono,
  fontSize: '0.75rem',
});

export const mdCodeBlockDots = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.38rem',
});

export const mdCodeCopyBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  padding: '0.24rem 0.58rem',
  borderRadius: '0.4rem',
  border: '1px solid rgba(148, 163, 184, 0.24)',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#cbd5e1',
  fontSize: '0.73rem',
  fontFamily: vars.font.sans,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, color 0.15s ease, transform 0.15s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '#ffffff',
  },
});

globalStyle(`${markdownBody} pre`, {
  margin: 0,
  padding: '1.15rem 1.3rem',
  backgroundColor: vars.color.bgCode,
  overflowX: 'auto',
});

globalStyle(`${markdownBody} pre code`, {
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: '#e2e8f0',
  fontFamily: vars.font.mono,
  fontSize: '0.84rem',
  lineHeight: 1.7,
});

/* Academic Math Display Block (.katex-display) */
globalStyle(`${markdownBody} .katex-display`, {
  margin: '1.45rem 0',
  padding: '1.1rem 1.25rem',
  borderRadius: '0.85rem',
  backgroundColor: vars.color.bgSubtle,
  border: `1px solid ${vars.color.border}`,
  overflowX: 'auto',
  overflowY: 'hidden',
});

/* Polished Tables */
export const mdTableWrap = style({
  width: '100%',
  overflowX: 'auto',
  margin: '1.5rem 0',
  borderRadius: '0.85rem',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgCard,
  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
  clear: 'both',
});

globalStyle(`${markdownBody} table`, {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.9rem',
});

globalStyle(`${markdownBody} th, ${markdownBody} td`, {
  borderBottom: `1px solid ${vars.color.border}`,
  padding: '0.72rem 0.95rem',
  textAlign: 'left',
});

globalStyle(`${markdownBody} tr:last-child td`, {
  borderBottom: 'none',
});

globalStyle(`${markdownBody} tbody tr:hover`, {
  backgroundColor: vars.color.bgSubtle,
});

globalStyle(`${markdownBody} th`, {
  backgroundColor: vars.color.bgSubtle,
  color: vars.color.textPrimary,
  fontWeight: 700,
  fontSize: '0.84rem',
  letterSpacing: '0.01em',
});

/* GitHub-Style Callout / Admonition Box */
export const mdCalloutBox = style({
  margin: '1.45rem 0',
  padding: '1rem 1.2rem',
  borderRadius: '0.85rem',
  border: `1px solid ${vars.color.border}`,
  borderLeftWidth: '4px',
  backgroundColor: vars.color.bgSubtle,
  clear: 'both',
});

export const mdCalloutHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
  fontWeight: 800,
  fontSize: '0.88rem',
  marginBottom: '0.4rem',
});

/* ============================================================================
 * FLEXIBLE IMAGE SIZING, ALIGNMENT & GALLERY SYSTEM IN MARKDOWN
 * ========================================================================== */
export const mdFigure = style({
  margin: '1.6rem auto',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  boxSizing: 'border-box',
});

export const mdFigureAlignLeft = style({
  marginLeft: 0,
  marginRight: 'auto',
  alignItems: 'flex-start',
});

export const mdFigureAlignCenter = style({
  marginLeft: 'auto',
  marginRight: 'auto',
  alignItems: 'center',
});

export const mdFigureAlignRight = style({
  marginLeft: 'auto',
  marginRight: 0,
  alignItems: 'flex-end',
});

export const mdFigureFloatLeft = style({
  float: 'left',
  margin: '0.35rem 1.5rem 1rem 0',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 640px)': {
      float: 'none',
      width: '100% !important',
      margin: '1.2rem auto',
    },
  },
});

export const mdFigureFloatRight = style({
  float: 'right',
  margin: '0.35rem 0 1rem 1.5rem',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 640px)': {
      float: 'none',
      width: '100% !important',
      margin: '1.2rem auto',
    },
  },
});

export const mdImageFrame = style({
  position: 'relative',
  width: '100%',
  borderRadius: '0.9rem',
  overflow: 'hidden',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgSubtle,
  boxShadow: '0 8px 24px -8px rgba(15, 23, 42, 0.12)',
  cursor: 'zoom-in',
  transition:
    'transform 0.35s cubic-bezier(0.22, 1.35, 0.36, 1), box-shadow 0.25s ease, border-color 0.25s ease',
  ':hover': {
    transform: 'translateY(-2px)',
    borderColor: vars.color.accent,
    boxShadow: vars.shadow.cardHover,
  },
});

export const mdImageBorderless = style({
  border: 'none',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  borderRadius: '0.5rem',
});

export const mdImageElement = style({
  display: 'block',
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
});

export const mdFigcaption = style({
  marginTop: '0.55rem',
  fontSize: '0.82rem',
  lineHeight: 1.5,
  color: vars.color.textMuted,
  textAlign: 'center',
  width: '100%',
});

/* Multi-Image Grid & Side-by-Side Row Helpers usable in Markdown HTML */
globalStyle(`${markdownBody} .md-grid-2`, {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1rem',
  margin: '1.5rem 0',
  alignItems: 'start',
  clear: 'both',
  '@media': {
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${markdownBody} .md-grid-3`, {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '0.9rem',
  margin: '1.5rem 0',
  alignItems: 'start',
  clear: 'both',
  '@media': {
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

globalStyle(`${markdownBody} .md-grid-2 figure, ${markdownBody} .md-grid-3 figure`, {
  margin: 0,
  width: '100% !important',
});
