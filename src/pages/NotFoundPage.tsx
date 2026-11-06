import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '../data/careerData';
import { SpotlightCard } from '../components/SpotlightCard';
import { cardPadding, sectionEyebrow } from '../styles/components.css';
import { heroLinksRow, primaryActionBtn, socialLinkBtn } from '../styles/layout.css';

export function NotFoundPage({ lang }: { lang: Language }) {
  const ko = lang === 'ko';
  const heading = ko ? '페이지를 찾을 수 없습니다' : 'Page not found';

  useEffect(() => {
    document.title = `404 · ${heading} | sinav`;
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) return;
    const previous = robots.content;
    robots.content = 'noindex';
    return () => { robots.content = previous; };
  }, [heading]);

  return (
    <SpotlightCard>
      <section className={cardPadding}>
        <span className={sectionEyebrow}>404</span>
        <h1>{heading}</h1>
        <div className={heroLinksRow}>
          <Link className={primaryActionBtn} to="/">{ko ? '홈으로' : 'Home'}</Link>
          <Link className={socialLinkBtn} to="/blog">{ko ? '블로그' : 'Blog'}</Link>
        </div>
      </section>
    </SpotlightCard>
  );
}
