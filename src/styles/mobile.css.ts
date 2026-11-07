import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { cardFooterPinned, labTitle, miniTag, periodBadge, projectExpandBtn, sectionDesc, sectionDockItem, sectionEyebrow, sectionHeader, statusVariants, topicTopRow, verticalTimelineCard } from './components.css';
import { iconControlBtn, interestChip, liveBadge, mainContainer, mobileMenuBtn, mobileDrawer, primaryActionBtn, socialLinkBtn } from './layout.css';

const phone = 'screen and (max-width: 640px)';

export const desktopOnly = style({ display: 'contents', '@media': { [phone]: { display: 'none' } } });
export const mobileOnly = style({ display: 'none', '@media': { [phone]: { display: 'block' } } });
export const mobileBalanced = style({ '@media': { [phone]: { textWrap: 'balance' } } });
export const mobileActionRow = style({ '@media': { [phone]: { flexWrap: 'wrap', maxWidth: '100%' } } });

export const mobilePortfolio = style({});
globalStyle(`${mobilePortfolio} ${sectionHeader} ${sectionDesc}`, { '@media': { [phone]: { display: 'none' } } });
export const mobileCareerPreview = style({});
globalStyle(`${mobileCareerPreview} > div:nth-child(n + 3)`, { '@media': { [phone]: { display: 'none' } } });
export const mobilePortfolioDock = style({
  '@media': { [phone]: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', padding: '0.4rem', gap: '0.35rem', marginBottom: '1.5rem' } },
});
globalStyle(`${mobilePortfolioDock} ${sectionDockItem}`, { '@media': { [phone]: { minHeight: '44px', justifyContent: 'center', padding: '0.35rem' } } });

export const philosophyCopy = style({
  fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.75, color: vars.color.textPrimary,
  whiteSpace: 'pre-line', margin: '0.5rem 0 0', wordBreak: 'keep-all',
  '@media': { [phone]: { fontSize: '0.9rem', fontWeight: 400, lineHeight: 1.7, color: vars.color.textSecondary, whiteSpace: 'normal', marginTop: '0.9rem' } },
});
export const philosophySentence = style({
  '@media': { [phone]: { display: 'block', textWrap: 'balance', selectors: { '& + &': { marginTop: '0.85rem' }, '&:first-child': { fontWeight: 600, color: vars.color.textPrimary } } } },
});

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
globalStyle(`${mobilePortfolio} ${verticalTimelineCard} ${topicTopRow} > div`, { '@media': { [phone]: { display: 'none' } } });
globalStyle(`${mobilePortfolio} ${verticalTimelineCard} ${labTitle}`, { '@media': { [phone]: { fontSize: '1rem' } } });
globalStyle(`${mobilePortfolio} ${verticalTimelineCard} ${mobileDetailsButton}`, {
  '@media': { [phone]: { width: 'auto', minHeight: '44px', padding: '0.3rem 0', border: 0, borderRadius: 0, background: 'transparent', color: vars.color.accent, gap: '0.35rem', fontSize: '0.8rem' } },
});

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
globalStyle(`${topicTopRow} > div`, { '@media': { [phone]: { minWidth: 0, maxWidth: '100%', flexWrap: 'wrap' } } });
globalStyle([periodBadge, miniTag, interestChip, liveBadge, ...Object.values(statusVariants)].join(', '), {
  '@media': { [phone]: { display: 'inline-flex', flexShrink: 0, whiteSpace: 'normal', maxWidth: '100%', wordBreak: 'keep-all', overflowWrap: 'anywhere' } },
});
globalStyle(mainContainer, { '@media': { [phone]: { wordBreak: 'keep-all', overflowWrap: 'anywhere' } } });
globalStyle(`${mainContainer} h1, ${mainContainer} h2, ${mainContainer} h3`, {
  '@media': { [phone]: { textWrap: 'balance', wordBreak: 'keep-all', overflowWrap: 'anywhere' } },
});
globalStyle(`${primaryActionBtn}, ${socialLinkBtn}, ${mainContainer} ${iconControlBtn}`, {
  '@media': { [phone]: { flexShrink: 0, maxWidth: '100%', minHeight: '44px', justifyContent: 'center', wordBreak: 'keep-all', overflowWrap: 'anywhere' } },
});
globalStyle(projectExpandBtn, { '@media': { [phone]: { minHeight: '44px' } } });
globalStyle(`${mainContainer} h2 svg, ${mainContainer} h3 svg, ${primaryActionBtn} svg, ${socialLinkBtn} svg, ${liveBadge} svg, ${projectExpandBtn} > svg`, {
  '@media': { [phone]: { flexShrink: 0 } },
});
for (const control of [iconControlBtn, mobileMenuBtn]) {
  globalStyle(control, { '@media': { [phone]: { minHeight: '44px', minWidth: '44px' } } });
}
globalStyle(mobileDrawer, { '@media': { [phone]: { maxHeight: 'calc(100dvh - 100px)', overflowY: 'auto', overscrollBehavior: 'contain' } } });

export const hideOnMobile = style({ '@media': { [phone]: { display: 'none' } } });
