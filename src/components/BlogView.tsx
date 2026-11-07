import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  RiArrowRightLine,
  RiCameraLensLine,
  RiCheckLine,
  RiCloseLine,
  RiCodeSSlashLine,
  RiCpuLine,
  RiCupLine,
  RiDownload2Line,
  RiEdit2Line,
  RiFileCopyLine,
  RiFileTextLine,
  RiFlashlightLine,
  RiGobletLine,
  RiImageAddLine,
  RiLayoutColumnLine,
  RiQuillPenLine,
  RiSearchLine,
} from 'react-icons/ri';
import { Language } from '../data/careerData';
import {
  BLOG_CATEGORIES,
  BlogCategoryId,
  BlogPost,
} from '../utils/blogLoader';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SpotlightCard } from './SpotlightCard';
import {
  blogFilterBar,
  searchInput,
  searchInputWrap,
} from '../styles/blog.css';
import {
  cardBodyGrow,
  cardFooterPinned,
  cardPadding,
  inlineExternalLink,
  miniTag,
  modalBackdrop,
  modalCard,
  pageIntroHero,
  paragraphText,
  periodBadge,
  pubTitle,
  sectionBlock,
  sectionDesc,
  sectionEyebrow,
  sectionHeader,
  sectionTitle,
  sectionTitleGroup,
  stackList,
  statusVariants,
  tagRow,
  topicTopRow,
} from '../styles/components.css';
import {
  iconControlBtn,
  liveBadge,
  navTab,
  navTabActive,
  primaryActionBtn,
  pulseDot,
  socialLinkBtn,
} from '../styles/layout.css';
import { vars } from '../styles/theme.css';
import { desktopOnly, hideOnMobile, mobileOnly, mobileSelect, mobileSummary } from '../styles/mobile.css';

interface BlogViewProps {
  lang: Language;
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
}

const CATEGORY_ICON_MAP: Record<BlogCategoryId, React.ReactNode> = {
  tldr: <RiFlashlightLine size={15} />,
  research: <RiCpuLine size={15} />,
  engineering: <RiCodeSSlashLine size={15} />,
  photography: <RiCameraLensLine size={15} />,
  coffee: <RiCupLine size={15} />,
  cocktail: <RiGobletLine size={15} />,
  essay: <RiQuillPenLine size={15} />,
};

function buildCategoryTemplate(categoryId: BlogCategoryId | 'all'): string {
  const cat = BLOG_CATEGORIES.find((c) => c.id === categoryId);
  const categoryName = cat ? cat.frontmatterValue : 'Research';

  if (categoryId === 'tldr') {
    return `---
title: "[TL;DR] 오늘 읽은 논문/기술 3줄 핵심 요약"
titleEn: "[TL;DR] Quick 3-Line Takeaway"
date: "2026-11-07"
category: "TL;DR"
tags: ["TL;DR", "Quick Note"]
summary: "핵심 요점만 빠르게 기록하는 TL;DR 노트입니다."
summaryEn: "A concise TL;DR note capturing key takeaways."
featured: false
---

## TL;DR (핵심 3줄 요약)

1. **문제(Problem):** ...
2. **핵심 아이디어(Key Idea):** ...
3. **결론/배운 점(Takeaway):** ...
`;
  }

  if (categoryId === 'coffee') {
    return `---
title: "[Coffee] 원두 테이스팅 & 브루잉 레시피 기록"
titleEn: "[Coffee] Single-Origin Tasting & Pour-Over Recipe"
date: "2026-11-07"
category: "Coffee"
tags: ["Coffee", "Pour-Over", "Tasting Note"]
summary: "원두 아로마·향미 노트와 추출 레시피 기록입니다."
summaryEn: "Tasting notes and brewing parameters."
featured: false
---

## 1. 원두 정보 (Bean Info)
- **로스터리 / 원두:** 
- **산지 / 가공방식:** 
- **컵 노트:** 

## 2. 브루잉 레시피 (Brewing Parameters)
- **드리퍼 / 그라인더:** 
- **원두량 / 물 온도:** 20g / 92°C
`;
  }

  if (categoryId === 'cocktail') {
    return `---
title: "[Cocktail] 칵테일 레시피 & 테이스팅 노트"
titleEn: "[Cocktail] Cocktail Recipe & Spirit Tasting Note"
date: "2026-11-07"
category: "Cocktail"
tags: ["Cocktail", "Mixology", "Home Bar"]
summary: "기주 밸런스와 제조 기법, 테이스팅 인상을 기록합니다."
summaryEn: "Cocktail specs, technique, and tasting impressions."
featured: false
---

## 1. 레시피 스펙 (Recipe Specs)
- **기주 (Base Spirit):** 
- **부재료 (Modifiers):** 
- **기법 / 가니쉬:** Stir / Orange Peel

## 2. 테이스팅 노트 (Tasting Note)
`;
  }

  return `---
title: "새로운 포스트 제목을 입력하세요"
titleEn: "Enter English Post Title"
date: "2026-11-07"
category: "${categoryName}"
tags: ["${categoryName}", "sinav"]
summary: "이 포스트의 핵심 내용을 1~2문장으로 요약합니다."
summaryEn: "A concise 1-2 sentence summary of this post."
featured: true
---

## 1. 배경 (Background)

> [!NOTE]
> 콜아웃 박스(\`[!NOTE]\`, \`[!TIP]\`, \`[!IMPORTANT]\`, \`[!WARNING]\`, \`[!CAUTION]\`)와 수식, 코드 블록, 이미지 크기/배치 제어를 모두 지원합니다.

여기에 마크다운(Markdown)과 LaTeX 수식을 자유롭게 작성할 수 있습니다.
인라인 수식 $L_{\\text{total}} = L_{\\text{host}} + L_{\\text{device}}$ 과 블록 수식을 모두 지원합니다:

$$
\\text{Throughput (IOPS)} = \\frac{N_{\\text{completed}}}{\\Delta t}
$$

## 2. 이미지 크기 · 정렬 · 레이아웃 제어 예시

파이프(\`|\`) 문법으로 이미지 **크기(\`%\`, \`px\`, \`sm/md/lg/full\`)** 와 **위치(\`center\`, \`left\`, \`right\`, \`float-left\`, \`float-right\`)** 를 자유롭게 지정할 수 있습니다:

![기상청 수상작: 오로라의 커튼 | 72% | center](/photography/2026-weather-aurora-curtain.jpg)
`;
}

export const BlogView: React.FC<BlogViewProps> = ({
  lang,
  posts,
  onSelectPost,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCatParam = searchParams.get('category') as BlogCategoryId | null;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | BlogCategoryId>(
    initialCatParam && BLOG_CATEGORIES.some((c) => c.id === initialCatParam)
      ? initialCatParam
      : 'all'
  );
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [draftSlug, setDraftSlug] = useState('2026-11-07-new-post');
  const [draftMarkdown, setDraftMarkdown] = useState(() =>
    buildCategoryTemplate('all')
  );
  const [copiedDraft, setCopiedDraft] = useState(false);

  useEffect(() => {
    const param = searchParams.get('category') as BlogCategoryId | null;
    if (param && BLOG_CATEGORIES.some((c) => c.id === param)) {
      setActiveCategory(param);
    } else if (!param) {
      setActiveCategory('all');
    }
  }, [searchParams]);

  const handleSelectCategory = (catId: 'all' | BlogCategoryId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const openStudioWithCategory = (catId: 'all' | BlogCategoryId) => {
    setDraftMarkdown(buildCategoryTemplate(catId));
    setDraftSlug(`2026-11-07-${catId === 'all' ? 'new-post' : catId}-note`);
    setIsStudioOpen(true);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === 'all' || post.categoryId === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const inTitle =
        post.title.toLowerCase().includes(q) ||
        (post.titleEn && post.titleEn.toLowerCase().includes(q));
      const inSummary =
        post.summary.toLowerCase().includes(q) ||
        (post.summaryEn && post.summaryEn.toLowerCase().includes(q));
      const inTags = post.tags.some((t) => t.toLowerCase().includes(q));
      const inCategory = post.category.toLowerCase().includes(q);

      return matchesCategory && (inTitle || inSummary || inTags || inCategory);
    });
  }, [posts, activeCategory, searchQuery]);

  const activeCategoryMeta = useMemo(
    () => BLOG_CATEGORIES.find((c) => c.id === activeCategory),
    [activeCategory]
  );

  const previewBody = useMemo(() => {
    const match = draftMarkdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
    return match ? match[1] : draftMarkdown;
  }, [draftMarkdown]);

  const handleDownloadDraft = () => {
    const blob = new Blob([draftMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = draftSlug.endsWith('.md') ? draftSlug : `${draftSlug}.md`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftMarkdown);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div>
      {/* 1. DEDICATED BLOG TOP HEADER & CATEGORY DIRECTORY */}
      <section className={pageIntroHero}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.15rem',
          }}
        >
          <div>
            <div className={desktopOnly}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span className={liveBadge}>
                <span className={pulseDot} />
                <RiFileTextLine size={13} />
                {lang === 'ko'
                  ? 'sinav Blog · 연구 · 개발 · 사진 · 커피 · 칵테일 아카이브'
                  : 'sinav Blog · Research, Dev, Photo, Coffee & Cocktails'}
              </span>
            </div>
            </div>

            <h1 className={mobileOnly} style={{ margin: '0 0 0.4rem', fontSize: '1.65rem' }}>{lang === 'ko' ? '블로그' : 'Blog'}</h1>
            <h1
              className={hideOnMobile}
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 1.95rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: '0 0 0.4rem',
                color: vars.color.textPrimary,
              }}
            >
              {lang === 'ko'
                ? '시나브(sinav)의 블로그 & 노트'
                : "sinav's Multi-Topic Blog & Notes"}
            </h1>
            <p className={`${paragraphText} ${hideOnMobile}`} style={{ margin: 0, maxWidth: '760px' }}>
              {lang === 'ko'
                ? '짧고 빠른 요약(TL;DR)부터 시스템·아키텍처 연구 노트, 소프트웨어 개발기, 사진 출사, 커피 브루잉, 칵테일 레시피까지 관심사를 카테고리별로 기록합니다.'
                : 'Exploring systems & architecture research, software engineering, quick TL;DRs, photography, coffee brewing, and cocktails.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openStudioWithCategory(activeCategory)}
            className={`${primaryActionBtn} ${hideOnMobile}`}
          >
            <RiEdit2Line size={15} />
            {lang === 'ko' ? '새 포스트 작성 (.md)' : 'Write Post (.md)'}
          </button>
        </div>

        <div className={desktopOnly}>
        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className={`${navTab} ${activeCategory === 'all' ? navTabActive : ''}`}
          >
            {lang === 'ko' ? `전체 (${posts.length})` : `All (${posts.length})`}
          </button>

          {BLOG_CATEGORIES.map((cat) => {
            const count = posts.filter((p) => p.categoryId === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className={`${navTab} ${isActive ? navTabActive : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                {CATEGORY_ICON_MAP[cat.id]}
                <span>
                  {cat.shortLabel[lang]} ({count})
                </span>
              </button>
            );
          })}
        </div>

        </div>
        <div className={desktopOnly}>
        {activeCategoryMeta && (
          <div
            style={{
              marginTop: '0.9rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              backgroundColor: vars.color.bgSubtle,
              border: `1px solid ${vars.color.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: vars.color.textSecondary,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              {CATEGORY_ICON_MAP[activeCategoryMeta.id]}
              <strong>{activeCategoryMeta.label[lang]}:</strong> {activeCategoryMeta.desc[lang]}
            </span>
          </div>
        )}
        </div>
        <div className={mobileOnly}>
          <label htmlFor="blog-category-filter" style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.8rem', color: vars.color.textMuted }}>{lang === 'ko' ? '카테고리' : 'Category'}</label>
          <select id="blog-category-filter" className={mobileSelect} value={activeCategory} onChange={event => handleSelectCategory(event.currentTarget.value as BlogCategoryId | 'all')}>
            <option value="all">{lang === 'ko' ? `전체 글 (${posts.length})` : `All posts (${posts.length})`}</option>
            {BLOG_CATEGORIES.map(category => <option key={category.id} value={category.id}>{category.shortLabel[lang]} ({posts.filter(post => post.categoryId === category.id).length})</option>)}
          </select>
        </div>
      </section>

      {/* 2. MAIN BLOG ARTICLES FEED */}
      <section className={sectionBlock}>
        <div className={sectionHeader}>
          <div className={sectionTitleGroup}>
            <span className={sectionEyebrow}>
              {activeCategoryMeta
                ? `Channel · ${activeCategoryMeta.frontmatterValue}`
                : 'All Channels & Articles'}
            </span>
            <h2 className={sectionTitle}>
              <RiFileTextLine size={22} color={vars.color.accent} />
              <span className={desktopOnly}>{activeCategoryMeta
                ? activeCategoryMeta.label[lang]
                : lang === 'ko'
                ? '전체 글 목록 (All Posts)'
                : 'All Blog Posts'}</span>
              <span className={mobileOnly}>{activeCategoryMeta ? activeCategoryMeta.shortLabel[lang] : lang === 'ko' ? '전체 글' : 'All Posts'}</span>
            </h2>
            <p className={sectionDesc}>
              {lang === 'ko'
                ? `총 ${filteredPosts.length}편의 글이 있습니다.`
                : `Showing ${filteredPosts.length} post(s).`}
            </p>
          </div>

          <div className={searchInputWrap}>
            <RiSearchLine
              size={15}
              color={vars.color.textMuted}
              style={{
                position: 'absolute',
                left: '0.82rem',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ko'
                  ? '제목, 카테고리, 태그 검색...'
                  : 'Search by title, category, or tag...'
              }
              className={searchInput}
            />
          </div>
        </div>

        {/* Posts List */}
        <div className={stackList}>
          {filteredPosts.map((post) => {
            const catMeta = BLOG_CATEGORIES.find((c) => c.id === post.categoryId);
            return (
              <SpotlightCard key={post.slug} onClick={() => onSelectPost(post.slug)}>
                <div className={cardPadding}>
                  <div className={cardBodyGrow}>
                    <div className={topicTopRow}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className={statusVariants.exploring}>
                          {catMeta ? catMeta.shortLabel[lang] : post.category}
                        </span>
                        {catMeta && post.category !== catMeta.frontmatterValue && (
                          <span className={miniTag}>{post.category}</span>
                        )}
                      </div>
                      <span className={periodBadge}>{post.date}</span>
                    </div>

                    <h3 className={pubTitle} style={{ fontSize: '1.18rem', marginTop: '0.4rem' }}>
                      {lang === 'en' && post.titleEn ? post.titleEn : post.title}
                    </h3>

                    <p className={`${paragraphText} ${mobileSummary}`} style={{ marginBottom: '0.4rem' }}>
                      {lang === 'en' && post.summaryEn ? post.summaryEn : post.summary}
                    </p>
                  </div>

                  <div className={cardFooterPinned}>
                    <div className={`${tagRow} ${hideOnMobile}`}>
                      {post.tags.map((t) => (
                        <span key={t} className={miniTag}>
                          #{t}
                        </span>
                      ))}
                    </div>

                    <span className={inlineExternalLink}>
                      {lang === 'ko' ? '글 읽기' : 'Read Article'} <RiArrowRightLine size={14} />
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}

          {filteredPosts.length === 0 && (
            <SpotlightCard>
              <div
                className={cardPadding}
                style={{
                  textAlign: 'center',
                  padding: '2.4rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '1.02rem', color: vars.color.textPrimary }}>
                  {activeCategoryMeta
                    ? lang === 'ko'
                      ? `아직 [${activeCategoryMeta.shortLabel.ko}] 카테고리에 등록된 글이 없습니다.`
                      : `No posts in [${activeCategoryMeta.shortLabel.en}] yet.`
                    : lang === 'ko'
                    ? '검색 조건에 해당하는 블로그 포스트가 없습니다.'
                    : 'No blog posts matched your filter.'}
                </div>
                <p className={hideOnMobile} style={{ margin: 0, fontSize: '0.86rem', color: vars.color.textMuted }}>
                  {lang === 'ko'
                    ? '아래 버튼을 눌러 이 카테고리의 첫 번째 마크다운(.md) 포스트 템플릿을 바로 작성해 보세요.'
                    : 'Click below to draft the first Markdown (.md) post for this category.'}
                </p>
                <button
                  type="button"
                  onClick={() => openStudioWithCategory(activeCategory)}
                  className={socialLinkBtn}
                >
                  <RiEdit2Line size={14} color={vars.color.accent} />
                  <span className={desktopOnly}>
                  {lang === 'ko'
                    ? `${activeCategoryMeta ? activeCategoryMeta.shortLabel.ko : '새'} 포스트 템플릿 열기 (.md)`
                    : 'Open Post Template (.md)'}
                  </span>
                  <span className={mobileOnly}>{lang === 'ko' ? '첫 글 작성' : 'Write the first post'}</span>
                </button>
              </div>
            </SpotlightCard>
          )}
        </div>
      </section>

      {filteredPosts.length > 0 && (
      <div className={mobileOnly} style={{ marginBottom: '2rem' }}>
        <button type="button" className={socialLinkBtn} onClick={() => openStudioWithCategory(activeCategory)}><RiEdit2Line size={15} />{lang === 'ko' ? '글 작성' : 'Write a post'}</button>
      </div>
      )}

      {/* Markdown & LaTeX Live Studio Modal */}
      {isStudioOpen && (
        <div className={modalBackdrop} onClick={() => setIsStudioOpen(false)}>
          <div
            className={modalCard}
            style={{ maxWidth: '1040px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                paddingBottom: '0.85rem',
                borderBottom: `1px solid ${vars.color.border}`,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>
                  {lang === 'ko'
                    ? '블로그 마크다운 & LaTeX 실시간 스튜디오'
                    : 'Blog Markdown & LaTeX Live Studio'}
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: vars.color.textMuted }}>
                  {lang === 'ko'
                    ? '카테고리(TL;DR, Research, Engineering, Photography, Coffee, Cocktail, Essay)를 선택해 .md 파일을 다운로드한 뒤 src/content/posts/에 추가하세요.'
                    : 'Select a category template, edit, and download the .md file into src/content/posts/.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsStudioOpen(false)}
                className={iconControlBtn}
              >
                <RiCloseLine size={16} />
              </button>
            </div>

            {/* Quick Template Switcher inside Studio */}
            <div className={blogFilterBar} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: vars.color.textMuted, marginRight: '0.25rem' }}>
                  {lang === 'ko' ? '템플릿 변경:' : 'Template:'}
                </span>
                {BLOG_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setDraftMarkdown(buildCategoryTemplate(c.id));
                      setDraftSlug(`2026-11-07-${c.id}-note`);
                    }}
                    className={navTab}
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.76rem' }}
                  >
                    {c.shortLabel[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Image & Layout Snippet Toolbar */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                alignItems: 'center',
                marginBottom: '0.85rem',
                padding: '0.6rem 0.85rem',
                borderRadius: '0.65rem',
                backgroundColor: vars.color.bgSubtle,
                border: `1px solid ${vars.color.border}`,
              }}
            >
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: vars.color.textSecondary,
                  marginRight: '0.25rem',
                }}
              >
                {lang === 'ko' ? '빠른 삽입 (이미지·레이아웃):' : 'Insert Snippet:'}
              </span>

              <button
                type="button"
                onClick={() =>
                  setDraftMarkdown(
                    (prev) =>
                      `${prev}\n![이미지 캡션 설명 | 68% | center](/photography/2026-weather-aurora-curtain.jpg)\n`
                  )
                }
                className={iconControlBtn}
                style={{ fontSize: '0.74rem', padding: '0.25rem 0.55rem' }}
              >
                <RiImageAddLine size={13} />
                {lang === 'ko' ? '이미지 (68% · 중앙)' : 'Image (68% · Center)'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setDraftMarkdown(
                    (prev) =>
                      `${prev}\n![좌측 플로팅 이미지 | 42% | float-left](/photography/2025-navy-dokdo-salute.jpg)\n이 문단은 좌측에 배치된 이미지 오른편으로 자연스럽게 감싸며(Text Wrapping) 흘러갑니다. \`| 42% | float-left\` 또는 \`| 42% | float-right\` 옵션으로 잡지/논문 스타일의 이미지 배치를 만들 수 있습니다.\n`
                  )
                }
                className={iconControlBtn}
                style={{ fontSize: '0.74rem', padding: '0.25rem 0.55rem' }}
              >
                <RiImageAddLine size={13} />
                {lang === 'ko' ? '이미지 좌측 플로팅 (float-left)' : 'Float Left Image'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setDraftMarkdown(
                    (prev) =>
                      `${prev}\n![좌측 사진 캡션 | 100%](/photography/2026-weather-aurora-curtain.jpg) ![우측 사진 캡션 | 100%](/photography/2025-navy-dokdo-salute.jpg)\n`
                  )
                }
                className={iconControlBtn}
                style={{ fontSize: '0.74rem', padding: '0.25rem 0.55rem' }}
              >
                <RiLayoutColumnLine size={13} />
                {lang === 'ko' ? '이미지 2단 나란히 배치' : '2-Column Side-by-Side'}
              </button>

              <button
                type="button"
                onClick={() =>
                  setDraftMarkdown(
                    (prev) =>
                      `${prev}\n> [!TIP]\n> **핵심 인사이트:** \`[!NOTE]\`, \`[!TIP]\`, \`[!IMPORTANT]\`, \`[!WARNING]\`, \`[!CAUTION]\` 구문으로 콜아웃 박스를 삽입할 수 있습니다.\n`
                  )
                }
                className={iconControlBtn}
                style={{ fontSize: '0.74rem', padding: '0.25rem 0.55rem' }}
              >
                {lang === 'ko' ? 'Callout 박스 ([!TIP])' : 'Callout ([!TIP])'}
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <input
                type="text"
                value={draftSlug}
                onChange={(e) => setDraftSlug(e.target.value)}
                className={searchInput}
                style={{ maxWidth: '320px', paddingLeft: '0.85rem' }}
                placeholder="2026-11-07-post-slug.md"
              />
              <button type="button" onClick={handleCopyDraft} className={iconControlBtn}>
                {copiedDraft ? <RiCheckLine size={14} /> : <RiFileCopyLine size={14} />}
                {copiedDraft
                  ? lang === 'ko'
                    ? '복사 완료'
                    : 'Copied'
                  : lang === 'ko'
                  ? '마크다운 복사'
                  : 'Copy Markdown'}
              </button>
              <button type="button" onClick={handleDownloadDraft} className={primaryActionBtn}>
                <RiDownload2Line size={14} />
                {lang === 'ko' ? '.md 파일 다운로드' : 'Download .md File'}
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              <textarea
                value={draftMarkdown}
                onChange={(e) => setDraftMarkdown(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '420px',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  backgroundColor: vars.color.bgCode,
                  color: '#e2e8f0',
                  border: `1px solid ${vars.color.border}`,
                  fontFamily: vars.font.mono,
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  resize: 'vertical',
                }}
              />

              <div
                style={{
                  minHeight: '420px',
                  maxHeight: '520px',
                  overflowY: 'auto',
                  padding: '1.25rem',
                  borderRadius: '0.75rem',
                  backgroundColor: vars.color.bgCard,
                  border: `1px solid ${vars.color.border}`,
                }}
              >
                <MarkdownRenderer content={previewBody} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
