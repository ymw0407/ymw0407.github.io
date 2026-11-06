import { createTheme, createThemeContract, globalStyle } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    bgPrimary: null,
    bgElevated: null,
    bgCard: null,
    bgCardHover: null,
    bgGlass: null,
    bgSubtle: null,
    bgCode: null,
    textPrimary: null,
    textSecondary: null,
    textMuted: null,
    border: null,
    borderStrong: null,
    borderAccent: null,
    accent: null,
    accentHover: null,
    accentSoft: null,
    accentSecondary: null,
    accentSecondarySoft: null,
    emerald: null,
    emeraldSoft: null,
    amber: null,
    amberSoft: null,
    rose: null,
    roseSoft: null,
    spotlightGlow: null,
  },
  shadow: {
    card: null,
    cardHover: null,
    modal: null,
    carousel: null,
  },
  font: {
    sans: null,
    serif: null,
    mono: null,
  },
});

const sharedFonts = {
  sans: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
  serif: '"Pretendard Variable", Pretendard, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

export const lightTheme = createTheme(vars, {
  color: {
    bgPrimary: '#fbfcfd',
    bgElevated: '#ffffff',
    bgCard: 'rgba(255, 255, 255, 0.86)',
    bgCardHover: '#ffffff',
    bgGlass: 'rgba(255, 255, 255, 0.84)',
    bgSubtle: '#f1f5f9',
    bgCode: '#0f172a',
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    border: '#e2e8f0',
    borderStrong: '#cbd5e1',
    borderAccent: 'rgba(37, 99, 235, 0.35)',
    accent: '#2563eb',
    accentHover: '#1d4ed8',
    accentSoft: 'rgba(37, 99, 235, 0.08)',
    accentSecondary: '#4f46e5',
    accentSecondarySoft: 'rgba(79, 70, 229, 0.08)',
    emerald: '#059669',
    emeraldSoft: 'rgba(5, 150, 105, 0.09)',
    amber: '#d97706',
    amberSoft: 'rgba(217, 119, 6, 0.09)',
    rose: '#e11d48',
    roseSoft: 'rgba(225, 29, 72, 0.09)',
    spotlightGlow: 'rgba(37, 99, 235, 0.055)',
  },
  shadow: {
    card: '0 2px 14px rgba(15, 23, 42, 0.035), 0 1px 2px rgba(15, 23, 42, 0.04)',
    cardHover: '0 12px 28px -6px rgba(37, 99, 235, 0.1), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
    modal: '0 24px 60px -12px rgba(15, 23, 42, 0.18)',
    carousel: '0 10px 36px -8px rgba(15, 23, 42, 0.07)',
  },
  font: sharedFonts,
});

export const darkTheme = createTheme(vars, {
  color: {
    bgPrimary: '#090d16',
    bgElevated: '#111827',
    bgCard: 'rgba(17, 24, 39, 0.78)',
    bgCardHover: 'rgba(30, 41, 59, 0.92)',
    bgGlass: 'rgba(9, 13, 22, 0.82)',
    bgSubtle: '#1e293b',
    bgCode: '#030712',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    border: 'rgba(51, 65, 85, 0.65)',
    borderStrong: 'rgba(71, 85, 105, 0.9)',
    borderAccent: 'rgba(59, 130, 246, 0.45)',
    accent: '#3b82f6',
    accentHover: '#60a5fa',
    accentSoft: 'rgba(59, 130, 246, 0.14)',
    accentSecondary: '#818cf8',
    accentSecondarySoft: 'rgba(129, 140, 248, 0.14)',
    emerald: '#34d399',
    emeraldSoft: 'rgba(52, 211, 153, 0.14)',
    amber: '#fbbf24',
    amberSoft: 'rgba(251, 191, 36, 0.14)',
    rose: '#fb7185',
    roseSoft: 'rgba(251, 113, 133, 0.14)',
    spotlightGlow: 'rgba(59, 130, 246, 0.09)',
  },
  shadow: {
    card: '0 4px 20px -4px rgba(0, 0, 0, 0.35)',
    cardHover: '0 12px 32px -6px rgba(59, 130, 246, 0.18)',
    modal: '0 24px 64px -12px rgba(0, 0, 0, 0.75)',
    carousel: '0 12px 40px -8px rgba(0, 0, 0, 0.45)',
  },
  font: sharedFonts,
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: sharedFonts.sans,
  backgroundColor: '#fbfcfd',
  color: '#0f172a',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  scrollBehavior: 'smooth',
  letterSpacing: '-0.01em',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button, input, textarea', {
  fontFamily: sharedFonts.sans,
});

globalStyle('button', {
  cursor: 'pointer',
});

globalStyle('::selection', {
  backgroundColor: 'rgba(37, 99, 235, 0.16)',
});
