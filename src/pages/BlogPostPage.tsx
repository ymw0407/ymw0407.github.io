import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCalendarLine,
  RiCheckLine,
  RiFileList3Line,
  RiLinkM,
  RiUser3Line,
} from 'react-icons/ri';
import { Language, PROFILE_DATA } from '../data/careerData';
import { BlogPost } from '../utils/blogLoader';
import { updateDocumentSeo } from '../utils/seo';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { SpotlightCard } from '../components/SpotlightCard';
import {
  articleMainCard,
  articleSubtitle,
  articleTitle,
  postBreadcrumbRow,
  postHeroHeader,
  postPageGrid,
  postPageWrapper,
  postSidebarSticky,
  prevNextGrid,
  readingProgressBar,
  sidebarBox,
  tocLink,
} from '../styles/blog.css';
import {
  cardPadding,
  miniTag,
  periodBadge,
  statusVariants,
  tagRow,
  topicTopRow,
} from '../styles/components.css';
import { iconControlBtn, primaryActionBtn } from '../styles/layout.css';
import { vars } from '../styles/theme.css';

interface BlogPostPageProps {
  lang: Language;
  posts: BlogPost[];
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*_~()[\]{}:;,.?!'"/\\]/g, '')
    .replace(/\s+/g, '-');
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ lang, posts }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  const postIndex = useMemo(
    () => posts.findIndex((p) => p.slug === slug),
    [posts, slug]
  );
  const post = postIndex >= 0 ? posts[postIndex] : null;
  const prevPost = postIndex >= 0 && postIndex + 1 < posts.length ? posts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;

  // Update SEO document title, meta tags & JSON-LD
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (!post) return;

    const displayTitle =
      lang === 'en' && post.titleEn ? post.titleEn : post.title;
    const displayDesc =
      lang === 'en' && post.summaryEn ? post.summaryEn : post.summary;

    updateDocumentSeo({
      title: `${displayTitle} | 윤민우 (Minwoo Yun) Blog`,
      description: displayDesc,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      canonicalPath: `/posts/${post.slug}`,
      lang,
    });
  }, [post, lang]);

  // Reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tocItems = useMemo<TocItem[]>(() => {
    if (!post) return [];
    const lines = post.content.split(/\r?\n/);
    const result: TocItem[] = [];
    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      if (h2Match) {
        const text = h2Match[1].replace(/[`*]/g, '').trim();
        result.push({ id: slugifyHeading(text), text, level: 2 });
        continue;
      }
      const h3Match = line.match(/^###\s+(.+)$/);
      if (h3Match) {
        const text = h3Match[1].replace(/[`*]/g, '').trim();
        result.push({ id: slugifyHeading(text), text, level: 3 });
      }
    }
    return result;
  }, [post]);

  // Active TOC heading observer
  useEffect(() => {
    if (tocItems.length === 0) return;
    const onScrollHeading = () => {
      const headings = Array.from(
        document.querySelectorAll('article h2[id], article h3[id]')
      ) as HTMLElement[];
      if (headings.length === 0) return;

      let currentId = headings[0].id;
      for (const h of headings) {
        const rect = h.getBoundingClientRect();
        if (rect.top <= 140) {
          currentId = h.id;
        }
      }
      setActiveHeadingId(currentId);
    };

    window.addEventListener('scroll', onScrollHeading, { passive: true });
    onScrollHeading();
    return () => window.removeEventListener('scroll', onScrollHeading);
  }, [tocItems]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  if (!post) {
    return (
      <div className={postPageWrapper}>
        <SpotlightCard>
          <div className={cardPadding} style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>
              {lang === 'ko' ? '포스트를 찾을 수 없습니다.' : 'Post Not Found'}
            </h2>
            <p style={{ color: vars.color.textMuted, marginBottom: '1.5rem' }}>
              {lang === 'ko'
                ? '요청하신 아티클 경로가 존재하지 않거나 이동되었습니다.'
                : 'The article you requested could not be found.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className={primaryActionBtn}
            >
              <RiArrowLeftLine size={16} />
              {lang === 'ko' ? '블로그 목록으로 돌아가기' : 'Back to Blog'}
            </button>
          </div>
        </SpotlightCard>
      </div>
    );
  }

  return (
    <div className={postPageWrapper}>
      {/* Reading Progress Bar */}
      <div
        className={readingProgressBar}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Breadcrumb & Share Bar */}
      <div className={postBreadcrumbRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
          <Link to="/blog" className={iconControlBtn}>
            <RiArrowLeftLine size={15} />
            {lang === 'ko' ? '블로그 목록' : 'All Posts'}
          </Link>
          <Link
            to={`/blog?category=${post.categoryId}`}
            style={{
              color: vars.color.accent,
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            / {post.category}
          </Link>
        </div>

        <button
          type="button"
          onClick={handleCopyUrl}
          className={iconControlBtn}
        >
          {copiedUrl ? <RiCheckLine size={15} /> : <RiLinkM size={15} />}
          {copiedUrl
            ? lang === 'ko'
              ? '링크 복사됨'
              : 'URL Copied'
            : lang === 'ko'
            ? '포스트 링크 복사'
            : 'Share URL'}
        </button>
      </div>

      {/* Standalone Article Hero Header */}
      <header className={postHeroHeader}>
        <div className={topicTopRow}>
          <span className={statusVariants.exploring}>{post.category}</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              fontSize: '0.84rem',
              color: vars.color.textMuted,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <RiCalendarLine size={15} />
              <time dateTime={post.date}>{post.date}</time>
            </span>
          </div>
        </div>

        <h1 className={articleTitle}>
          {lang === 'en' && post.titleEn ? post.titleEn : post.title}
        </h1>

        {post.titleEn && (
          <p className={articleSubtitle}>
            {lang === 'en' ? post.title : post.titleEn}
          </p>
        )}

        <p
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.68,
            color: vars.color.textSecondary,
            margin: '0 0 1.2rem',
          }}
        >
          {lang === 'en' && post.summaryEn ? post.summaryEn : post.summary}
        </p>

        <div className={tagRow}>
          {post.tags.map((tag) => (
            <span key={tag} className={miniTag}>
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* 2-Column Article Body + Sticky Table of Contents Sidebar */}
      <div className={postPageGrid}>
        <article className={articleMainCard}>
          <MarkdownRenderer content={post.content} lang={lang} />
        </article>

        <aside className={postSidebarSticky}>
          {tocItems.length > 0 && (
            <div className={sidebarBox}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  marginBottom: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: vars.color.textPrimary,
                }}
              >
                <RiFileList3Line size={16} color={vars.color.accent} />
                {lang === 'ko' ? '목차 (On This Page)' : 'On This Page'}
              </div>
              <nav>
                {tocItems.map((item) => {
                  const isActive = activeHeadingId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={tocLink}
                      style={{
                        paddingLeft: item.level === 3 ? '1.1rem' : '0.45rem',
                        fontWeight: isActive ? 750 : item.level === 2 ? 600 : 400,
                        color: isActive ? vars.color.accent : undefined,
                        backgroundColor: isActive ? vars.color.accentSoft : undefined,
                      }}
                    >
                      {item.text}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Author Researcher Profile Box */}
          <div className={sidebarBox}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '0.6rem',
              }}
            >
              <div
                style={{
                  width: '2.2rem',
                  height: '2.2rem',
                  borderRadius: '999px',
                  backgroundColor: vars.color.accentSoft,
                  color: vars.color.accent,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                <RiUser3Line size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  {PROFILE_DATA.name[lang]}
                </div>
                <div style={{ fontSize: '0.76rem', color: vars.color.textMuted }}>
                  Systems & Architecture Researcher
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: '0.81rem',
                lineHeight: 1.6,
                color: vars.color.textSecondary,
                margin: '0 0 0.85rem',
              }}
            >
              {lang === 'ko'
                ? '국민대학교 Memory & Storage Lab · UC Irvine BIAS Lab 학부연구생'
                : 'Undergraduate Researcher @ Kookmin Univ. MSL & UC Irvine BIAS Lab'}
            </p>
            <Link
              to="/portfolio"
              className={iconControlBtn}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {lang === 'ko' ? '연구자 포트폴리오 보기' : 'View Researcher Portfolio'}
              <RiArrowRightLine size={14} />
            </Link>
          </div>
        </aside>
      </div>

      {/* Previous / Next Post Navigation Cards */}
      <div className={prevNextGrid}>
        {prevPost ? (
          <SpotlightCard onClick={() => navigate(`/posts/${prevPost.slug}`)}>
            <div className={cardPadding}>
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  color: vars.color.textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginBottom: '0.35rem',
                }}
              >
                <RiArrowLeftLine size={14} />
                {lang === 'ko' ? '이전 포스트' : 'Previous Article'}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', lineHeight: 1.4 }}>
                {lang === 'en' && prevPost.titleEn ? prevPost.titleEn : prevPost.title}
              </div>
              <div style={{ marginTop: '0.4rem' }}>
                <span className={periodBadge}>{prevPost.date}</span>
              </div>
            </div>
          </SpotlightCard>
        ) : (
          <div />
        )}

        {nextPost ? (
          <SpotlightCard onClick={() => navigate(`/posts/${nextPost.slug}`)}>
            <div className={cardPadding} style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  color: vars.color.textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.3rem',
                  marginBottom: '0.35rem',
                }}
              >
                {lang === 'ko' ? '다음 포스트' : 'Next Article'}
                <RiArrowRightLine size={14} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', lineHeight: 1.4 }}>
                {lang === 'en' && nextPost.titleEn ? nextPost.titleEn : nextPost.title}
              </div>
              <div style={{ marginTop: '0.4rem' }}>
                <span className={periodBadge}>{nextPost.date}</span>
              </div>
            </div>
          </SpotlightCard>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
