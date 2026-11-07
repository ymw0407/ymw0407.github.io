import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { cardFooterPinned, miniTag, periodBadge, sectionEyebrow, statusVariants, topicTopRow } from './components.css';
import { iconControlBtn, mobileMenuBtn, mobileDrawer } from './layout.css';

const phone = 'screen and (max-width: 640px)';

export const hideOnMobile = style({ '@media': { [phone]: { display: 'none' } } });
export const desktopOnly = style({ display: 'contents', '@media': { [phone]: { display: 'none' } } });
export const mobileOnly = style({ display: 'none', '@media': { [phone]: { display: 'block' } } });

export const mobileDetails = style({
  display: 'contents',
  '@media': { [phone]: { display: 'block', width: '100%', minWidth: 0, margin: '0.65rem 0' } },
});
export const mobileDetailsButton = style({
  display: 'none',
  '@media': { [phone]: {
    display: 'flex', width: '100%', minHeight: '46px', alignItems: 'center', justifyContent: 'space-between',
    gap: '0.75rem', padding: '0.75rem 0.9rem', border: `1px solid ${vars.color.border}`, borderRadius: '0.8rem',
    background: vars.color.bgElevated, color: vars.color.textPrimary, fontFamily: 'inherit', fontSize: '0.88rem',
    fontWeight: 650, textAlign: 'left', cursor: 'pointer',
  } },
  ':focus-visible': { outline: `2px solid ${vars.color.accent}`, outlineOffset: '3px' },
});
export const mobileDetailsContent = style({
  display: 'contents',
  '@media': { [phone]: {
    display: 'block', marginTop: '0.75rem',
    selectors: { [`${mobileDetails}[data-expanded="false"] > &`]: { display: 'none' } },
  } },
});
globalStyle(`${mobileDetails}[data-expanded="true"] > button > svg`, { '@media': { [phone]: { transform: 'rotate(180deg)' } } });
globalStyle(`${mobileDetailsButton} > svg`, { flexShrink: 0 });

export const drawerSettings = style({
  display: 'none',
  '@media': { [phone]: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.85rem 0.4rem 0.2rem', borderTop: `1px solid ${vars.color.border}` } },
});
globalStyle(`${drawerSettings} button`, { '@media': { [phone]: { minHeight: '44px', minWidth: '44px' } } });
export const mobileLinks = style({ display: 'contents', '@media': { [phone]: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' } } });
export const mobileSelect = style({
  width: '100%', minHeight: '46px', padding: '0.65rem 0.85rem', borderRadius: '0.75rem',
  border: `1px solid ${vars.color.border}`, backgroundColor: vars.color.bgElevated,
  color: vars.color.textPrimary, fontFamily: 'inherit', fontSize: '1rem',
  ':focus-visible': { outline: `2px solid ${vars.color.accent}`, outlineOffset: '2px' },
});
export const mobileSummary = style({
  '@media': { [phone]: { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } },
});
export const mobileMetricGrid = style({ '@media': { [phone]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.6rem' } } });
globalStyle(`${mobileMetricGrid} > div`, { '@media': { [phone]: { padding: '0.85rem', minWidth: 0 } } });
globalStyle(`${mobileMetricGrid} > div > div:last-child`, { '@media': { [phone]: { display: 'none' } } });
globalStyle(sectionEyebrow, { '@media': { [phone]: { display: 'none' } } });
globalStyle(`${topicTopRow}, ${cardFooterPinned}`, { '@media': { [phone]: { flexWrap: 'wrap' } } });
globalStyle(`${topicTopRow} > div`, { '@media': { [phone]: { minWidth: 0, maxWidth: '100%' } } });
globalStyle([periodBadge, miniTag, ...Object.values(statusVariants)].join(', '), {
  '@media': { [phone]: { whiteSpace: 'normal', maxWidth: '100%', overflowWrap: 'anywhere' } },
});
for (const control of [iconControlBtn, mobileMenuBtn]) {
  globalStyle(control, { '@media': { [phone]: { minHeight: '44px', minWidth: '44px' } } });
}
globalStyle(mobileDrawer, { '@media': { [phone]: { maxHeight: 'calc(100dvh - 100px)', overflowY: 'auto', overscrollBehavior: 'contain' } } });
