import { keyframes, style } from '@vanilla-extract/css';
import { vars } from './theme.css';

const SPRING_BOUNCE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const SPRING_SMOOTH = 'cubic-bezier(0.22, 1, 0.36, 1)';

const jellyPop = keyframes({
  '0%': { transform: 'scale(0.88)' },
  '55%': { transform: 'scale(1.06)' },
  '80%': { transform: 'scale(0.98)' },
  '100%': { transform: 'scale(1)' },
});

const drawerSpringDown = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-10px) scale(0.96)' },
  '65%': { opacity: 1, transform: 'translateY(2px) scale(1.01)' },
  '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
});

export const appShell = style({
  minHeight: '100vh',
  backgroundColor: vars.color.bgPrimary,
  color: vars.color.textPrimary,
  fontFamily: vars.font.sans,
  position: 'relative',
  overflowX: 'hidden',
  transition: 'background-color 0.25s ease, color 0.25s ease',
});

export const backgroundCanvasWrap = style({
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
});

export const backgroundCanvas = style({
  width: '100%',
  height: '100%',
  display: 'block',
});

export const contentLayer = style({
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

/* Sleek Floating Glass Capsule Navigation Bar */
export const navbarOuter = style({
  position: 'sticky',
  top: '0.85rem',
  zIndex: 50,
  padding: '0 1.25rem',
  marginBottom: '0.5rem',
  '@media': {
    'screen and (max-width: 640px)': {
      top: '0.55rem',
      padding: '0 0.75rem',
    },
  },
});

export const navbarPill = style({
  maxWidth: '1060px',
  margin: '0 auto',
  padding: '0.45rem 0.6rem 0.45rem 0.85rem',
  borderRadius: '999px',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  backgroundColor: vars.color.bgGlass,
  border: `1px solid ${vars.color.border}`,
  boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.03)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  transition: `border-color 0.25s ease, box-shadow 0.3s ${SPRING_SMOOTH}, transform 0.35s ${SPRING_BOUNCE}`,
  ':hover': {
    borderColor: vars.color.borderStrong,
    boxShadow: '0 14px 36px -10px rgba(37, 99, 235, 0.12), 0 4px 10px rgba(15, 23, 42, 0.04)',
  },
});

export const brandButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
  background: 'none',
  border: 'none',
  padding: '0.2rem 0.4rem',
  color: vars.color.textPrimary,
  textAlign: 'left',
  borderRadius: '999px',
  flexShrink: 0,
  transition: `transform 0.38s ${SPRING_BOUNCE}`,
  ':hover': {
    transform: 'translateY(-1.5px) scale(1.03)',
  },
  ':active': {
    transform: 'translateY(1px) scale(0.94)',
  },
});

export const brandAvatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '999px',
  transition: `transform 0.48s ${SPRING_BOUNCE}`,
  selectors: {
    [`${brandButton}:hover &`]: {
      transform: 'scale(1.1) rotate(10deg)',
    },
    [`${brandButton}:active &`]: {
      transform: 'scale(0.92) rotate(-6deg)',
    },
  },
});

export const brandTextWrap = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.4rem',
});

export const brandName = style({
  fontWeight: 700,
  fontSize: '0.96rem',
  letterSpacing: '-0.02em',
  color: vars.color.textPrimary,
});

export const brandSub = style({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: vars.color.accent,
  padding: '0.1rem 0.45rem',
  borderRadius: '999px',
  backgroundColor: vars.color.accentSoft,
  '@media': {
    'screen and (max-width: 480px)': {
      display: 'none',
    },
  },
});

export const desktopNavGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.24rem',
  padding: '0.22rem',
  borderRadius: '999px',
  backgroundColor: vars.color.bgSubtle,
  border: `1px solid ${vars.color.border}`,
  '@media': {
    'screen and (max-width: 860px)': {
      display: 'none',
    },
  },
});

export const navPillItem = style({
  padding: '0.42rem 0.88rem',
  borderRadius: '999px',
  border: 'none',
  background: 'transparent',
  color: vars.color.textSecondary,
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.38rem',
  whiteSpace: 'nowrap',
  transition: `transform 0.38s ${SPRING_BOUNCE}, background-color 0.2s ease, color 0.2s ease, box-shadow 0.25s ease`,
  ':hover': {
    color: vars.color.textPrimary,
    backgroundColor: vars.color.bgCardHover,
    transform: 'translateY(-1.5px) scale(1.04)',
  },
  ':active': {
    transform: 'translateY(1px) scale(0.92)',
  },
});

export const navPillItemActive = style({
  backgroundColor: vars.color.bgElevated,
  color: vars.color.accent,
  boxShadow: '0 3px 10px rgba(37, 99, 235, 0.14), 0 1px 3px rgba(15, 23, 42, 0.06)',
  animation: `${jellyPop} 0.38s ${SPRING_BOUNCE}`,
  ':hover': {
    color: vars.color.accent,
    backgroundColor: vars.color.bgElevated,
    transform: 'translateY(-1.5px) scale(1.04)',
  },
});

export const navCountPill = style({
  fontSize: '0.7rem',
  fontWeight: 700,
  padding: '0.06rem 0.4rem',
  borderRadius: '999px',
  backgroundColor: vars.color.accentSoft,
  color: vars.color.accent,
  transition: `transform 0.35s ${SPRING_BOUNCE}`,
  selectors: {
    [`${navPillItem}:hover &`]: {
      transform: 'scale(1.1)',
    },
  },
});

export const navControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.38rem',
  flexShrink: 0,
});

export const langSegmentWrap = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.16rem',
  borderRadius: '999px',
  backgroundColor: vars.color.bgSubtle,
  border: `1px solid ${vars.color.border}`,
});

export const langSegmentBtn = style({
  border: 'none',
  background: 'transparent',
  padding: '0.24rem 0.56rem',
  borderRadius: '999px',
  fontSize: '0.74rem',
  fontWeight: 700,
  color: vars.color.textMuted,
  transition: `transform 0.35s ${SPRING_BOUNCE}, background-color 0.2s ease, color 0.2s ease`,
  ':hover': {
    color: vars.color.textPrimary,
    transform: 'scale(1.06)',
  },
  ':active': {
    transform: 'scale(0.9)',
  },
});

export const langSegmentBtnActive = style({
  backgroundColor: vars.color.bgElevated,
  color: vars.color.accent,
  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.1)',
  animation: `${jellyPop} 0.35s ${SPRING_BOUNCE}`,
});

export const iconControlBtn = style({
  height: '2.05rem',
  padding: '0 0.7rem',
  borderRadius: '999px',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgElevated,
  color: vars.color.textSecondary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.35rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  transition: `transform 0.38s ${SPRING_BOUNCE}, border-color 0.2s ease, color 0.2s ease, box-shadow 0.25s ease`,
  ':hover': {
    borderColor: vars.color.borderAccent,
    color: vars.color.accent,
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 6px 14px -4px rgba(37, 99, 235, 0.18)',
  },
  ':active': {
    transform: 'translateY(1px) scale(0.91)',
  },
});

export const mobileMenuBtn = style({
  width: '2.1rem',
  height: '2.1rem',
  borderRadius: '999px',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgElevated,
  color: vars.color.textPrimary,
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  transition: `transform 0.38s ${SPRING_BOUNCE}, border-color 0.2s ease`,
  ':hover': {
    borderColor: vars.color.borderAccent,
    transform: 'scale(1.07)',
  },
  ':active': {
    transform: 'scale(0.88)',
  },
  '@media': {
    'screen and (max-width: 860px)': {
      display: 'inline-flex',
    },
  },
});

export const mobileDrawer = style({
  maxWidth: '1060px',
  margin: '0.5rem auto 0',
  padding: '0.75rem',
  borderRadius: '1.25rem',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  boxShadow: '0 16px 36px -8px rgba(15, 23, 42, 0.14)',
  display: 'none',
  flexDirection: 'column',
  gap: '0.3rem',
  animation: `${drawerSpringDown} 0.38s ${SPRING_BOUNCE}`,
  '@media': {
    'screen and (max-width: 860px)': {
      display: 'flex',
    },
  },
});

export const mobileNavLink = style({
  width: '100%',
  padding: '0.75rem 0.95rem',
  borderRadius: '0.85rem',
  border: 'none',
  backgroundColor: 'transparent',
  color: vars.color.textSecondary,
  fontSize: '0.94rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'left',
  transition: `transform 0.35s ${SPRING_BOUNCE}, background-color 0.18s ease, color 0.18s ease`,
  ':hover': {
    backgroundColor: vars.color.bgSubtle,
    color: vars.color.textPrimary,
    transform: 'translateX(4px) scale(1.01)',
  },
  ':active': {
    transform: 'scale(0.96)',
  },
});

export const mobileNavLinkActive = style({
  backgroundColor: vars.color.accentSoft,
  color: vars.color.accent,
});

/* Filter Pills inside pages */
export const navTab = style({
  padding: '0.45rem 0.92rem',
  borderRadius: '999px',
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgCard,
  color: vars.color.textSecondary,
  fontSize: '0.84rem',
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  whiteSpace: 'nowrap',
  transition: `transform 0.38s ${SPRING_BOUNCE}, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, box-shadow 0.25s ease`,
  ':hover': {
    borderColor: vars.color.borderAccent,
    color: vars.color.textPrimary,
    transform: 'translateY(-2px) scale(1.045)',
    boxShadow: '0 6px 14px -4px rgba(37, 99, 235, 0.14)',
  },
  ':active': {
    transform: 'translateY(1px) scale(0.92)',
  },
});

export const navTabActive = style({
  backgroundColor: vars.color.accent,
  borderColor: vars.color.accent,
  color: '#ffffff',
  fontWeight: 600,
  boxShadow: '0 6px 16px -4px rgba(37, 99, 235, 0.35)',
  animation: `${jellyPop} 0.38s ${SPRING_BOUNCE}`,
  ':hover': {
    color: '#ffffff',
    backgroundColor: vars.color.accentHover,
    transform: 'translateY(-2px) scale(1.045)',
  },
});

export const mainContainer = style({
  maxWidth: '1060px',
  width: '100%',
  margin: '0 auto',
  padding: '2rem 1.25rem 5rem',
  flex: 1,
  '@media': {
    'screen and (max-width: 640px)': {
      padding: '1.35rem 1rem 3.5rem',
    },
  },
});

export const heroSection = style({
  padding: '0.35rem 0 1.75rem',
  marginBottom: '1.75rem',
});

export const statusBadgeRow = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.45rem',
  marginBottom: '0.85rem',
});

export const liveBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  padding: '0.28rem 0.75rem',
  borderRadius: '999px',
  fontSize: '0.77rem',
  fontWeight: 600,
  backgroundColor: vars.color.accentSoft,
  color: vars.color.accent,
  border: `1px solid ${vars.color.borderAccent}`,
  transition: `transform 0.35s ${SPRING_BOUNCE}`,
  ':hover': {
    transform: 'translateY(-1.5px) scale(1.02)',
  },
});

export const pulseDot = style({
  width: '0.42rem',
  height: '0.42rem',
  borderRadius: '999px',
  backgroundColor: vars.color.accent,
  flexShrink: 0,
});

export const secondaryStatusPill = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.28rem 0.75rem',
  borderRadius: '999px',
  fontSize: '0.77rem',
  fontWeight: 500,
  backgroundColor: vars.color.bgSubtle,
  color: vars.color.textSecondary,
  border: `1px solid ${vars.color.border}`,
  transition: `transform 0.35s ${SPRING_BOUNCE}, border-color 0.2s ease`,
  ':hover': {
    borderColor: vars.color.borderAccent,
    transform: 'translateY(-1.5px) scale(1.02)',
  },
});

export const heroTitle = style({
  fontSize: 'clamp(1.7rem, 3.8vw, 2.55rem)',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  lineHeight: 1.22,
  margin: '0 0 0.45rem 0',
});

export const heroSubtitle = style({
  fontSize: 'clamp(0.92rem, 1.8vw, 1.04rem)',
  color: vars.color.accent,
  fontWeight: 600,
  margin: '0 0 0.85rem 0',
});

export const heroBio = style({
  fontSize: '0.96rem',
  lineHeight: 1.72,
  color: vars.color.textSecondary,
  maxWidth: '820px',
  margin: '0 0 1.2rem 0',
});

export const interestChipWrap = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.4rem',
  marginBottom: '1.3rem',
});

export const interestChip = style({
  fontSize: '0.78rem',
  fontWeight: 500,
  padding: '0.3rem 0.68rem',
  borderRadius: '999px',
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  color: vars.color.textSecondary,
  transition: `transform 0.38s ${SPRING_BOUNCE}, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease`,
  ':hover': {
    borderColor: vars.color.borderAccent,
    color: vars.color.accent,
    transform: 'translateY(-2px) scale(1.045)',
    boxShadow: '0 4px 12px -2px rgba(37, 99, 235, 0.12)',
  },
  ':active': {
    transform: 'scale(0.94)',
  },
});

export const heroLinksRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.5rem',
});

export const socialLinkBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.46rem 0.88rem',
  borderRadius: '999px',
  fontSize: '0.82rem',
  fontWeight: 600,
  backgroundColor: vars.color.bgElevated,
  border: `1px solid ${vars.color.border}`,
  color: vars.color.textSecondary,
  transition: `transform 0.38s ${SPRING_BOUNCE}, border-color 0.2s ease, color 0.2s ease, box-shadow 0.25s ease`,
  ':hover': {
    borderColor: vars.color.borderAccent,
    color: vars.color.accent,
    transform: 'translateY(-2.5px) scale(1.04)',
    boxShadow: '0 8px 18px -6px rgba(37, 99, 235, 0.18)',
  },
  ':active': {
    transform: 'translateY(1px) scale(0.93)',
  },
});

export const primaryActionBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.42rem',
  padding: '0.48rem 0.98rem',
  borderRadius: '999px',
  fontSize: '0.83rem',
  fontWeight: 600,
  backgroundColor: vars.color.accent,
  border: `1px solid ${vars.color.accent}`,
  color: '#ffffff',
  boxShadow: '0 4px 12px -2px rgba(37, 99, 235, 0.28)',
  transition: `transform 0.38s ${SPRING_BOUNCE}, background-color 0.2s ease, box-shadow 0.25s ease`,
  ':hover': {
    backgroundColor: vars.color.accentHover,
    transform: 'translateY(-2.5px) scale(1.045)',
    boxShadow: '0 10px 22px -4px rgba(37, 99, 235, 0.4)',
  },
  ':active': {
    transform: 'translateY(1px) scale(0.93)',
  },
});

export const footer = style({
  borderTop: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgGlass,
  backdropFilter: 'blur(12px)',
  padding: '2rem 1.25rem',
});

export const footerInner = style({
  maxWidth: '1060px',
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  fontSize: '0.83rem',
  color: vars.color.textMuted,
});
