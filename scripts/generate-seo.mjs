import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT_DIR, 'src', 'content', 'posts');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const SITE_ORIGIN = 'https://ymw0407.github.io';
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/photography/2026-weather-aurora-curtain.jpg`;

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtmlAttr(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: raw };
  }
  const yamlBlock = match[1];
  const body = match[2];
  const meta = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();

    if (val.startsWith('[') && val.endsWith(']')) {
      meta[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (val === 'true' || val === 'false') {
      meta[key] = val === 'true';
    } else {
      meta[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body };
}

function loadBlogPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .reverse();

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug,
      titleEn: meta.titleEn || meta.title || slug,
      date: meta.date || '2026-11-01',
      category: meta.category || 'Research Notes',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      summary: meta.summary || '',
      summaryEn: meta.summaryEn || meta.summary || '',
      body: body.trim(),
    };
  });
}

function injectRouteSeoIntoHtml(baseHtml, routeConfig) {
  const {
    title,
    description,
    canonicalPath,
    type = 'website',
    keywords = [],
    publishedTime,
    extraHeadTags = '',
    jsonLd,
    noscriptHtml = '',
  } = routeConfig;

  const fullUrl = `${SITE_ORIGIN}${canonicalPath === '/' ? '/' : canonicalPath}`;
  let html = baseHtml;

  // Replace <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtmlAttr(title)}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtmlAttr(description)}" />`
  );

  // Replace meta keywords if provided
  if (keywords.length > 0) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${escapeHtmlAttr(keywords.join(', '))}" />`
    );
  }

  // Replace canonical URL
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtmlAttr(fullUrl)}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${escapeHtmlAttr(type)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtmlAttr(title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtmlAttr(description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtmlAttr(fullUrl)}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtmlAttr(title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtmlAttr(description)}" />`
  );

  // Replace JSON-LD script
  if (jsonLd) {
    html = html.replace(
      /<script id="seo-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="seo-json-ld" type="application/ld+json">\n${JSON.stringify(
        jsonLd,
        null,
        2
      )}\n    </script>`
    );
  }

  // Inject extra head tags (e.g., article:published_time or Google Scholar citation_* tags)
  if (extraHeadTags) {
    html = html.replace('</head>', `    ${extraHeadTags}\n  </head>`);
  }

  if (publishedTime) {
    html = html.replace(
      '</head>',
      `    <meta property="article:published_time" content="${escapeHtmlAttr(
        publishedTime
      )}" />\n  </head>`
    );
  }

  // Inject semantic <noscript> content for crawlers that don't execute JS
  if (noscriptHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <noscript>${noscriptHtml}</noscript>`
    );
  }

  return html;
}

function generateSitemapXml(routes) {
  const urlsXml = routes
    .map(
      (r) => `  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}${r.path === '/' ? '/' : r.path}`)}</loc>
    <lastmod>${escapeXml(r.lastmod)}</lastmod>
    <changefreq>${escapeXml(r.changefreq)}</changefreq>
    <priority>${escapeXml(r.priority)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;
}

function generateRssXml(posts) {
  const itemsXml = posts
    .map((post) => {
      const postUrl = `${SITE_ORIGIN}/posts/${post.slug}`;
      const pubDate = new Date(`${post.date}T09:00:00+09:00`).toUTCString();
      const categories = [post.category, ...post.tags]
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <description>${escapeXml(post.summary)}</description>
${categories}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>윤민우 (Minwoo Yun) · 연구 블로그 &amp; 기술 노트</title>
    <link>${SITE_ORIGIN}/</link>
    <description>Operating Systems, Linux Kernel I/O (io_uring), Flash Storage Systems, and Computer Architecture Research Notes by Minwoo Yun</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
}

function run() {
  const posts = loadBlogPosts();
  const today = new Date().toISOString().slice(0, 10);

  const staticRoutes = [
    {
      path: '/',
      lastmod: posts[0]?.date || today,
      changefreq: 'weekly',
      priority: '1.0',
      title:
        '윤민우 (Minwoo Yun · sinav) | 연구 블로그 & 포트폴리오 · Systems & Architecture Researcher',
      description:
        '윤민우 (Minwoo Yun · sinav) 연구 블로그 및 포트폴리오 · 리눅스 커널 비동기 I/O(io_uring, DPAS), 플래시 스토리지 시스템(NVMe/NAND), 완전동형암호(FHE) 및 메모리 중심 컴퓨터 아키텍처 연구 기록',
    },
    {
      path: '/blog',
      lastmod: posts[0]?.date || today,
      changefreq: 'weekly',
      priority: '0.95',
      title:
        '블로그 (Blog) | 윤민우 (Minwoo Yun · sinav) · TL;DR, 연구, 개발, 사진, 커피, 칵테일, 단상',
      description:
        '윤민우(Minwoo Yun · sinav)의 블로그: TL;DR 요약 노트, 시스템 · 아키텍처 연구, 소프트웨어 개발 · 오픈소스, 사진 · 카메라, 커피 · 브루잉, 칵테일 · 바텐딩, 단상 · 회고 아카이브',
    },
    {
      path: '/portfolio',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9',
      title: '포트폴리오 & CV | 윤민우 (Minwoo Yun) · Researcher & Systems Engineer',
      description:
        '윤민우(Minwoo Yun)의 연구·개발 타임라인, 대한민국 해군 SW개발병 및 콘캣(주) 백엔드 엔지니어 경력, 주요 소프트웨어 프로젝트, 장관상·정보과학회장상 수상 및 자격증 이력',
    },
    {
      path: '/research',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.9',
      title: '연구실 & 연구 주제 (Research & Labs) | 윤민우 (Minwoo Yun)',
      description:
        '국민대학교 Memory & Storage Lab(MSL) 및 UC Irvine BIAS Lab 방문연구 이력 · Linux io_uring, DPAS, NAND 플래시 읽기 단위 아카이브 및 FHE 추론 연구',
    },
    {
      path: '/publications',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.85',
      title: '학술 논문 (Publications) | 윤민우 (Minwoo Yun)',
      description:
        '오픈소스 운영 진입장벽 완화를 위한 프로젝트 생성 및 운영 관리 서비스 · KTCP 2024 제1저자 학술지 논문 및 KSC 2023 최우수논문상 학술대회 논문 서지정보 및 BibTeX',
      extraHeadTags: [
        '<meta name="citation_title" content="Project Generation and Operating Management Service for Mitigating Barriers to Entry into Open Source Operations" />',
        '<meta name="citation_author" content="Yun, Minwoo" />',
        '<meta name="citation_author" content="Lee, Minsuk" />',
        '<meta name="citation_publication_date" content="2024/10" />',
        '<meta name="citation_journal_title" content="KIISE Transactions on Computing Practices" />',
        '<meta name="citation_volume" content="30" />',
        '<meta name="citation_issue" content="10" />',
        '<meta name="citation_firstpage" content="499" />',
        '<meta name="citation_lastpage" content="505" />',
        '<meta name="citation_doi" content="10.5626/KTCP.2024.30.10.499" />',
      ].join('\n    '),
    },
    {
      path: '/archive',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7',
      title: '아카이브 & 수상 사진 갤러리 (Archive & Photography) | 윤민우 (Minwoo Yun)',
      description:
        '기상사진 공모전 장려상, 해군창설 80주년 사진공모전 동상 등 수상 사진 작품 갤러리 및 해군지(Navy Magazine) 기고 수필 아카이브',
    },
  ];

  const allSitemapEntries = [
    ...staticRoutes.map((r) => ({
      path: r.path,
      lastmod: r.lastmod,
      changefreq: r.changefreq,
      priority: r.priority,
    })),
    ...posts.map((p) => ({
      path: `/posts/${p.slug}`,
      lastmod: p.date,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ];

  const sitemapXml = generateSitemapXml(allSitemapEntries);
  const rssXml = generateRssXml(posts);
  const robotsTxt = generateRobotsTxt();

  // Write sitemap.xml, rss.xml, robots.txt to public/ so dev server also serves them
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rssXml, 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8');

  // If dist/ exists (after vite build), also write to dist/ and pre-generate static route HTML files
  if (fs.existsSync(DIST_DIR) && fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, 'rss.xml'), rssXml, 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');

    const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

    // 1. Pre-render static sub-route index.html files (/portfolio, /research, /publications, /archive)
    for (const route of staticRoutes) {
      if (route.path === '/') continue;
      const routeDir = path.join(DIST_DIR, route.path.slice(1));
      fs.mkdirSync(routeDir, { recursive: true });

      const html = injectRouteSeoIntoHtml(baseHtml, {
        title: route.title,
        description: route.description,
        canonicalPath: route.path,
        type: 'website',
        extraHeadTags: route.extraHeadTags || '',
        noscriptHtml: `<main><h1>${escapeHtmlAttr(route.title)}</h1><p>${escapeHtmlAttr(
          route.description
        )}</p></main>`,
      });

      fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
    }

    // 2. Pre-render dedicated HTML files for each blog post (/posts/:slug/index.html)
    for (const post of posts) {
      const postPath = `/posts/${post.slug}`;
      const postDir = path.join(DIST_DIR, 'posts', post.slug);
      fs.mkdirSync(postDir, { recursive: true });

      const postTitle = `${post.title} | 윤민우 (Minwoo Yun) Research Blog`;
      const fullUrl = `${SITE_ORIGIN}${postPath}`;

      const postJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': `${fullUrl}#article`,
            headline: post.title,
            alternativeHeadline: post.titleEn,
            description: post.summary,
            datePublished: post.date,
            dateModified: post.date,
            articleSection: post.category,
            keywords: post.tags.join(', '),
            image: DEFAULT_OG_IMAGE,
            author: {
              '@type': 'Person',
              name: 'Minwoo Yun',
              alternateName: '윤민우',
              url: `${SITE_ORIGIN}/`,
            },
            publisher: {
              '@type': 'Person',
              name: 'Minwoo Yun',
              url: `${SITE_ORIGIN}/`,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': fullUrl,
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Research Blog',
                item: `${SITE_ORIGIN}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: post.title,
                item: fullUrl,
              },
            ],
          },
        ],
      };

      const extraTags = [
        `<meta property="article:section" content="${escapeHtmlAttr(post.category)}" />`,
        ...post.tags.map(
          (t) => `<meta property="article:tag" content="${escapeHtmlAttr(t)}" />`
        ),
      ].join('\n    ');

      const html = injectRouteSeoIntoHtml(baseHtml, {
        title: postTitle,
        description: post.summary,
        canonicalPath: postPath,
        type: 'article',
        keywords: [post.category, ...post.tags, '윤민우', 'Minwoo Yun'],
        publishedTime: post.date,
        extraHeadTags: extraTags,
        jsonLd: postJsonLd,
        noscriptHtml: `<article><h1>${escapeHtmlAttr(post.title)}</h1><p>${escapeHtmlAttr(
          post.summary
        )}</p><pre>${escapeHtmlAttr(post.body)}</pre></article>`,
      });

      fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf8');
    }

    console.log(
      `[SEO Generator] Pre-rendered ${staticRoutes.length - 1} top-level routes and ${
        posts.length
      } blog post routes (/posts/:slug/index.html), plus sitemap.xml, rss.xml, and robots.txt.`
    );
  }
}

run();
