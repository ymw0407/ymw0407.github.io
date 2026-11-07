import { keyframes, style } from '@vanilla-extract/css';
import { vars } from './theme.css';

const sweep = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(100%)' },
});

export const imageFrame = style({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  height: '100%',
  minWidth: 0,
  maxWidth: '100%',
  overflow: 'hidden',
  selectors: {
    '&[data-image-state="loading"], &[data-image-state="error"]': {
      minHeight: '8rem',
    },
  },
});

export const imagePlaceholder = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.65rem',
  padding: '1rem',
  overflow: 'hidden',
  pointerEvents: 'none',
  backgroundColor: vars.color.bgSubtle,
  color: vars.color.textMuted,
  fontSize: '0.82rem',
  textAlign: 'center',
  opacity: 1,
  visibility: 'visible',
  transition: 'opacity 0.4s ease, visibility 0s linear 0.4s',
  selectors: {
    [`${imageFrame}[data-image-state="loaded"] &`]: {
      opacity: 0,
      visibility: 'hidden',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});

export const imageShimmer = style({
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(110deg, transparent 25%, ${vars.color.accentSoft} 50%, transparent 75%)`,
    animation: `${sweep} 1.8s ease-in-out infinite`,
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': { '::before': { animation: 'none' } },
  },
});
