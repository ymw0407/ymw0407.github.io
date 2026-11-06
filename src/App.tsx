import React, { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  RiArrowUpLine,
  RiArticleLine,
  RiBookOpenLine,
  RiCameraLensLine,
  RiCloseLine,
  RiCpuLine,
  RiGithubFill,
  RiHome4Line,
  RiMenu4Line,
  RiMoonClearLine,
  RiSunLine,
  RiUserStarLine,
} from 'react-icons/ri';
import { InteractiveBackground } from './components/InteractiveBackground';
import { SinavLogo } from './components/SinavLogo';
import { HomeView } from './components/HomeView';
import { PortfolioView } from './components/PortfolioView';
import { BlogView } from './components/BlogView';
import { ArchiveView } from './components/ArchiveView';
import { BlogPostPage } from './pages/BlogPostPage';
import { Language, PROFILE_DATA } from './data/careerData';
import { getAllBlogPosts } from './utils/blogLoader';
import { updateDocumentSeo } from './utils/seo';
import { darkTheme, lightTheme } from './styles/theme.css';
import { scrollTopFab } from './styles/components.css';
import {
  appShell,
  brandAvatar,
  brandButton,
  brandName,
  brandSub,
  brandTextWrap,
  contentLayer,
  desktopNavGroup,
  footer,
  footerInner,
  iconControlBtn,
  langSegmentBtn,
  langSegmentBtnActive,
  langSegmentWrap,
  mainContainer,
  mobileDrawer,
  mobileMenuBtn,
  mobileNavLink,
  mobileNavLinkActive,
  navbarOuter,
  navbarPill,
  navControls,
  navCountPill,
  navPillItem,
  navPillItemActive,
} from './styles/layout.css';

function detectSystemLanguage(): Language {
  if (typeof window === 'undefined') return 'ko';
  const saved = window.localStorage.getItem('mw_lang');
  if (saved === 'ko' || saved === 'en') return saved;
  const sysLang = (
    window.navigator.language ||
    (window.navigator.languages && window.navigator.languages[0]) ||
    'ko'
  ).toLowerCase();
  return sysLang.startsWith('ko') ? 'ko' : 'en';
}

const AppLayout: React.FC = () => {
  const [lang, setLang] = useState<Language>(detectSystemLanguage);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = window.localStorage.getItem('mw_theme_v2');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const allPosts = useMemo(() => getAllBlogPosts(), []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 380);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu and update SEO meta for top-level routes
  useEffect(() => {
    setMobileMenuOpen(false);
    const path = location.pathname;

    if (path.startsWith('/posts/')) {
      // BlogPostPage handles its own article SEO metadata
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (path === '/blog') {
      updateDocumentSeo({
        title:
          lang === 'ko'
            ? '블로그 (Blog) | 윤민우 (Minwoo Yun · sinav)'
            : 'Blog | Minwoo Yun (sinav)',
        description:
          lang === 'ko'
            ? 'TL;DR 요약 노트, 시스템 · 아키텍처 연구, 소프트웨어 개발, 사진 · 카메라, 커피 · 브루잉, 칵테일 · 바텐딩, 단상 · 회고 아카이브'
            : 'TL;DR quick notes, systems & architecture research, software engineering, photography, coffee brewing, cocktail craft, and essays by Minwoo Yun (sinav).',
        canonicalPath: '/blog',
        lang,
      });
    } else if (path === '/portfolio') {
      updateDocumentSeo({
        title:
          lang === 'ko'
            ? '포트폴리오 & CV | 윤민우 (Minwoo Yun)'
            : 'Portfolio & CV | Minwoo Yun',
        description: PROFILE_DATA.bio[lang],
        canonicalPath: '/portfolio',
        lang,
      });
    } else if (path === '/research') {
      updateDocumentSeo({
        title:
          lang === 'ko'
            ? '연구실 & 연구 주제 | 윤민우 (Minwoo Yun)'
            : 'Research & Labs | Minwoo Yun',
        description: PROFILE_DATA.bio[lang],
        canonicalPath: '/research',
        lang,
      });
    } else if (path === '/publications') {
      updateDocumentSeo({
        title:
          lang === 'ko'
            ? '학술 논문 (Publications) | 윤민우 (Minwoo Yun)'
            : 'Publications | Minwoo Yun',
        description:
          'Peer-reviewed journal and conference publications by Minwoo Yun.',
        canonicalPath: '/publications',
        lang,
      });
    } else if (path === '/archive') {
      updateDocumentSeo({
        title:
          lang === 'ko'
            ? '아카이브 & 사진 갤러리 | 윤민우 (Minwoo Yun)'
            : 'Archive & Photography | Minwoo Yun',
        description:
          'Award-winning photography archive and personal essays by Minwoo Yun.',
        canonicalPath: '/archive',
        lang,
      });
    } else {
      updateDocumentSeo({
        title:
          lang === 'ko'
            ? '윤민우 (Minwoo Yun · sinav) | 연구 블로그 & 포트폴리오 홈'
            : 'Minwoo Yun (sinav) | Research Blog & Portfolio Home',
        description: PROFILE_DATA.bio[lang],
        canonicalPath: '/',
        lang,
      });
    }
  }, [location.pathname, lang]);

  const selectLanguage = (next: Language) => {
    setLang(next);
    window.localStorage.setItem('mw_lang', next);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    window.localStorage.setItem('mw_theme_v2', next);
  };

  const navItems: {
    path: string;
    matchPrefix?: string;
    label: { ko: string; en: string };
    icon: React.ReactNode;
    badgeCount?: number;
  }[] = [
    {
      path: '/',
      label: { ko: '홈', en: 'Home' },
      icon: <RiHome4Line size={15} />,
    },
    {
      path: '/blog',
      matchPrefix: '/posts/',
      label: { ko: '블로그', en: 'Blog' },
      icon: <RiArticleLine size={15} />,
      badgeCount: allPosts.length,
    },
    {
      path: '/portfolio',
      label: { ko: '포트폴리오', en: 'Portfolio' },
      icon: <RiUserStarLine size={15} />,
    },
    {
      path: '/research',
      label: { ko: '연구실 · 주제', en: 'Research' },
      icon: <RiCpuLine size={15} />,
    },
    {
      path: '/publications',
      label: { ko: '학술 논문', en: 'Publications' },
      icon: <RiBookOpenLine size={15} />,
    },
    {
      path: '/archive',
      label: { ko: '아카이브', en: 'Archive' },
      icon: <RiCameraLensLine size={15} />,
    },
  ];

  const isNavItemActive = (item: (typeof navItems)[number]) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return (
      location.pathname.startsWith(item.path) ||
      (item.matchPrefix ? location.pathname.startsWith(item.matchPrefix) : false)
    );
  };

  return (
    <div className={`${theme === 'dark' ? darkTheme : lightTheme} ${appShell}`}>
      {/* Interactive Mouse-Responsive Topology & Spotlight Canvas */}
      <InteractiveBackground theme={theme} intensity="normal" />

      <div className={contentLayer}>
        {/* Sleek Floating Capsule Navigation Bar */}
        <header className={navbarOuter}>
          <div className={navbarPill}>
            <button
              type="button"
              className={brandButton}
              onClick={() => navigate('/')}
              title="Find My Way. Leave a Trace."
            >
              <span className={brandAvatar}>
                <SinavLogo size={34} />
              </span>
              <div className={brandTextWrap}>
                <span className={brandName}>
                  {lang === 'ko' ? '윤민우' : 'Minwoo Yun'}
                </span>
                <span className={brandSub}>
                  {lang === 'ko' ? '@sinav · 시나브' : '@sinav · Researcher'}
                </span>
              </div>
            </button>

            {/* Desktop Center Pill Navigation */}
            <nav className={desktopNavGroup} aria-label="Primary Navigation">
              {navItems.map((item) => {
                const active = isNavItemActive(item);
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`${navPillItem} ${active ? navPillItemActive : ''}`}
                  >
                    {item.icon}
                    {item.label[lang]}
                    {item.badgeCount !== undefined && (
                      <span className={navCountPill}>{item.badgeCount}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls + Mobile Hamburger Toggle */}
            <div className={navControls}>
              <div className={langSegmentWrap} role="group" aria-label="Language Switcher">
                <button
                  type="button"
                  onClick={() => selectLanguage('ko')}
                  className={`${langSegmentBtn} ${
                    lang === 'ko' ? langSegmentBtnActive : ''
                  }`}
                >
                  KO
                </button>
                <button
                  type="button"
                  onClick={() => selectLanguage('en')}
                  className={`${langSegmentBtn} ${
                    lang === 'en' ? langSegmentBtnActive : ''
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className={iconControlBtn}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? (
                  <RiMoonClearLine size={15} />
                ) : (
                  <RiSunLine size={15} />
                )}
              </button>

              <a
                href={PROFILE_DATA.links.github}
                target="_blank"
                rel="noreferrer"
                className={iconControlBtn}
                title="GitHub (@ymw0407)"
              >
                <RiGithubFill size={16} />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={mobileMenuBtn}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <RiCloseLine size={18} />
                ) : (
                  <RiMenu4Line size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Responsive Slide-Down Menu Drawer */}
          {mobileMenuOpen && (
            <nav className={mobileDrawer} aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const active = isNavItemActive(item);
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={`${mobileNavLink} ${
                      active ? mobileNavLinkActive : ''
                    }`}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.55rem',
                      }}
                    >
                      {item.icon}
                      {item.label[lang]}
                    </span>
                    {item.badgeCount !== undefined && (
                      <span className={navCountPill}>{item.badgeCount}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}
        </header>

        {/* Main Content Container with SEO-Friendly Page Routes */}
        <main className={mainContainer}>
          <Routes>
            <Route
              path="/"
              element={
                <HomeView
                  lang={lang}
                  posts={allPosts}
                  onSelectPost={(slug) => navigate(`/posts/${slug}`)}
                  onNavigateBlog={(category) =>
                    navigate(category ? `/blog?category=${category}` : '/blog')
                  }
                  onNavigatePortfolio={() => navigate('/portfolio')}
                  onNavigateResearch={() => navigate('/research')}
                />
              }
            />
            <Route
              path="/blog"
              element={
                <BlogView
                  lang={lang}
                  posts={allPosts}
                  onSelectPost={(slug) => navigate(`/posts/${slug}`)}
                />
              }
            />
            <Route
              path="/posts/:slug"
              element={<BlogPostPage lang={lang} posts={allPosts} />}
            />
            <Route
              path="/portfolio"
              element={
                <PortfolioView
                  lang={lang}
                  recentPosts={allPosts}
                  onSelectPost={(slug) => navigate(`/posts/${slug}`)}
                  onNavigateBlog={() => navigate('/blog')}
                  onNavigateResearch={() => navigate('/research')}
                  onNavigatePublications={() => navigate('/publications')}
                  filterSection="all"
                />
              }
            />
            <Route
              path="/research"
              element={
                <PortfolioView
                  lang={lang}
                  recentPosts={allPosts}
                  onSelectPost={(slug) => navigate(`/posts/${slug}`)}
                  onNavigateBlog={() => navigate('/blog')}
                  onNavigateResearch={() => navigate('/research')}
                  onNavigatePublications={() => navigate('/publications')}
                  filterSection="research"
                />
              }
            />
            <Route
              path="/publications"
              element={
                <PortfolioView
                  lang={lang}
                  recentPosts={allPosts}
                  onSelectPost={(slug) => navigate(`/posts/${slug}`)}
                  onNavigateBlog={() => navigate('/blog')}
                  onNavigateResearch={() => navigate('/research')}
                  onNavigatePublications={() => navigate('/publications')}
                  filterSection="publications"
                />
              }
            />
            <Route
              path="/projects"
              element={
                <PortfolioView
                  lang={lang}
                  recentPosts={allPosts}
                  onSelectPost={(slug) => navigate(`/posts/${slug}`)}
                  onNavigateBlog={() => navigate('/blog')}
                  filterSection="projects"
                />
              }
            />
            <Route path="/archive" element={<ArchiveView lang={lang} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className={footer}>
          <div className={footerInner}>
            <div>
              <strong>{PROFILE_DATA.name[lang]}</strong> ·{' '}
              {lang === 'ko'
                ? '익숙한 답보다, 더 나은 가능성을 탐구합니다 · Find My Way. Leave a Trace.'
                : 'Exploring Beyond the Expected · Find My Way. Leave a Trace.'}
            </div>
            <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'center' }}>
              <a href={PROFILE_DATA.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={PROFILE_DATA.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={PROFILE_DATA.links.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="/rss.xml" target="_blank" rel="noreferrer">
                RSS
              </a>
              <a href="/sitemap.xml" target="_blank" rel="noreferrer">
                Sitemap
              </a>
            </div>
          </div>
        </footer>

        {/* Floating Scroll-to-Top Button */}
        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={scrollTopFab}
            title={lang === 'ko' ? '맨 위로 이동' : 'Back to Top'}
            aria-label={lang === 'ko' ? '맨 위로 이동' : 'Back to Top'}
          >
            <RiArrowUpLine size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
