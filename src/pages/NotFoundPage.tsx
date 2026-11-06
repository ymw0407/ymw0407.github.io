import { useEffect } from 'react';
import { updateSharingMeta } from '../utils/seo';
import { pageMetadata } from '../utils/social';
import { RiArrowRightLine, RiErrorWarningLine, RiHome4Line } from 'react-icons/ri';
import { PHOTO_ARCHIVE, type Language } from '../data/careerData';
import {
  cvHeroGrid, inlineExternalLink, pageIntroHero, photoImageWrap, photoImg, spotlightCard,
} from '../styles/components.css';
import {
  heroBio, heroLinksRow, heroTitle, liveBadge, primaryActionBtn, socialLinkBtn, statusBadgeRow,
} from '../styles/layout.css';
import { vars } from '../styles/theme.css';

function displayPathname() {
  try {
    return decodeURI(window.location.pathname);
  } catch {
    return window.location.pathname;
  }
}

export function NotFoundPage({ lang }: { lang: Language }) {
  const ko = lang === 'ko';
  const heading = ko ? '페이지를 찾을 수 없습니다' : 'Page not found';
  const photo = PHOTO_ARCHIVE.find(item => item.id === 'aurora-curtain-2026');

  useEffect(() => {
    document.title = `404 · ${heading} | sinav`;
    document.documentElement.lang = lang;
    updateSharingMeta({ ...pageMetadata('/404.html', lang), canonicalPath: '/404.html', lang });
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) return;
    const previous = robots.content;
    robots.content = 'noindex';
    return () => { robots.content = previous; };
  }, [heading, lang]);

  return (
    <section className={pageIntroHero}>
      <div className={cvHeroGrid} style={{ alignItems: 'center' }}>
        <div style={{ minWidth: 0 }}>
          <div className={statusBadgeRow}>
            <span className={liveBadge}><RiErrorWarningLine aria-hidden="true" />404</span>
          </div>
          <h1 className={heroTitle} style={{ wordBreak: 'keep-all' }}>{heading}</h1>
          <p className={heroBio} style={{ overflowWrap: 'anywhere' }}>
            <code style={{ fontFamily: vars.font.mono }}>{displayPathname()}</code>
          </p>
          <div className={heroLinksRow}>
            <a className={primaryActionBtn} href="/"><RiHome4Line aria-hidden="true" />{ko ? '홈으로' : 'Home'}</a>
            <a className={socialLinkBtn} href="/blog">{ko ? '블로그 글 목록' : 'Browse the blog'}<RiArrowRightLine aria-hidden="true" /></a>
          </div>
        </div>
        {photo && (
          <figure className={spotlightCard} style={{ margin: 0 }}>
            <div className={photoImageWrap}>
              <img className={photoImg} src={photo.imagePath} alt="" />
            </div>
            <figcaption style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', padding: '0.9rem 1rem', fontSize: '0.85rem' }}>
              <strong>{ko ? photo.titleKo : photo.titleEn}</strong>
              <a className={inlineExternalLink} href="/archive">{ko ? '사진 아카이브' : 'Photo archive'}<RiArrowRightLine aria-hidden="true" /></a>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
